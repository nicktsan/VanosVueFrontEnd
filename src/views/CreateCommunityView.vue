<!-- CreateCommunityView.vue -->
<template>
  <section class="mx-auto max-w-3xl p-4 space-y-6">
    <h1 class="text-2xl font-semibold">Create a Community</h1>

    <form class="space-y-6" @submit.prevent="handleSubmit">
      <!-- Basic fields -->
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="flex flex-col gap-1">
          <span class="text-sm font-medium">Name</span>
          <input
            v-model.trim="newCommunity.name"
            type="text"
            class="rounded-lg border px-3 py-2"
            required
          />
        </label>

        <label class="sm:col-span-2 flex flex-col gap-1">
          <span class="text-sm font-medium">Location</span>
          <input
            v-model.trim="newCommunity.location"
            type="text"
            class="rounded-lg border px-3 py-2"
            required
          />
        </label>

        <label class="sm:col-span-2 flex flex-col gap-1">
          <span class="text-sm font-medium">Description</span>
          <textarea
            v-model.trim="newCommunity.description"
            rows="4"
            class="rounded-lg border px-3 py-2"
            required
          />
        </label>
      </div>

      <!-- Category selection -->
      <div class="grid gap-6 sm:grid-cols-2">
        <!-- Parent Categories -->
        <fieldset class="flex flex-col gap-2">
          <legend class="text-sm font-medium">Categories</legend>
          <div class="flex items-center gap-3 text-sm">
            <button type="button" class="underline" @click="toggleAllCategories">
              {{ isAllCategoriesSelected ? 'Clear all' : 'Select all' }}
            </button>
            <span class="text-gray-500">({{ selectedCategories.length || 'All' }})</span>
          </div>

          <div class="grid gap-1 max-h-56 overflow-auto pr-1">
            <label
              v-for="cat in categories"
              :key="cat.name"
              class="flex items-center gap-2 text-sm"
            >
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

        <!-- Subcategories (unions the selected parents' subcategories) -->
        <fieldset class="flex flex-col gap-2">
          <legend class="text-sm font-medium">Subcategories</legend>
          <div class="flex items-center gap-3 text-sm">
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
            class="grid gap-1 max-h-56 overflow-auto pr-1"
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
      </div>

      <!-- Preview of selected tags -->
      <div class="space-y-2">
        <p class="text-sm font-medium">Selected tags (will be saved to the community):</p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in tagsToSave"
            :key="tag"
            class="rounded-full border px-2 py-0.5 text-xs"
          >
            {{ tag }}
          </span>
          <span v-if="tagsToSave.length === 0" class="text-sm text-gray-500">None selected</span>
        </div>
      </div>

      <!-- Submit -->
      <div class="flex items-center gap-3">
        <button type="submit" class="rounded-lg bg-black text-white px-4 py-2">Create</button>
        <span v-if="error" class="text-sm text-red-600">{{ error }}</span>
        <span v-if="success" class="text-sm text-green-600">Community created!</span>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { categories, type CategoryOption } from '@/data/communities' // uses the categories const

// ----- Model for the new community (adapt to your actual create flow) -----
const newCommunity = ref({
  name: '',
  description: '',
  location: '',
  categories: [] as string[], // will be saved as union of selected categories + subcategories
})

// ----- Multi-select state -----
const selectedCategories = ref<string[]>([])
const selectedSubcategories = ref<string[]>([])

// ----- Select-all helpers -----
const allCategoryNames = computed<string[]>(() => categories.map((c) => c.name))

const isAllCategoriesSelected = computed<boolean>(
  () =>
    selectedCategories.value.length > 0 &&
    selectedCategories.value.length === allCategoryNames.value.length,
)

function toggleAllCategories() {
  selectedCategories.value = isAllCategoriesSelected.value ? [] : [...allCategoryNames.value]
}

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

function toggleAllSubcategories() {
  selectedSubcategories.value = isAllSubcategoriesSelected.value
    ? []
    : [...subcategoriesForSelected.value]
}

// Keep subcategory selection valid as parent categories change
watch(selectedCategories, () => {
  selectedSubcategories.value = selectedSubcategories.value.filter((s) =>
    subcategoriesForSelected.value.includes(s),
  )
})

// Final tags that will be saved to the community
const tagsToSave = computed<string[]>(() => {
  const set = new Set<string>([...selectedCategories.value, ...selectedSubcategories.value])
  return Array.from(set)
})

// ----- Submission -----
const error = ref<string>('') // placeholder for validation errors
const success = ref<boolean>(false)

function handleSubmit() {
  error.value = ''
  success.value = false

  // Example minimal validation
  if (!newCommunity.value.name || !newCommunity.value.description || !newCommunity.value.location) {
    error.value = 'Please complete all required fields.'
    return
  }
  if (tagsToSave.value.length === 0) {
    error.value = 'Please select at least one category or subcategory.'
    return
  }

  // Persist the union to the model your API expects
  newCommunity.value.categories = [...tagsToSave.value]

  // TODO: Replace with your actual create API call or store action
  // await api.createCommunity(newCommunity.value)

  success.value = true
}
</script>

<style scoped>
/* optional: for long text clamping elsewhere if you reuse */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
