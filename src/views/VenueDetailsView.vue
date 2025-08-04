<template>
  <div class="container mx-auto px-4 py-8">
    <Galleria
      :value="venue.images"
      :numVisible="3"
      circular
      autoPlay
      :showThumbnails="true"
      class="mb-8"
    >
      <template #item="slotProps">
        <img :src="slotProps.item" class="w-full h-80 object-cover rounded-xl" :alt="venue.title" />
      </template>
      <template #thumbnail="slotProps">
        <img :src="slotProps.item" class="w-28 h-16 object-cover rounded-md" :alt="venue.title" />
      </template>
    </Galleria>

    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ venue.title }}</h1>
        <p class="text-muted-foreground">{{ venue.location }}</p>
      </div>
      <div class="flex items-center gap-2">
        <Rating :modelValue="averageRating" readonly :cancel="false" />
        <span class="text-sm text-muted-foreground">({{ reviews.length }} reviews)</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6">
        <p>{{ venue.description }}</p>

        <div>
          <h3 class="text-xl font-semibold mb-2">Amenities</h3>
          <div class="flex flex-wrap gap-2">
            <Badge v-for="amenity in venue.amenities" :key="amenity" severity="secondary">{{
              amenity
            }}</Badge>
          </div>
        </div>

        <div class="p-4 border rounded-xl flex items-start gap-4">
          <Avatar :label="hostInitials" shape="circle" size="large" />
          <div>
            <h3 class="text-lg font-semibold">Hosted by {{ host.name }}</h3>
            <p class="text-muted-foreground text-sm">{{ host.bio }}</p>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4">User Reviews</h3>
          <div v-if="reviews.length === 0" class="text-muted-foreground text-sm">
            No reviews yet.
          </div>
          <div v-else class="space-y-4">
            <Card v-for="review in reviews" :key="review.id" class="shadow-none border">
              <template #content>
                <div class="flex items-start gap-3 mb-1">
                  <Avatar :label="getInitials(review.user)" shape="circle" class="text-xs" />
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <span class="font-medium">{{ review.user }}</span>
                      <Rating
                        :modelValue="review.rating"
                        readonly
                        :cancel="false"
                        iconSize="12px"
                      />
                    </div>
                    <span class="text-xs text-muted-foreground">{{
                      formatDate(review.date, 'MMM d, yyyy')
                    }}</span>
                  </div>
                </div>
                <p class="text-sm">{{ review.comment }}</p>
              </template>
            </Card>
          </div>
        </div>
      </div>

      <div class="p-6 border rounded-xl space-y-6">
        <h3 class="text-xl font-semibold mb-4">Book This Venue</h3>
        <div class="flex flex-col gap-3">
          <label class="font-medium" for="date">Date & Time</label>
          <Calendar
            id="date"
            v-model="booking.dateTime"
            showTime
            hourFormat="12"
            :minDate="new Date()"
            class="w-full"
          />

          <label class="font-medium" for="attendees">Number of Attendees</label>
          <InputNumber
            id="attendees"
            v-model="booking.attendees"
            :min="1"
            :max="venue.capacity"
            class="w-full"
          />

          <Button label="Request Booking" class="w-full mt-4" @click="submitBooking" />
        </div>
        <small class="text-xs text-muted-foreground block"
          >Capacity: up to {{ venue.capacity }} guests</small
        >
        <small class="text-xs text-muted-foreground block"
          >Price: ${{ venue.pricePerHour }}/hr</small
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { format } from 'date-fns'
import Galleria from 'primevue/galleria'
import Calendar from 'primevue/calendar'
import InputNumber from 'primevue/inputnumber'
import Rating from 'primevue/rating'
import Badge from 'primevue/badge'
import Card from 'primevue/card'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'

import type { Venue, Host, Review } from '@/data/venues'

const props = defineProps<{ venue: Venue; host: Host; reviews: Review[] }>()

const booking = reactive({
  dateTime: null as Date | null,
  attendees: 1,
})

function submitBooking() {
  if (!booking.dateTime) {
    alert('Please select a date and time.')
    return
  }
  if (booking.attendees < 1 || booking.attendees > props.venue.capacity) {
    alert(`Attendees must be between 1 and ${props.venue.capacity}.`)
    return
  }
  alert('Booking request submitted!')
}

const averageRating = computed(() => {
  if (props.reviews.length === 0) return 0
  const sum = props.reviews.reduce((acc, r) => acc + r.rating, 0)
  return sum / props.reviews.length
})

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

const hostInitials = computed(() => getInitials(props.host.name))

function formatDate(date: Date, pattern: string) {
  return format(date, pattern)
}
</script>
