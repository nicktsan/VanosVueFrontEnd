<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'
import router from '@/router'
import { supabase } from '@/lib/supabaseClient'
import { useMonitorSize } from '@/composables/monitor-size'

const sizes = useMonitorSize()

const menu = ref<InstanceType<typeof Menu> | null>(null)
const props = defineProps(['session'])
const { session } = toRefs(props)

const items = [
  { label: 'Profile', icon: 'pi pi-user', command: () => router.push('/myprofile') },
  { separator: true },
  { label: 'Logout', icon: 'pi pi-sign-out', command: () => logout() },
]

const avatarUrl = computed(() => {
  return session?.value &&
    session.value.user &&
    session.value.user.user_metadata &&
    session.value.user.user_metadata.avatar_url
    ? session.value.user.user_metadata.avatar_url
    : null
})

function toggleMenu(event: MouseEvent) {
  menu.value?.toggle(event)
}

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    //Send error to sentry
    // console.error('Sign out error:', error instanceof Error ? error.message : error)
  }
}
</script>

<template>
  <div>
    <Avatar
      v-if="sizes.isMobile.value"
      :image="avatarUrl"
      shape="circle"
      size="small"
      class="cursor-pointer"
      @click="toggleMenu"
    />
    <Avatar
      v-else
      :image="avatarUrl"
      shape="circle"
      size="large"
      class="cursor-pointer"
      @click="toggleMenu"
    />
    <Menu ref="menu" :model="items" :popup="true" />
  </div>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f0f0f0;
  padding: 1rem;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

main {
  margin-top: 70px;
}
</style>
