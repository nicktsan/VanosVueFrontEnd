<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import type { CallbackTypes } from 'vue3-google-login'
const callback: CallbackTypes.CredentialCallback = async (response) => {
  /*(const { data, error } = */ await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: response.credential,
  })
}
</script>

<template>
  <GoogleLogin :callback="callback" />
</template>
