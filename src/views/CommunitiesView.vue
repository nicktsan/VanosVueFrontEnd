<template>
  <div class="container mx-auto px-4 py-10">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
      <div>
        <h1 class="text-3xl font-bold mb-2">Explore Communities</h1>
        <p class="text-muted-foreground max-w-2xl">
          Connect with like‑minded people. Browse by category or discover something new.
        </p>
      </div>

      <!-- Category Filter -->
      <div class="w-full md:w-72">
        <MultiSelect
          v-model="selectedCategories"
          :options="categories"
          optionLabel="label"
          optionValue="value"
          placeholder="Filter by category"
          display="chip"
          class="w-full"
          :maxSelectedLabels="3"
        />
      </div>
    </div>

    <!-- Communities Grid -->
    <div
      v-if="filteredCommunities.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <Card
        v-for="community in filteredCommunities"
        :key="community.id"
        class="overflow-hidden transition shadow-sm cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-primary hover:-translate-y-1"
      >
        <!-- header -->
        <template #header>
          <img :src="community.image" :alt="community.name" class="w-full h-40 object-cover" />
        </template>

        <!-- content -->
        <template #content>
          <h3 class="text-lg font-semibold mb-1">{{ community.name }}</h3>
          <p class="text-sm text-muted-foreground line-clamp-3 mb-3">
            {{ community.description }}
          </p>

          <div class="flex flex-wrap gap-1">
            <Tag :value="community.category" severity="contrast" />
          </div>
        </template>
      </Card>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center text-muted-foreground py-20">
      No communities match the selected category.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MultiSelect from 'primevue/multiselect'
import Card from 'primevue/card'
import Tag from 'primevue/tag'

// ------------- Types -------------
interface Community {
  id: string
  name: string
  description: string
  category: string
  image: string
}

interface CategoryOption {
  label: string
  value: string
}

// ------------- Mock Data -------------
const categories: CategoryOption[] = [
  { label: 'Tech', value: 'Tech' },
  { label: 'Art', value: 'Art' },
  { label: 'Fitness', value: 'Fitness' },
  { label: 'Education', value: 'Education' },
  { label: 'Gaming', value: 'Gaming' },
  { label: 'Food', value: 'Food' },
]

const communities = ref<Community[]>([
  {
    id: '1',
    name: 'Vue.js Enthusiasts',
    description: 'A global community for developers building with the Vue framework.',
    category: 'Tech',
    image: 'https://source.unsplash.com/random/800x400?code',
  },
  {
    id: '2',
    name: 'Urban Sketchers',
    description: 'Join artists who love sketching cityscapes and sharing techniques.',
    category: 'Art',
    image: 'https://source.unsplash.com/random/800x400?art',
  },
  {
    id: '3',
    name: 'Trail Runners Club',
    description: 'Weekend runs, training tips, and race meet‑ups for all levels.',
    category: 'Fitness',
    image: 'https://source.unsplash.com/random/800x400?running',
  },
  {
    id: '4',
    name: 'Indie Game Devs',
    description: 'Collaborate, showcase, and get feedback on your indie game projects.',
    category: 'Gaming',
    image: 'https://source.unsplash.com/random/800x400?gaming',
  },
  {
    id: '5',
    name: 'Plant‑Based Cooking',
    description: 'Recipes, tips, and challenges for healthy plant‑based eating.',
    category: 'Food',
    image: 'https://source.unsplash.com/random/800x400?food',
  },
  {
    id: '6',
    name: 'Lifelong Learners',
    description: 'Discuss online courses, share resources, and stay curious together.',
    category: 'Education',
    image: 'https://source.unsplash.com/random/800x400?education',
  },
])

// ------------- State -------------
const selectedCategories = ref<string[]>([])

// ------------- Computed -------------
const filteredCommunities = computed(() => {
  if (!selectedCategories.value.length) return communities.value
  return communities.value.filter((c) => selectedCategories.value.includes(c.category))
})
</script>

<!--
  Dependencies:
  - PrimeVue components: MultiSelect, Card, Tag
  - TailwindCSS for layout & utility classes
  - primeicons (Tag severity uses built‑in colors)
-->
