<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col lg:flex-row gap-8 mb-10">
      <img
        :src="community.image"
        :alt="community.name"
        class="w-full lg:w-1/2 h-80 object-cover rounded-xl"
      />

      <div class="flex-1 space-y-5">
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-bold flex-1">{{ community.name }}</h1>
        </div>

        <p class="text-muted-foreground">Hosted by {{ community.creator }}</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div class="flex items-center gap-2">
            <i class="pi pi-map-marker" />
            <span>{{ community.location }}</span>
          </div>
        </div>

        <p>{{ community.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Community } from '@/data/communities'

const props = defineProps<{ community: Community }>()
</script>
