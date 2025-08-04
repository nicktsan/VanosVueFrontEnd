<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8 text-center md:text-left">
      <h1 class="text-3xl font-bold mb-2">Upcoming Events</h1>
      <p class="text-muted-foreground">Discover and register for exciting events in your area</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="event in events"
        :key="event.id"
        class="overflow-hidden hover:shadow-lg transition-shadow"
      >
        <template #header>
          <div class="flex items-start justify-between p-4 pb-0">
            <div class="flex-1">
              <h3 class="text-lg font-semibold mb-1">{{ event.title }}</h3>
              <p class="text-sm text-muted-foreground">
                {{ event.description }}
              </p>
            </div>
            <Badge
              :value="event.price === 0 ? 'Free' : `$${event.price}`"
              :severity="event.price === 0 ? 'secondary' : 'info'"
            />
          </div>
        </template>

        <template #content>
          <div class="space-y-3 px-4 py-2 text-sm">
            <div class="flex items-center gap-2">
              <i class="pi pi-calendar text-muted-foreground" />
              <span>{{ formatDate(event.startTime, 'MMM d, yyyy') }}</span>
            </div>

            <div class="flex items-center gap-2">
              <i class="pi pi-clock text-muted-foreground" />
              <span>
                {{ formatDate(event.startTime, 'h:mm a') }} -
                {{ formatDate(event.endTime, 'h:mm a') }}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <i class="pi pi-map-marker text-muted-foreground" />
              <span>{{ event.venue }}</span>
            </div>

            <div class="flex items-center gap-2 text-muted-foreground">
              <i class="pi pi-users" />
              <span>Up to {{ event.maxAttendees }} attendees</span>
            </div>
          </div>
        </template>

        <template #footer>
          <div class="p-4 pt-0">
            <Button label="Register for Event" class="w-full" />
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
import { format } from 'date-fns'

interface Event {
  id: string
  title: string
  description: string
  startTime: Date
  endTime: Date
  venue: string
  location: string
  maxAttendees: number
  price: number
  status: string
}

const events: Event[] = [
  {
    id: '1',
    title: 'Tech Startup Networking Mixer',
    description: 'Connect with fellow entrepreneurs and investors in the Bay Area tech scene',
    startTime: new Date('2024-01-15T18:00:00'),
    endTime: new Date('2024-01-15T21:00:00'),
    venue: 'Modern Conference Center',
    location: 'Downtown San Francisco',
    maxAttendees: 150,
    price: 25,
    status: 'published',
  },
  {
    id: '2',
    title: 'Sustainable Living Workshop',
    description: 'Learn practical tips for reducing your environmental footprint',
    startTime: new Date('2024-01-20T14:00:00'),
    endTime: new Date('2024-01-20T17:00:00'),
    venue: 'Rooftop Garden Venue',
    location: 'Mission District, SF',
    maxAttendees: 50,
    price: 0,
    status: 'published',
  },
  {
    id: '3',
    title: 'Local Artists Showcase',
    description: 'An evening celebrating local talent with art, music, and performance',
    startTime: new Date('2024-01-25T19:00:00'),
    endTime: new Date('2024-01-25T23:00:00'),
    venue: 'Industrial Warehouse Space',
    location: 'SOMA, San Francisco',
    maxAttendees: 200,
    price: 15,
    status: 'published',
  },
]

function formatDate(date: Date, pattern: string) {
  return format(date, pattern)
}
</script>
