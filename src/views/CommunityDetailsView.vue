<template>
  <Card class="w-full max-w-3xl mx-auto shadow-2xl rounded-2xl overflow-hidden">
    <template #header>
      <img :src="community.image" :alt="community.name" class="w-full h-64 object-cover" />
    </template>
    <template #title>
      <div class="flex items-center gap-3">
        <h2 class="text-3xl font-bold text-gray-900 flex-1">{{ community.name }}</h2>
        <Tag :value="community.category" severity="info" class="text-sm" />
      </div>
    </template>

    <template #content>
      <p class="mb-6 text-gray-700">{{ community.description }}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div class="flex items-center gap-2">
          <i class="pi pi-user text-lg" />
          <span><strong>Creator:</strong> {{ community.creator }}</span>
        </div>

        <div class="flex items-center gap-2">
          <i class="pi pi-map-marker text-lg" />
          <span><strong>Location:</strong> {{ community.location }}</span>
        </div>
        <div class="flex items-center gap-2">
          <i class="pi pi-users text-lg" />
          <span><strong>Members:</strong> {{ community.members.toLocaleString() }}</span>
        </div>

        <div v-if="community.lookingFor?.length" class="flex items-start gap-2">
          <i class="pi pi-search text-lg" />
          <div class="flex flex-wrap gap-2">
            <span class="font-semibold mr-1">Looking for:</span>
            <Chip
              v-for="item in community.lookingFor"
              :key="item"
              :label="item"
              class="bg-blue-50 text-blue-700"
            />
          </div>
        </div>
        <div
          v-if="community.currentCollaborators?.length"
          class="flex items-start gap-2 md:col-span-2"
        >
          <i class="pi pi-handshake text-lg" />
          <div>
            <span class="font-semibold mr-1">Current collaborators:</span>
            <div class="flex flex-wrap gap-2 mt-1">
              <Chip
                v-for="c in community.currentCollaborators"
                :key="c"
                :label="c"
                class="bg-green-50 text-green-600"
              />
            </div>
          </div>
        </div>
        <div
          v-if="community.pastCollaborators?.length"
          class="flex items-start gap-2 md:col-span-2"
        >
          <i class="pi pi-history text-lg" />
          <div>
            <span class="font-semibold mr-1">Past collaborators:</span>
            <div class="flex flex-wrap gap-2 mt-1">
              <Chip
                v-for="c in community.pastCollaborators"
                :key="c"
                :label="c"
                class="bg-yellow-50 text-yellow-600"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { Community } from '@/data/communities'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Chip from 'primevue/chip'

const props = defineProps<{
  community: Community
}>()
</script>

<style scoped></style>
