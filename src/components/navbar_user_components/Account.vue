<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'

async function handleSignOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Sign out error:', error)
  }
}
</script>

<template>
  <button @click="handleSignOut">Log Out</button>
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
