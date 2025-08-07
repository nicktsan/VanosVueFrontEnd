<template>
  <div class="container mx-auto px-4 py-10">
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
      <div>
        <h1 class="text-3xl font-bold mb-2">Explore Communities</h1>
        <p class="text-muted-foreground max-w-2xl">
          Connect with like-minded people. Browse by category or discover something new.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <InputText v-model="search" placeholder="Search by name" class="w-full sm:w-60">
          <template>
            <i class="pi pi-search pl-2 pr-1 text-muted-foreground" />
          </template>
        </InputText>
        <MultiSelect
          v-model="selectedCategories"
          :options="categories"
          optionLabel="label"
          optionValue="value"
          placeholder="Filter by category"
          display="chip"
          class="w-full sm:w-60"
          :maxSelectedLabels="3"
        />
      </div>
    </div>

    <div
      v-if="filteredCommunities.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <Card
        v-for="community in filteredCommunities"
        :key="community.id"
        class="overflow-hidden transition shadow-sm cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-primary hover:-translate-y-1"
      >
        <template #header>
          <img :src="community.image" :alt="community.name" class="w-full h-40 object-cover" />
        </template>

        <template #content>
          <h3 class="text-lg font-semibold mb-1">{{ community.name }}</h3>
          <p class="text-sm text-muted-foreground line-clamp-3 mb-3">
            {{ community.description }}
          </p>

          <div class="flex flex-wrap gap-1 mb-4">
            <Tag :value="community.category" severity="contrast" />
          </div>

          <div class="mb-4">
            <h4 class="text-sm font-medium mb-1">Looking for</h4>
            <div class="flex flex-wrap gap-1">
              <Tag
                v-for="cat in community.lookingFor"
                :key="cat"
                :value="cat"
                severity="secondary"
              />
            </div>
          </div>

          <div class="flex items-center justify-between text-xs text-muted-foreground">
            <span>Creator: {{ community.creator }}</span>
            <span>{{ community.members }} members</span>
          </div>
        </template>
      </Card>
    </div>

    <div v-else class="text-center text-muted-foreground py-20">
      No communities match the selected filters.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MultiSelect from 'primevue/multiselect'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import { categories, communities } from '@/data/communities'

const selectedCategories = ref<string[]>([])
const search = ref('')

const filteredCommunities = computed(() => {
  let list = communities.value

  if (selectedCategories.value.length) {
    list = list.filter((c) => selectedCategories.value.includes(c.category))
  }

  if (search.value.trim()) {
    const q = search.value.trim().toLowerCase()
    list = list.filter((c) => c.name.toLowerCase().includes(q))
  }

  return list
})
</script>
