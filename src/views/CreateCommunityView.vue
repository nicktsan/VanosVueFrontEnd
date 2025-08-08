<template>
  <Card class="w-full max-w-3xl mx-auto shadow-2xl rounded-2xl overflow-hidden">
    <template #title>
      <div class="flex items-center justify-between gap-4">
        <h2 class="text-2xl font-bold">Create a Community</h2>
        <span class="text-sm text-gray-500">All fields are required</span>
      </div>
    </template>

    <template #content>
      <div class="grid grid-cols-1 gap-6">
        <!-- Name -->
        <div>
          <label for="name" class="block text-sm font-medium mb-1">Name</label>
          <InputText
            id="name"
            v-model.trim="form.name"
            :class="{ 'p-invalid': submitted && !form.name }"
            placeholder="Your community name"
            class="w-full"
          />
          <small v-if="submitted && !form.name" class="text-red-500">Name is required.</small>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium mb-1">Description</label>
          <Textarea
            id="description"
            v-model.trim="form.description"
            rows="4"
            auto-resize
            :class="{ 'p-invalid': submitted && !form.description }"
            placeholder="What is this community about?"
            class="w-full"
          />
          <small v-if="submitted && !form.description" class="text-red-500"
            >Description is required.</small
          >
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="block text-sm font-medium mb-1">Category</label>
          <Dropdown
            input-id="category"
            v-model="form.category"
            :options="categoryOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select a category"
            class="w-full"
            :class="{ 'p-invalid': submitted && !form.category }"
          />
          <small v-if="submitted && !form.category" class="text-red-500"
            >Category is required.</small
          >
        </div>

        <!-- Image URL -->
        <div>
          <label for="image" class="block text-sm font-medium mb-1">Image URL</label>
          <InputText
            id="image"
            v-model.trim="form.image"
            :class="{ 'p-invalid': submitted && !validImage }"
            placeholder="https://..."
            class="w-full"
          />
          <small v-if="submitted && !form.image" class="text-red-500">Image URL is required.</small>
          <small v-else-if="submitted && form.image && !validImage" class="text-red-500"
            >Enter a valid URL (http/https).</small
          >

          <!-- Live preview -->
          <div v-if="showPreview && form.image && validImage" class="mt-3">
            <div class="rounded-xl overflow-hidden border">
              <img
                :src="form.image"
                alt="Image preview"
                class="w-full h-48 object-cover"
                @error="onImageError"
              />
            </div>
            <small v-if="imageErrored" class="text-amber-600"
              >We couldn't load this image. The URL may be invalid or blocked.</small
            >
          </div>
        </div>

        <!-- Location -->
        <div>
          <label for="location" class="block text-sm font-medium mb-1">Location</label>
          <InputText
            id="location"
            v-model.trim="form.location"
            :class="{ 'p-invalid': submitted && !form.location }"
            placeholder="e.g. Vancouver, BC, Canada"
            class="w-full"
          />
          <small v-if="submitted && !form.location" class="text-red-500"
            >Location is required.</small
          >
        </div>

        <Divider />

        <!-- Actions -->
        <div class="flex justify-end gap-2">
          <Button label="Cancel" severity="secondary" class="p-button-text" @click="onCancel" />
          <Button
            :disabled="!isValid"
            label="Create Community"
            icon="pi pi-check"
            @click="onSubmit"
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import type { CategoryOption } from '@/data/communities'
import { categories as defaultCategories } from '@/data/communities'

/** Props */
const props = withDefaults(
  defineProps<{
    /** Provide category options; defaults to categories from data file */
    categories?: CategoryOption[]
    /** Show live image preview */
    showPreview?: boolean
  }>(),
  {
    categories: () => defaultCategories,
    showPreview: true,
  },
)

/** Emits */
const emit = defineEmits<{
  /** Fired when user submits a valid form */
  (
    e: 'create',
    payload: {
      name: string
      description: string
      category: string
      image: string
      location: string
    },
  ): void
  /** Fired when user clicks cancel */
  (e: 'cancel'): void
}>()

/** Local state */
const form = reactive({
  name: '',
  description: '',
  category: '',
  image: '',
  location: '',
})
const submitted = ref(false)
const imageErrored = ref(false)

/** Derived */
const categoryOptions = computed(() => props.categories)
const validUrl = (url: string) => /^(https?:)\/\//i.test(url)
const validImage = computed(() => !!form.image && validUrl(form.image) && !imageErrored.value)
const isValid = computed(
  () =>
    !!form.name &&
    !!form.description &&
    !!form.category &&
    !!form.location &&
    !!form.image &&
    validUrl(form.image) &&
    !imageErrored.value,
)

watch(
  () => form.image,
  () => {
    imageErrored.value = false
  },
)

/** Handlers */
function onImageError() {
  imageErrored.value = true
}
function onSubmit() {
  submitted.value = true
  if (!isValid.value) return
  emit('create', { ...form })
}
function onCancel() {
  emit('cancel')
}
</script>

<style scoped></style>
