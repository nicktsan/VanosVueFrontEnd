<template>
  <div class="min-h-screen bg-background flex items-center justify-center">
    <section class="container px-4 text-center">
      <div class="max-w-4xl mx-auto">
        <h1
          class="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text"
        >
          Collabstra
        </h1>
        <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          The shortest path to finding your next cross-community collaboration!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/communities">
            <Button label="Browse Communities" size="large" class="w-full sm:w-auto" />
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
</script>
