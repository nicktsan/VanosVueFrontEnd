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
        @click="goToEvent(event.id)"
      >
        <template #header>
          <div class="aspect-video bg-muted">
            <img :src="event.picture" :alt="event.title" class="w-full h-full object-cover" />
          </div>
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
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Badge from 'primevue/badge'
import { format } from 'date-fns'
import { events } from '@/data/events'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToEvent(id: string) {
  router.push({ name: 'EventDetails', params: { id } })
}
function formatDate(date: Date, pattern: string) {
  return format(date, pattern)
}
</script>
