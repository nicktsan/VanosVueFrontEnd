<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Section -->
    <section class="container mx-auto px-4 py-20 text-center">
      <div class="max-w-4xl mx-auto">
        <h1
          class="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text"
        >
          VenueEvents
        </h1>
        <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          The ultimate platform combining venue hosting with event management. Streamline your event
          planning from venue booking to attendee registration.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/venues">
            <Button label="Browse Venues" size="large" class="w-full sm:w-auto" />
          </router-link>
          <router-link to="/events">
            <Button
              label="Discover Events"
              size="large"
              class="w-full sm:w-auto p-button-outlined"
            />
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Everything You Need</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Whether you're hosting a venue or organizing an event, we've got all the tools you need
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card class="text-center">
          <template #content>
            <i class="pi pi-building text-primary text-4xl mb-4" />
            <h3 class="text-xl font-semibold mb-2">List Your Venue</h3>
            <p class="text-muted-foreground">
              Monetize your space by hosting events. Set your own pricing and availability.
            </p>
          </template>
        </Card>

        <Card class="text-center">
          <template #content>
            <i class="pi pi-calendar text-primary text-4xl mb-4" />
            <h3 class="text-xl font-semibold mb-2">Create Events</h3>
            <p class="text-muted-foreground">
              Organize memorable events with our comprehensive event management tools.
            </p>
          </template>
        </Card>

        <Card class="text-center">
          <template #content>
            <i class="pi pi-users text-primary text-4xl mb-4" />
            <h3 class="text-xl font-semibold mb-2">Manage Bookings</h3>
            <p class="text-muted-foreground">
              Handle reservations, payments, and communication all in one place.
            </p>
          </template>
        </Card>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="bg-muted/30 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">How It Works</h2>
          <p class="text-muted-foreground">Simple steps to get started</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Venue Hosts -->
          <div class="space-y-6">
            <h3 class="text-2xl font-semibold">For Venue Hosts</h3>
            <div v-for="step in hostSteps" :key="step.number" class="flex items-start space-x-3">
              <div
                class="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"
              >
                {{ step.number }}
              </div>
              <p>{{ step.text }}</p>
            </div>
          </div>

          <!-- Event Organizers -->
          <div class="space-y-6">
            <h3 class="text-2xl font-semibold">For Event Organizers</h3>
            <div
              v-for="step in organizerSteps"
              :key="step.number"
              class="flex items-start space-x-3"
            >
              <div
                class="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"
              >
                {{ step.number }}
              </div>
              <p>{{ step.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'

interface Step {
  number: number
  text: string
}

const hostSteps: Step[] = [
  { number: 1, text: 'List your venue with photos and details' },
  { number: 2, text: 'Set your pricing and availability' },
  { number: 3, text: 'Accept bookings and earn money' },
]

const organizerSteps: Step[] = [
  { number: 1, text: 'Browse and book the perfect venue' },
  { number: 2, text: 'Create your event and manage registrations' },
  { number: 3, text: 'Host a successful event' },
]
</script>

<!--
  Styles are managed with TailwindCSS utility classes.
  Make sure Tailwind and PrimeVue (including primeicons) are configured in your project.
-->
