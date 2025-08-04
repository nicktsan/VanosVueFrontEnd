<template>
  <div class="container mx-auto px-4 py-10">
    <!-- Page Header -->
    <div class="mb-10 text-center md:text-left">
      <h1 class="text-3xl font-bold mb-2">Create a New Venue</h1>
      <p class="text-muted-foreground max-w-2xl">
        Fill out the form below to list your space on VenueEvents. All fields marked with
        <span class="text-red-500">*</span> are required.
      </p>
    </div>

    <!-- Venue Form -->
    <form @submit.prevent="submit" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Fields -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Title -->
        <div class="flex flex-col gap-2">
          <label class="font-medium" for="title">Title <span class="text-red-500">*</span></label>
          <InputText
            id="title"
            v-model="venue.title"
            placeholder="e.g. Modern Conference Center"
            class="w-full"
            required
          />
        </div>

        <!-- Description -->
        <div class="flex flex-col gap-2">
          <label class="font-medium" for="description"
            >Description <span class="text-red-500">*</span></label
          >
          <Textarea
            id="description"
            v-model="venue.description"
            rows="5"
            autoResize
            required
            placeholder="Tell attendees what makes your space unique"
          />
        </div>

        <!-- Location -->
        <div class="flex flex-col gap-2">
          <label class="font-medium" for="location"
            >Location <span class="text-red-500">*</span></label
          >
          <InputText
            id="location"
            v-model="venue.location"
            placeholder="City, State / Region"
            class="w-full"
            required
          />
        </div>

        <!-- Capacity & Price -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col gap-2">
            <label class="font-medium" for="capacity"
              >Capacity <span class="text-red-500">*</span></label
            >
            <InputNumber
              id="capacity"
              v-model="venue.capacity"
              :min="1"
              :step="1"
              class="w-full"
              required
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-medium" for="price"
              >Price / Hour (USD) <span class="text-red-500">*</span></label
            >
            <InputNumber
              id="price"
              v-model="venue.pricePerHour"
              mode="currency"
              currency="USD"
              class="w-full"
              required
            />
          </div>
        </div>

        <!-- Amenities -->
        <div class="flex flex-col gap-2">
          <label class="font-medium" for="amenities">Amenities</label>
          <Chips
            id="amenities"
            v-model="venue.amenities"
            separator=","
            placeholder="WiFi, Projector, Kitchen…"
            class="w-full"
          />
          <small class="text-muted-foreground"
            >Press <kbd>Enter</kbd> or type a comma to add multiple amenities.</small
          >
        </div>
      </div>

      <!-- Images & Submit -->
      <div class="space-y-6">
        <!-- Image Upload -->
        <div class="flex flex-col gap-2">
          <label class="font-medium">Venue Images</label>
          <FileUpload
            mode="basic"
            accept="image/*"
            chooseLabel="Upload Images"
            multiple
            :customUpload="true"
            @uploader="onImageSelect"
          />
          <div v-if="venue.images.length" class="grid grid-cols-3 gap-3 mt-3">
            <img
              v-for="img in venue.images"
              :key="img"
              :src="img"
              class="w-full h-24 object-cover rounded-md"
            />
          </div>
        </div>

        <!-- Actions -->
        <Button type="submit" label="Create Venue" class="w-full" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
// import { v4 as uuidv4 } from 'uuid'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import Chips from 'primevue/chips'
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import type { Venue } from '@/data/venues'

// -------- State --------
const venue = reactive<Venue>({
  id: '3421wfw3fsd',
  title: '',
  description: '',
  location: '',
  capacity: 0,
  pricePerHour: 0,
  amenities: [],
  images: [],
})

// -------- Methods --------
function onImageSelect(event: any) {
  const files: File[] = event.files ?? []
  files.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result
      if (typeof result === 'string') venue.images.push(result)
    }
    reader.readAsDataURL(file)
  })
  // reset FileUpload internal file list
  event.options.clear()
}

function submit() {
  // Basic validation
  if (
    !venue.title ||
    !venue.description ||
    !venue.location ||
    venue.capacity < 1 ||
    venue.pricePerHour <= 0
  ) {
    alert('Please fill in all required fields.')
    return
  }
  // Placeholder for API call / store dispatch
  console.log('Venue payload', JSON.parse(JSON.stringify(venue)))
  alert('Venue created! Check console for payload.')
  // Reset (optional)
  Object.assign(venue, {
    id: '3421wfw3fsd',
    title: '',
    description: '',
    location: '',
    capacity: 0,
    pricePerHour: 0,
    amenities: [],
    images: [],
  })
}
</script>
