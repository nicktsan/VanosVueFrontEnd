<script setup lang="ts">
import { ref, onMounted } from 'vue'
import GoogleLogin from '@/components/navbar_user_components/GoogleLogin.vue'
import { supabase } from '@/lib/supabaseClient'
import Account from '@/components/navbar_user_components/Account.vue'

// const user = ref<null | Record<string, unknown>>(null)
const session = ref()
onMounted(async () => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  // Listen to auth state changes so the navbar updates automatically.
  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <header>
    <div class="nav-left">
      <!-- Optional: add logo or navigation links here -->
      <slot name="left"></slot>
    </div>
    <div class="nav-right">
      <!-- Show Log Out if logged-in; otherwise, show GoogleLogin -->
      <template v-if="session">
        <Account />
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
  /* Add a top margin equal to or greater than the header's height */
  margin-top: 70px;
}
</style>
