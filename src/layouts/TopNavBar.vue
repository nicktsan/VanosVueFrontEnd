<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import GoogleLogin from '@/components/navbar_user_components/GoogleLogin.vue'
import AccountMenuBar from '@/components/navbar_user_components/AccountMenuBar.vue'
import { supabase } from '@/lib/supabaseClient'
import Button from 'primevue/button'

const session = ref()
const updateOffset = () => {
  const nav = document.querySelector('.navbar') as HTMLElement | null
  if (nav) document.documentElement.style.setProperty('--navbar-height', `${nav.offsetHeight}px`)
}
onBeforeUnmount(() => window.removeEventListener('resize', updateOffset))
onMounted(async () => {
  updateOffset()
  window.addEventListener('resize', updateOffset)
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <header class="navbar">
    <div class="nav-left">
      <slot name="left">
        <router-link to="/">
          <Button label="Home" size="large" class="p-button-outlined" />
        </router-link>
        <router-link to="/venues">
          <Button label="Browse Venues" size="large" class="p-button-outlined" />
        </router-link>
        <router-link to="/events">
          <Button label="Discover Events" size="large" class="p-button-outlined" />
        </router-link>
      </slot>
    </div>

    <div class="nav-right">
      <router-link to="/create-event">
        <Button label="Create Event" size="large" class="p-button-outlined" />
      </router-link>
      <router-link to="/create-venue">
        <Button label="Create Venue" size="large" class="p-button-outlined" />
      </router-link>
      <template v-if="session">
        <AccountMenuBar :session="session" />
      </template>
      <template v-else>
        <GoogleLogin />
      </template>
    </div>
  </header>

  <!-- pushes page content below the navbar regardless of its height -->
  <main class="content">
    <slot />
  </main>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  background-color: #f0f0f0;
  padding: 1rem;
  z-index: 100;
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;

  max-height: 33vh;
  min-height: 56px;
  overflow-y: hidden;
}

.content {
  padding-top: calc(var(--navbar-height, 70px) + 1rem);
}

.nav-left {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.75rem;
  overflow-x: auto;
  scrollbar-width: thin;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}
</style>
