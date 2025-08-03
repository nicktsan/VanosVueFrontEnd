<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Page Header -->
    <div class="mb-8 text-center md:text-left">
      <h1 class="text-3xl font-bold mb-2">Create an Event</h1>
      <p class="text-muted-foreground max-w-2xl">
        Set up your event details, ticketing, and capacity in a few clicks—just like Luma’s event
        creation flow.
      </p>
    </div>

    <!-- Event Form -->
    <form @submit.prevent="submit" class="space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Start Time -->
        <div class="flex flex-col gap-2">
          <label class="font-medium" for="start">Start Time</label>
          <Calendar
            id="start"
            v-model="form.startTime"
            showTime
            hourFormat="12"
            :showIcon="true"
            placeholder="Select start date & time"
            class="w-full"
          />
        </div>

        <!-- End Time -->
        <div class="flex flex-col gap-2">
          <label class="font-medium" for="end">End Time</label>
          <Calendar
            id="end"
            v-model="form.endTime"
            showTime
            hourFormat="12"
            :showIcon="true"
            placeholder="Select end date & time"
            class="w-full"
          />
        </div>

        <!-- Time Zone -->
        <div class="flex flex-col gap-2">
          <label class="font-medium" for="timezone">Time Zone</label>
          <Dropdown
            id="timezone"
            v-model="form.timezone"
            :options="timezones"
            optionLabel="label"
            optionValue="value"
            placeholder="Select time zone"
            class="w-full"
          />
        </div>

        <!-- Location -->
        <div class="flex flex-col gap-2">
          <label class="font-medium" for="location">Event Location</label>
          <InputText
            id="location"
            v-model="form.location"
            placeholder="e.g. 123 Market St, San Francisco"
            class="w-full"
          />
        </div>

        <!-- Ticket Price -->
        <div class="flex flex-col gap-2">
          <label class="font-medium" for="price">Ticket Price</label>
          <InputNumber
            id="price"
            v-model="form.ticketPrice"
            mode="currency"
            currency="USD"
            class="w-full"
          />
        </div>

        <!-- Capacity -->
        <div class="flex flex-col gap-2">
          <label class="font-medium" for="capacity">Capacity</label>
          <InputNumber id="capacity" v-model="form.capacity" :min="1" :step="1" class="w-full" />
        </div>

        <!-- Approval Required -->
        <div class="flex flex-col gap-2">
          <label class="font-medium" for="approval">Approval Required</label>
          <ToggleButton
            id="approval"
            v-model="form.approvalRequired"
            onLabel="Yes"
            offLabel="No"
            class="w-full md:w-auto"
          />
        </div>
      </div>

      <!-- Description -->
      <div class="flex flex-col gap-2">
        <label class="font-medium" for="description">Description</label>
        <Textarea
          id="description"
          v-model="form.description"
          rows="5"
          autoResize
          placeholder="Tell attendees what to expect..."
        />
      </div>

      <!-- Submit -->
      <div class="pt-4">
        <Button type="submit" label="Create Event" class="w-full md:w-auto" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import ToggleButton from 'primevue/togglebutton'

interface TimezoneOption {
  label: string
  value: string
}

// A small, representative subset of common time zones
const timezones: TimezoneOption[] = [
  { label: 'UTC', value: 'UTC' },
  { label: 'Pacific Time (US & Canada)', value: 'America/Los_Angeles' },
  { label: 'Mountain Time (US & Canada)', value: 'America/Denver' },
  { label: 'Central Time (US & Canada)', value: 'America/Chicago' },
  { label: 'Eastern Time (US & Canada)', value: 'America/New_York' },
  { label: 'GMT (London)', value: 'Europe/London' },
  { label: 'Central European Time', value: 'Europe/Berlin' },
  { label: 'India Standard Time', value: 'Asia/Kolkata' },
]

interface EventForm {
  startTime: Date | null
  endTime: Date | null
  timezone: string | null
  location: string
  description: string
  ticketPrice: number | null
  capacity: number | null
  approvalRequired: boolean
}

const form = ref<EventForm>({
  startTime: null,
  endTime: null,
  timezone: null,
  location: '',
  description: '',
  ticketPrice: null,
  capacity: null,
  approvalRequired: false,
})

function submit() {
  // TODO: Replace with API call or emit event to parent
  console.log('Event payload', form.value)
  // Basic client‑side validation example
  if (!form.value.startTime || !form.value.endTime) {
    alert('Please select both start and end times.')
    return
  }
  if (!form.value.timezone) {
    alert('Please choose a time zone.')
    return
  }
  alert('Event created! (Check console for payload)')
}
</script>

<!--
  Dependencies:
  - PrimeVue (Calendar, Dropdown, Input components, ToggleButton, Button)
  - PrimeIcons
  - TailwindCSS for layout & spacing classes
  Simply register the components globally or locally in your Vue app and ensure CSS imports (PrimeVue + Tailwind) are in place.
-->
