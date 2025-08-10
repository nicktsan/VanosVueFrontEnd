<template>
  <Toast position="top-right" />
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
          <Tag
            v-for="cat in community.categories"
            :key="cat"
            :value="cat"
            severity="info"
            class="text-sm"
          />
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

      <!-- Posts section -->
      <Divider class="my-8" />
      <section>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-semibold">Recent posts</h3>
          <span v-if="community.posts?.length" class="text-sm text-gray-500"
            >{{ community.posts.length }} total</span
          >
        </div>

        <div v-if="community.posts?.length">
          <Accordion :multiple="true">
            <AccordionTab v-for="(post, idx) in community.posts" :key="idx">
              <template #header>
                <div class="flex items-start justify-between w-full gap-3">
                  <div class="min-w-0">
                    <div class="font-semibold truncate">{{ post.title }}</div>
                    <div class="text-xs text-gray-500 truncate">by {{ post.authorName }}</div>
                  </div>
                  <div class="flex items-center gap-3 shrink-0 text-gray-600">
                    <span class="inline-flex items-center gap-1 text-xs"
                      ><i class="pi pi-thumbs-up" /> {{ post.likes }}</span
                    >
                    <span class="inline-flex items-center gap-1 text-xs"
                      ><i class="pi pi-comments" /> {{ post.comments?.length ?? 0 }}</span
                    >
                  </div>
                </div>
              </template>

              <p class="mb-4 text-gray-800 whitespace-pre-line">{{ post.content }}</p>

              <div>
                <h4 class="font-medium text-gray-700 mb-2">Comments</h4>
                <Tree
                  v-if="post.comments?.length"
                  :value="commentTree(post.comments)"
                  class="comment-tree"
                >
                  <template #default="{ node }">
                    <div class="rounded-xl bg-gray-50 p-3 w-full">
                      <div class="flex items-start gap-2">
                        <i class="pi pi-user text-sm mt-1" />
                        <div class="flex-1 min-w-0">
                          <div class="text-sm font-medium text-gray-900">
                            {{ node.data.authorName }}
                          </div>
                          <p class="text-sm text-gray-700 whitespace-pre-line mt-1">
                            {{ node.data.content }}
                          </p>
                          <div class="mt-2 text-xs text-gray-500 flex items-center gap-2">
                            <i class="pi pi-thumbs-up" />
                            <span>{{ node.data.likes }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </Tree>
                <p v-else class="text-sm text-gray-500 italic">No comments yet.</p>
              </div>
            </AccordionTab>
          </Accordion>
        </div>
        <template v-else>
          <div class="rounded-xl border border-dashed p-6 text-center text-gray-500">
            No posts yet.
          </div>
        </template>
      </section>
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
import type { Community, Comment as CommentType } from '@/data/communities'

/* PrimeVue components */
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Chip from 'primevue/chip'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Divider from 'primevue/divider'
import Tree from 'primevue/tree'
import type { TreeNode } from 'primevue/treenode'

/* Props */
const props = defineProps<{ community: Community }>()
/* Emits */
const emit = defineEmits<{
  (e: 'request-collaboration', payload: { communityId: string | number; message: string }): void
}>()

/* Local state */
const showDialog = ref(false)
const requestMessage = ref('')
const toast = useToast()

/* Helpers */
function commentTree(comments: CommentType[] = []): TreeNode[] {
  return (comments ?? []).map((c, idx) => ({
    key: `${idx}-${c.authorName}`,
    data: c,
    children: commentTree(c.comments ?? []),
  }))
}

/* Handlers */
function sendRequest() {
  emit('request-collaboration', {
    communityId: props.community.id ?? props.community.name,
    message: requestMessage.value.trim(),
  })
  showDialog.value = false
  requestMessage.value = ''

  toast.add({
    severity: 'success',
    summary: 'Request sent',
    detail: `Your collaboration request to ${props.community.name} has been sent.`,
    life: 4000,
  })
}
</script>

<style scoped></style>
