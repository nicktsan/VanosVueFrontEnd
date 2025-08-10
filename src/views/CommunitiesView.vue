<!-- CommunitiesView.vue -->
<template>
  <section class="mx-auto max-w-6xl p-4 space-y-6">
    <!-- Filters -->
    <div class="grid gap-3 sm:grid-cols-3">
      <label class="flex flex-col gap-1">
        <span class="text-sm font-medium">Category</span>
        <select v-model="selectedCategory" class="rounded-lg border px-3 py-2">
          <option value="">All categories</option>
          <option v-for="cat in categories" :key="cat.name" :value="cat.name">
            {{ cat.name }}
          </option>
        </select>
      </label>

      <label class="flex flex-col gap-1">
        <span class="text-sm font-medium">Subcategory</span>
        <select
          v-model="selectedSubcategory"
          :disabled="subcategoriesForSelected.length === 0"
          class="rounded-lg border px-3 py-2 disabled:bg-gray-100 disabled:text-gray-400"
        >
          <option value="">All subcategories</option>
          <option v-for="sub in subcategoriesForSelected" :key="sub" :value="sub">
            {{ sub }}
          </option>
        </select>
      </label>

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
      Showing {{ filtered.length }} community<span v-if="filtered.length !== 1">ies</span>
    </p>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="c in filtered"
        :key="c.id"
        class="rounded-2xl border shadow-sm overflow-hidden"
      >
        <img v-if="c.image" :src="c.image" :alt="c.name" class="h-40 w-full object-cover" />
        <div class="p-4 space-y-2">
          <h3 class="text-lg font-semibold">{{ c.name }}</h3>

          <!-- Location / Members -->
          <p class="text-xs text-gray-500">{{ c.location }} · {{ c.members }} members</p>

          <!-- NEW: All categories as pills -->
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
      </article>
    </div>

    <div v-if="filtered.length === 0" class="text-center text-sm text-gray-600 py-12">
      No communities match that filter.
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, h } from 'vue'
// Adjust this import to your project structure:
import { categories, communities, type Community, type CategoryOption } from '@/data/communities'

const selectedCategory = ref<string>('')
const selectedSubcategory = ref<string>('')
const q = ref<string>('')

const subcategoriesForSelected = computed<string[]>(() => {
  const cat = categories.find((c: CategoryOption) => c.name === selectedCategory.value)
  return cat ? cat.subCategories : []
})

// Clear subcategory when category changes to avoid stale selection
watch(selectedCategory, () => {
  selectedSubcategory.value = ''
})

/**
 * Matching helpers (case-insensitive)
 */
const ci = (s: string) => s.toLowerCase()
const matchesToken = (hay: string | string[] | undefined, token: string): boolean => {
  if (!token) return true
  if (!hay) return false
  const t = ci(token)
  if (Array.isArray(hay)) return hay.some((h) => ci(h) === t || ci(h).includes(t))
  return ci(hay) === t || ci(h).includes(t)
}

const filtered = computed<Community[]>(() => {
  const list = [...communities]

  return list.filter((c) => {
    // Text search (name/description)
    const textOk =
      !q.value || ci(c.name).includes(ci(q.value)) || ci(c.description).includes(ci(q.value))

    // Category filter (now checks c.categories array)
    const categoryOk =
      !selectedCategory.value ||
      matchesToken(c.categories, selectedCategory.value) ||
      matchesToken(c.lookingFor, selectedCategory.value)

    // Subcategory filter (also against categories array / tags / description)
    const subcat = selectedSubcategory.value
    const subcategoryOk =
      !subcat ||
      matchesToken(c.categories, subcat) ||
      matchesToken(c.lookingFor, subcat) ||
      ci(c.description).includes(ci(subcat))

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
