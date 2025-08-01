<script setup lang="ts">
import GoogleLogin from '@/components/GoogleLogin.vue'
</script>

<template>
  <header>
    <div class="nav-left">
      <!-- Optional: add logo or navigation links here -->
      <slot name="left"></slot>
    </div>
    <div class="nav-right">
      <GoogleLogin />
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
