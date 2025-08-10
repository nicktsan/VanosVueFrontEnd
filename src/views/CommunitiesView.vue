<!-- CommunitiesView.vue -->
<template>
  <section class="mx-auto max-w-6xl p-4 space-y-6">
    <!-- Filters -->
    <div class="grid gap-4 sm:grid-cols-3">
      <!-- Category checkboxes -->
      <fieldset class="flex flex-col gap-2">
        <legend class="text-sm font-medium">Categories</legend>
        <div class="flex items-center gap-2 text-sm">
          <button type="button" class="underline" @click="toggleAllCategories">
            {{ isAllCategoriesSelected ? 'Clear all' : 'Select all' }}
          </button>
          <span class="text-gray-500">({{ selectedCategories.length || 'All' }})</span>
        </div>
        <div class="grid grid-cols-1 gap-1 max-h-44 overflow-auto pr-1">
          <label v-for="cat in categories" :key="cat.name" class="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              :value="cat.name"
              v-model="selectedCategories"
              class="h-4 w-4 rounded border"
            />
            <span>{{ cat.name }}</span>
          </label>
        </div>
      </fieldset>

      <!-- Subcategory checkboxes -->
      <fieldset class="flex flex-col gap-2">
        <legend class="text-sm font-medium">Subcategories</legend>
        <div class="flex items-center gap-2 text-sm">
          <button
            type="button"
            class="underline disabled:no-underline disabled:text-gray-400"
            :disabled="subcategoriesForSelected.length === 0"
            @click="toggleAllSubcategories"
          >
            {{ isAllSubcategoriesSelected ? 'Clear all' : 'Select all' }}
          </button>
          <span class="text-gray-500">
            ({{ subcategoriesForSelected.length ? selectedSubcategories.length || 'All' : '—' }})
          </span>
        </div>
        <div
          class="grid grid-cols-1 gap-1 max-h-44 overflow-auto pr-1"
          :class="{ 'opacity-50 pointer-events-none': subcategoriesForSelected.length === 0 }"
        >
          <label
            v-for="sub in subcategoriesForSelected"
            :key="sub"
            class="flex items-center gap-2 text-sm"
          >
            <input
              type="checkbox"
              :value="sub"
              v-model="selectedSubcategories"
              class="h-4 w-4 rounded border"
            />
            <span>{{ sub }}</span>
          </label>
        </div>
        <p v-if="selectedCategories.length === 0" class="text-xs text-gray-500">
          Pick one or more categories to see subcategories.
        </p>
      </fieldset>

      <!-- Text search -->
      <label class="flex flex-col gap-1">
        <span class="text-sm font-medium">Search (name/desc)</span>
        <input
          v-model.trim="q"
          type="search"
          placeholder="Type to filter…"
          class="rounded-lg border px-3 py-2"
        />
      </label>
    </div>

    <!-- Results -->
    <p class="text-sm text-gray-600">
      Showing {{ filtered.length }} communit<span v-if="filtered.length > 1">ies</span
      ><span v-else>y</span>
    </p>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Make the whole card a link -->
      <RouterLink
        v-for="c in filtered"
        :key="c.id"
        :to="`/communitydetails/${c.id}`"
        class="rounded-2xl border shadow-sm overflow-hidden block hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
      >
        <img v-if="c.image" :src="c.image" :alt="c.name" class="h-40 w-full object-cover" />
        <div class="p-4 space-y-2">
          <h3 class="text-lg font-semibold">{{ c.name }}</h3>

          <!-- Location / Members -->
          <p class="text-xs text-gray-500">{{ c.location }} · {{ c.members }} members</p>

          <!-- All categories as pills -->
          <div v-if="c.categories?.length" class="flex flex-wrap gap-1">
            <span
              v-for="cat in c.categories"
              :key="cat"
              class="rounded-full border px-2 py-0.5 text-xs"
            >
              {{ cat }}
            </span>
          </div>

          <p class="text-sm text-gray-700 line-clamp-3">
            {{ c.description }}
          </p>

          <div v-if="c.lookingFor?.length" class="flex flex-wrap gap-1 pt-1">
            Looking to collaborate with communities related to:
            <span
              v-for="tag in c.lookingFor"
              :key="tag"
              class="rounded-full border px-2 py-0.5 text-xs"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </RouterLink>
    </div>

    <div v-if="filtered.length === 0" class="text-center text-sm text-gray-600 py-12">
      No communities match that filter.
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
// If you want explicit typing/auto-complete for RouterLink, uncomment the next line:
// import { RouterLink } from 'vue-router'
// Adjust this import to your project structure:
import { categories, communities, type Community, type CategoryOption } from '@/data/communities'

