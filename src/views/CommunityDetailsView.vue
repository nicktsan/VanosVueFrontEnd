<template>
  <!-- Community Details Card -->
  <Card class="w-full max-w-3xl mx-auto shadow-2xl rounded-2xl overflow-hidden">
    <!-- Cover image -->
    <template #header>
      <img :src="community.image" :alt="community.name" class="w-full h-64 object-cover" />
    </template>

    <!-- Title, category & action button -->
    <template #title>
      <div class="flex flex-col sm:flex-row sm:items-center gap-4">
        <div class="flex items-center gap-3 flex-1">
          <h2 class="text-3xl font-bold text-gray-900">{{ community.name }}</h2>
          <Tag :value="community.category" severity="info" class="text-sm" />
        </div>
        <Button
          label="Request Collaboration"
          icon="pi pi-handshake"
          @click="showDialog = true"
          class="whitespace-nowrap"
        />
      </div>
    </template>

    <!-- Main content -->
    <template #content>
      <!-- Description -->
      <p class="mb-6 text-gray-700">{{ community.description }}</p>

      <!-- Key facts grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <!-- Creator -->
        <div class="flex items-center gap-2">
          <i class="pi pi-user text-lg" />
          <span><strong>Creator:</strong> {{ community.creator }}</span>
        </div>

        <!-- Location -->
        <div class="flex items-center gap-2">
          <i class="pi pi-map-marker text-lg" />
          <span><strong>Location:</strong> {{ community.location }}</span>
        </div>

        <!-- Members -->
        <div class="flex items-center gap-2">
          <i class="pi pi-users text-lg" />
          <span><strong>Members:</strong> {{ community.members.toLocaleString() }}</span>
        </div>

        <!-- Looking For -->
        <div v-if="community.lookingFor?.length" class="flex items-start gap-2">
          <i class="pi pi-search text-lg" />
          <div class="flex flex-wrap gap-2">
            <span class="font-semibold mr-1">Looking for:</span>
            <Chip
              v-for="item in community.lookingFor"
              :key="item"
              :label="item"
              class="bg-blue-50 text-blue-700"
            />
          </div>
        </div>

        <!-- Current Collaborators -->
        <div
          v-if="community.currentCollaborators?.length"
          class="flex items-start gap-2 md:col-span-2"
        >
          <i class="pi pi-handshake text-lg" />
          <div>
            <span class="font-semibold mr-1">Current collaborators:</span>
            <div class="flex flex-wrap gap-2 mt-1">
              <Chip
                v-for="c in community.currentCollaborators"
                :key="c"
                :label="c"
                class="bg-green-50 text-green-600"
              />
            </div>
          </div>
        </div>

        <!-- Past Collaborators -->
        <div
          v-if="community.pastCollaborators?.length"
          class="flex items-start gap-2 md:col-span-2"
        >
          <i class="pi pi-history text-lg" />
          <div>
            <span class="font-semibold mr-1">Past collaborators:</span>
            <div class="flex flex-wrap gap-2 mt-1">
              <Chip
                v-for="c in community.pastCollaborators"
                :key="c"
                :label="c"
                class="bg-yellow-50 text-yellow-600"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>

  <!-- Collaboration Request Dialog -->
  <Dialog
    v-model:visible="showDialog"
    modal
    maximizable
    header="Request Collaboration"
    class="w-full md:w-3/5 lg:w-2/5"
  >
    <div class="p-fluid">
      <label for="request-message" class="block mb-2 font-medium" aria-label="Request message">
        Message to the community admins
      </label>
      <Textarea
        id="request-message"
        v-model="requestMessage"
        rows="5"
        auto-resize
        placeholder="Tell them why you'd like to collaborate..."
        class="mb-4"
      />

      <div class="flex justify-end gap-2 mt-4">
        <Button
          label="Cancel"
          severity="secondary"
          class="p-button-text"
          @click="showDialog = false"
        />
        <Button
          label="Send Request"
          icon="pi pi-send"
          @click="sendRequest"
          :disabled="!requestMessage.trim()"
        />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Community } from '@/data/communities'

/* PrimeVue components */
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Chip from 'primevue/chip'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Textarea from 'primevue/textarea'

/* Props */
const props = defineProps<{ community: Community }>()

/* Emits */
const emit = defineEmits<{
  (e: 'request-collaboration', payload: { communityId: string | number; message: string }): void
}>()

/* Local state */
const showDialog = ref(false)
const requestMessage = ref('')

/* Handlers */
function sendRequest() {
  emit('request-collaboration', {
    communityId: props.community.id ?? props.community.name,
    message: requestMessage.value.trim(),
  })
  showDialog.value = false
  requestMessage.value = ''
}
</script>

<style scoped></style>
