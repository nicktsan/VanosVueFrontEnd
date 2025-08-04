<script setup lang="ts">
import { ref, onMounted } from 'vue'
import GoogleLogin from '@/components/navbar_user_components/GoogleLogin.vue'
import { supabase } from '@/lib/supabaseClient'
import AccountMenuBar from '@/components/navbar_user_components/AccountMenuBar.vue'
import Button from 'primevue/button'

const session = ref()
onMounted(async () => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <header>
    <div class="nav-left">
      <slot name="left">
        <router-link to="/">
          <Button label="Home" size="large" class="w-full sm:w-auto p-button-outlined" />
        </router-link>
        <router-link to="/venues">
          <Button label="Browse Venues" size="large" class="w-full sm:w-auto p-button-outlined" />
        </router-link>
        <router-link to="/events">
          <Button label="Discover Events" size="large" class="w-full sm:w-auto p-button-outlined" />
        </router-link>
      </slot>
    </div>
    <div class="nav-right">
      <template v-if="session">
        <AccountMenuBar :session="session" />
      </template>
      <template v-else>
        <GoogleLogin />
      </template>
    </div>
  </header>
  <main>
    <slot />
  </main>
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