/**
 * Multi-select state
 */
const selectedCategories = ref<string[]>([])
const selectedSubcategories = ref<string[]>([])
const q = ref<string>('')

/**
 * Select-all helpers
 */
const allCategoryNames = computed<string[]>(() => categories.map((c) => c.name))

const isAllCategoriesSelected = computed<boolean>(
  () =>
    selectedCategories.value.length > 0 &&
    selectedCategories.value.length === allCategoryNames.value.length,
)

const toggleAllCategories = () => {
  selectedCategories.value = isAllCategoriesSelected.value ? [] : [...allCategoryNames.value]
}

/**
 * Subcategories = union of subcategories for selected categories (deduped + sorted)
 */
const subcategoriesForSelected = computed<string[]>(() => {
  if (selectedCategories.value.length === 0) return []
  const set = new Set<string>()
  for (const catName of selectedCategories.value) {
    const cat = categories.find((c: CategoryOption) => c.name === catName)
    cat?.subCategories.forEach((s) => set.add(s))
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b))
})

const isAllSubcategoriesSelected = computed<boolean>(
  () =>
    subcategoriesForSelected.value.length > 0 &&
    selectedSubcategories.value.length === subcategoriesForSelected.value.length,
)

const toggleAllSubcategories = () => {
  selectedSubcategories.value = isAllSubcategoriesSelected.value
    ? []
    : [...subcategoriesForSelected.value]
}

/**
 * Keep subcategory selection valid as categories change
 */
watch(selectedCategories, () => {
  selectedSubcategories.value = selectedSubcategories.value.filter((s) =>
    subcategoriesForSelected.value.includes(s),
  )
})

/**
 * Matching helpers (case-insensitive)
 * - Exact match for tag arrays (categories/lookingFor)
 * - Substring for free-text search on name/description
 */
const ci = (s: string) => s.toLowerCase()
const matchesToken = (hay: string | string[] | undefined, token: string): boolean => {
  if (!token) return true
  if (!hay) return false
  const t = ci(token)
  if (Array.isArray(hay)) return hay.some((h) => ci(h) === t)
  return ci(hay) === t
}

const filtered = computed<Community[]>(() => {
  const text = ci(q.value)
  return communities.filter((c) => {
    // Text search (name/description) -> substring
    const textOk = !text || ci(c.name).includes(text) || ci(c.description).includes(text)

    // Category filter: ANY selected category matches categories or lookingFor (exact tag match)
    const cats = selectedCategories.value
    const categoryOk =
      cats.length === 0 ||
      cats.some((cat) => matchesToken(c.categories, cat) || matchesToken(c.lookingFor, cat))

    // Subcategory filter: ANY selected subcategory matches categories/lookingFor (exact tag)
    // Optionally also allow substring in description for a looser UX.
    const subs = selectedSubcategories.value
    const subcategoryOk =
      subs.length === 0 ||
      subs.some(
        (sub) =>
          matchesToken(c.categories, sub) ||
          matchesToken(c.lookingFor, sub) ||
          ci(c.description).includes(ci(sub)),
      )

    return textOk && categoryOk && subcategoryOk
  })
})
</script>

<style scoped>
/* optional: clamp description lines if Tailwind’s line-clamp plugin isn’t enabled */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
