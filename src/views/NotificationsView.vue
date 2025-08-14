<!-- src/views/NotificationsView.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import Card from 'primevue/card'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Divider from 'primevue/divider'

// Adjust the import paths to your project structure
import type { Notification } from '@/data/notifications'
import { notifications as seedNotifications } from '@/data/notifications'
import { useRouter } from 'vue-router'

const list = ref<Notification[]>([...seedNotifications])

const hasNotifications = computed(() => list.value.length > 0)
const count = computed(() => list.value.length)

function refresh() {
  // Since this is hard-coded data, "refresh" just resets from the source.
  list.value = [...seedNotifications]
}

function reply(n: Notification) {
  // Wire this up to your composer / modal if desired
  console.debug('Reply to notification:', n)
}
const router = useRouter()
function openCommunity(id: string) {
  // Replace with router navigation if desired:
  router.push(`/communitydetails/${id}`)
  //   console.debug('Open community', id)
}
</script>

<template>
  <section class="mx-auto w-full max-w-3xl px-4 py-6">
    <!-- Header -->
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-2xl font-semibold tracking-tight">Notifications</h1>
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ count }} total</span>
        <Divider layout="vertical" />
        <Button
          size="small"
          class="p-button-outlined"
          icon="pi pi-refresh"
          label="Refresh"
          @click="refresh"
        />
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="!hasNotifications"
      class="rounded-2xl border border-gray-200 p-8 text-center dark:border-gray-800"
    >
      <div
        class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
      >
        <i class="pi pi-bell text-xl opacity-70" aria-hidden="true"></i>
      </div>
      <h2 class="mb-1 text-lg font-medium">You’re all caught up</h2>
      <p class="mx-auto max-w-sm text-sm text-gray-500 dark:text-gray-400">
        No notifications right now. When communities reach out, they’ll show up here.
      </p>
    </div>

    <!-- Notifications list -->
    <div v-else class="space-y-4">
      <Card
        v-for="(n, idx) in list"
        :key="`${n.from.id}-${idx}`"
        class="shadow-none border border-gray-200 rounded-2xl overflow-hidden dark:border-gray-800"
      >
        <template #content>
          <div class="flex items-start gap-4 p-4">
            <!-- Community image -->
            <Avatar
              :image="n.from.image"
              :label="!n.from.image ? (n.from.name?.[0] ?? 'C') : undefined"
              shape="circle"
              size="large"
              class="shrink-0 cursor-pointer"
              @click="openCommunity(n.from.id)"
            />

            <!-- Text content -->
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  class="text-base font-semibold cursor-pointer hover:underline underline-offset-4"
                  @click="openCommunity(n.from.id)"
                >
                  {{ n.from.name }}
                </button>
                <span
                  class="text-xs rounded-full px-2 py-0.5 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  Community
                </span>
              </div>

              <p class="mt-1 text-sm text-gray-700 dark:text-gray-300 break-words">
                {{ n.content }}
              </p>

              <!-- Optional actions -->
              <div class="mt-3 flex items-center gap-2">
                <Button
                  size="small"
                  icon="pi pi-check"
                  class="p-button-text"
                  label="Accept"
                  @click="reply(n)"
                />
                <Button
                  size="small"
                  icon="pi pi-times"
                  class="p-button-text"
                  label="Reject"
                  @click="reply(n)"
                />
                <Button
                  size="small"
                  icon="pi pi-external-link"
                  class="p-button-text"
                  label="View community"
                  @click="openCommunity(n.from.id)"
                />
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </section>
</template>

<style scoped>
/* Minimal extra styling; PrimeVue + Tailwind do most of the work. */
</style>
