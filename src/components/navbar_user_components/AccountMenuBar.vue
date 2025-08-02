<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'
import router from '@/router'
import { supabase } from '@/lib/supabaseClient'

interface MenuComponent {
  toggle: (event: MouseEvent) => void
}
/* reference to the Menu instance so we can open/close it programmatically */
const menu = ref<MenuComponent | null>(null)
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
  if (menu.value) {
    menu.value.toggle(event)
  }
}

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Sign out error:', error instanceof Error ? error.message : error)
  }
}
</script>

<template>
  <div>
    <Avatar
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
