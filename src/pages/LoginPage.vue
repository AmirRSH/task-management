<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const loading = ref(false)
const error = ref('')


const handleLogin = () => {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Email and password are required'
    return
  }

  loading.value = true

  setTimeout(() => {
    authStore.login()

    loading.value = false

    router.push('/')
  }, 800)
}
</script>


<template>
  <v-container
    class="fill-height d-flex align-center justify-center"
  >
    <v-card
      width="420"
      class="pa-6"
    >
      <v-card-title class="text-h5 text-center mb-4">
        Task Management
      </v-card-title>

      <v-card-subtitle class="text-center mb-6">
        Login to your account
      </v-card-subtitle>


      <v-card-text>

        <v-alert
          v-if="error"
          type="error"
          class="mb-4"
        >
          {{ error }}
        </v-alert>


        <v-text-field
          v-model="email"
          label="Email"
          variant="outlined"
          prepend-inner-icon="mdi-email"
        />


        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          variant="outlined"
          prepend-inner-icon="mdi-lock"
        />


        <v-btn
          block
          color="primary"
          size="large"
          :loading="loading"
          @click="handleLogin"
        >
          Login
        </v-btn>

      </v-card-text>

    </v-card>
  </v-container>
</template>