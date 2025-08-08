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
            placeholder="e.g. Vue.js Enthusiasts"
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

        <!-- Image upload (device) -->
        <div>
          <label class="block text-sm font-medium mb-1">Image</label>

          <!-- Dropzone -->
          <div
            class="rounded-xl border border-dashed p-4 text-center hover:bg-gray-50 transition cursor-pointer"
            @dragover.prevent
            @drop.prevent="onDrop"
            @click="fileInput?.click()"
          >
            <p class="text-sm text-gray-600">
              Drag & drop an image here, or <span class="text-blue-600 underline">browse</span>
            </p>
            <p class="text-xs text-gray-500 mt-1">
              PNG/JPG up to {{ (MAX_FILE_SIZE / 1024 / 1024).toFixed(0) }}MB
            </p>
            <input
              ref="fileInput"
              type="file"
              class="hidden"
              accept="image/*"
              @change="onFileChange"
            />
          </div>

          <small v-if="submitted && !imageFile" class="text-red-500 mt-2 block"
            >Image is required.</small
          >
          <small v-if="fileError" class="text-red-500 mt-2 block">{{ fileError }}</small>

          <!-- Live preview -->
          <div v-if="imagePreviewUrl" class="mt-3">
            <div class="rounded-xl overflow-hidden border">
              <img :src="imagePreviewUrl" alt="Image preview" class="w-full h-48 object-cover" />
            </div>
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
import { reactive, ref, computed, watch, onBeforeUnmount } from 'vue'
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
    categories?: CategoryOption[]
    showPreview?: boolean
  }>(),
  {
    categories: () => defaultCategories,
    showPreview: true,
  },
)

/** Emits */
const emit = defineEmits<{
  /** Now emits the selected File instead of URL */
  (
    e: 'create',
    payload: {
      name: string
      description: string
      category: string
      location: string
      imageFile: File
    },
  ): void
  (e: 'cancel'): void
}>()

/** Constants */
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

/** Local state */
const form = reactive({
  name: '',
  description: '',
  category: '',
  location: '',
})
const submitted = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const imageFile = ref<File | null>(null)
const imagePreviewUrl = ref<string>('')
const fileError = ref<string>('')

/** Derived */
const categoryOptions = computed(() => props.categories)
const isValid = computed(
  () =>
    !!form.name && !!form.description && !!form.category && !!form.location && !!imageFile.value,
)

watch(imageFile, (newFile, oldFile) => {
  // Clean up old preview URL
  if (oldFile && imagePreviewUrl.value) URL.revokeObjectURL(imagePreviewUrl.value)
  imagePreviewUrl.value = newFile ? URL.createObjectURL(newFile) : ''
  fileError.value = ''
})

onBeforeUnmount(() => {
  if (imagePreviewUrl.value) URL.revokeObjectURL(imagePreviewUrl.value)
})

/** Handlers */
function validateFile(file: File): string | null {
  if (!file.type.startsWith('image/')) return 'File must be an image.'
  if (file.size > MAX_FILE_SIZE)
    return `Image must be under ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(0)}MB.`
  return null
}

function setFile(file: File) {
  const err = validateFile(file)
  if (err) {
    fileError.value = err
    imageFile.value = null
    return
  }
  imageFile.value = file
}

function onFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files && files[0]) setFile(files[0])
}

function onDrop(e: DragEvent) {
  const files = e.dataTransfer?.files
  if (files && files[0]) setFile(files[0])
}

function onSubmit() {
  submitted.value = true
  if (!isValid.value || !imageFile.value) return
  emit('create', {
    name: form.name,
    description: form.description,
    category: form.category,
    location: form.location,
    imageFile: imageFile.value,
  })
}
function onCancel() {
  emit('cancel')
}
</script>

<style scoped></style>
