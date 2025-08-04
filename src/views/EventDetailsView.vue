<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header / Hero -->
    <div class="flex flex-col lg:flex-row gap-8 mb-10">
      <img
        :src="event.picture"
        :alt="event.title"
        class="w-full lg:w-1/2 h-80 object-cover rounded-xl"
      />

      <div class="flex-1 space-y-5">
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-bold flex-1">{{ event.title }}</h1>
          <Tag :value="event.status" :severity="statusSeverity" />
        </div>

        <p class="text-muted-foreground">Hosted by {{ event.host }}</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div class="flex items-center gap-2">
            <i class="pi pi-calendar" />
            <span>{{ formatDate(event.startTime, 'MMM d, yyyy') }}</span>
          </div>

          <div class="flex items-center gap-2">
            <i class="pi pi-clock" />
            <span>
              {{ formatDate(event.startTime, 'h:mm a') }} –
              {{ formatDate(event.endTime, 'h:mm a') }}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <i class="pi pi-map-marker" />
            <span>{{ event.location }}</span>
          </div>

          <div class="flex items-center gap-2">
            <i class="pi pi-dollar" />
            <span>
              {{ event.price === 0 ? 'Free' : `$${event.price}` }}
            </span>
          </div>
        </div>

        <p>{{ event.description }}</p>

        <div class="text-sm text-muted-foreground">
          Capacity: {{ event.maxAttendees }} attendees
        </div>
      </div>
    </div>

    <!-- Registration & Details Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- Additional Details (placeholder for future) -->
      <div class="lg:col-span-2 space-y-6">
        <!-- You can place agenda, speaker bios, or a map embed here -->
      </div>

      <!-- Registration Card -->
      <div class="border rounded-xl p-6 space-y-4 shadow-sm sticky top-24">
        <h2 class="text-xl font-semibold">Register for this Event</h2>

        <div class="flex flex-col gap-3">
          <label class="font-medium text-sm" for="tickets">Number of Tickets</label>
          <InputNumber
            id="tickets"
            v-model="registration.tickets"
            :min="1"
            :max="event.maxAttendees"
            class="w-full"
          />
        </div>

        <Button label="Confirm Registration" class="w-full" :disabled="isClosed" @click="submit" />

        <p v-if="isClosed" class="text-xs text-red-500">Registration is closed for this event.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { format } from 'date-fns'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import type { Event } from '@/data/events'

const props = defineProps<{ event: Event }>()

const registration = reactive({
  tickets: 1,
})

function submit() {
  if (isClosed.value) return
  console.log('Registration payload', {
    eventId: props.event.id,
    tickets: registration.tickets,
  })
  alert('Registration submitted!')
}

const isClosed = computed(() => props.event.status !== 'published')

function formatDate(date: Date, pattern: string) {
  return format(date, pattern)
}

const statusSeverity = computed(() => {
  switch (props.event.status) {
    case 'published':
      return 'success'
    case 'draft':
      return 'secondary'
    case 'cancelled':
      return 'danger'
    default:
      return 'contrast'
  }
})
</script>
