<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'

const callback = async (response) => {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: response.credential,
  })
}
</script>

<template>
  <GoogleLogin :callback="callback" />
</template>
