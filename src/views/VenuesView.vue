<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Browse Venues</h1>
      <p class="text-muted-foreground">Discover unique spaces for your next event</p>
    </div>

    <!-- Venues Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="venue in venues"
        :key="venue.id"
        class="overflow-hidden hover:shadow-lg transition-shadow"
      >
        <!-- Image -->
        <template #header>
          <div class="aspect-video bg-muted">
            <img :src="venue.images[0]" :alt="venue.title" class="w-full h-full object-cover" />
          </div>
        </template>

        <!-- Content -->
        <template #content>
          <div class="p-4 space-y-4">
            <!-- Title & Description -->
            <div>
              <h3 class="text-lg font-semibold mb-1">{{ venue.title }}</h3>
              <p class="text-sm text-muted-foreground">
                {{ venue.description }}
              </p>
            </div>

            <!-- Location -->
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <i class="pi pi-map-marker" />
              <span>{{ venue.location }}</span>
            </div>

            <!-- Capacity & Price -->
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

            <!-- Amenities -->
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

            <!-- Action -->
            <Button label="View Details & Book" class="w-full" />
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

interface Venue {
  id: string
  title: string
  description: string
  location: string
  capacity: number
  pricePerHour: number
  amenities: string[]
  images: string[]
}

const venues: Venue[] = [
  {
    id: '1',
    title: 'Modern Conference Center',
    description: 'A sleek, modern space perfect for corporate events and conferences',
    location: 'Downtown San Francisco',
    capacity: 200,
    pricePerHour: 150,
    amenities: ['WiFi', 'Projector', 'Catering Kitchen', 'Parking'],
    images: ['/placeholder.svg'],
  },
  {
    id: '2',
    title: 'Rooftop Garden Venue',
    description: 'Beautiful outdoor space with city views, ideal for weddings and parties',
    location: 'Mission District, SF',
    capacity: 100,
    pricePerHour: 200,
    amenities: ['Garden', 'City Views', 'Sound System', 'Bar Setup'],
    images: ['/placeholder.svg'],
  },
  {
    id: '3',
    title: 'Industrial Warehouse Space',
    description: 'Raw, industrial space perfect for art shows, pop-ups, and creative events',
    location: 'SOMA, San Francisco',
    capacity: 300,
    pricePerHour: 120,
    amenities: ['High Ceilings', 'Loading Dock', 'Basic Lighting', 'Open Floor'],
    images: ['/placeholder.svg'],
  },
]
</script>

<!--
  This component relies on PrimeVue, primeicons, and TailwindCSS being configured in your project.
-->
