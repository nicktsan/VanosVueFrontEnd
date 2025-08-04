<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Browse Venues</h1>
      <p class="text-muted-foreground">Discover unique spaces for your next event</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="venue in venues"
        :key="venue.id"
        class="overflow-hidden hover:shadow-lg transition-shadow"
        @click="goToVenue(venue.id)"
      >
        <template #header>
          <div class="aspect-video bg-muted">
            <img :src="venue.images[0]" :alt="venue.title" class="w-full h-full object-cover" />
          </div>
        </template>

        <template #content>
          <div class="p-4 space-y-4">
            <div>
              <h3 class="text-lg font-semibold mb-1">{{ venue.title }}</h3>
              <p class="text-sm text-muted-foreground">
                {{ venue.description }}
              </p>
            </div>

            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <i class="pi pi-map-marker" />
              <span>{{ venue.location }}</span>
            </div>

            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-2">
                <i class="pi pi-users" />
                <span>Up to {{ venue.capacity }} guests</span>
              </div>
              <div class="flex items-center gap-1">
                <i class="pi pi-dollar" />
                <span class="font-semibold">${{ venue.pricePerHour }}/hr</span>
              </div>
            </div>

            <div class="flex flex-wrap gap-1">
              <Badge
                v-for="amenity in venue.amenities.slice(0, 3)"
                :key="amenity"
                severity="secondary"
                class="text-xs"
              >
                {{ amenity }}
              </Badge>
              <Badge v-if="venue.amenities.length > 3" severity="contrast" class="text-xs">
                +{{ venue.amenities.length - 3 }} more
              </Badge>
            </div>

            <Button label="View Details & Book" class="w-full" @click.stop="goToVenue(venue.id)" />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import { venues } from '@/data/venues'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToVenue(id: string) {
  router.push({ name: 'VenueDetails', params: { id } })
}
</script>
