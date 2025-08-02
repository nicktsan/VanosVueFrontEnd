<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { onMounted, ref, toRefs, computed } from 'vue'
import Menubar from 'primevue/menubar'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps(['session'])
const { session } = toRefs(props)

onMounted(() => {
  console.log('User session:')
  console.log(session?.value?.user)
})

async function handleSignOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Sign out error:', error instanceof Error ? error.message : error)
  }
}

const avatarUrl = computed(() => {
  return session?.value &&
    session.value.user &&
    session.value.user.user_metadata &&
    session.value.user.user_metadata.avatar_url
    ? session.value.user.user_metadata.avatar_url
    : null
})

const menuItems = ref([
  {
    // label: '',
    icon: 'pi pi-palette',
    items: [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => router.push('/myprofile'),
      },
      {
        label: 'Log Out',
        icon: 'pi pi-sign-out',
        command: handleSignOut,
      },
    ],
  },
])
</script>

<template>
  <Menubar :model="menuItems"> </Menubar>
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
  /* Add a top margin equal to or greater than the header's height */
  margin-top: 70px;
}
</style>
