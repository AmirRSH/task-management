<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()

const isSignUp = ref(false)

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
    error.value = ''

    if (!email.value || !password.value) {
        error.value = 'Email and password are required'
        return
    }

    loading.value = true

    try {
        await authStore.login(
            email.value,
            password.value
        )

        router.push('/')
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

const handleSignUp = async () => {
    error.value = ''

    if (!name.value || !email.value || !password.value || !confirmPassword.value) {
        error.value = 'All fields are required'
        return
    }

    if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match'
        return
    }

    loading.value = true

    try {
        await userStore.fetchUsers()

        const existingUser = userStore.users.find(
            user => user.email === email.value
        )

        if (existingUser) {
            throw new Error('This email is already registered')
        }

        const newUser = await userStore.addUser({
            name: name.value,
            email: email.value,
            password: password.value,
        })

        await authStore.login(
            newUser.email,
            password.value
        )

        router.push('/')
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

const switchMode = () => {
    isSignUp.value = !isSignUp.value
    error.value = ''
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
                {{ isSignUp ? 'Create your account' : 'Login to your account' }}
            </v-card-subtitle>

            <v-card-text>
                <v-alert
                    v-if="error"
                    type="error"
                    class="mb-4"
                >
                    {{ error }}
                </v-alert>

                <template v-if="isSignUp">
                    <v-text-field
                        v-model="name"
                        label="Name"
                        variant="outlined"
                        prepend-inner-icon="mdi-account"
                        class="mb-3"
                    />

                    <v-text-field
                        v-model="email"
                        label="Email"
                        variant="outlined"
                        prepend-inner-icon="mdi-email"
                        class="mb-3"
                    />

                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        prepend-inner-icon="mdi-lock"
                        class="mb-3"
                    />

                    <v-text-field
                        v-model="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        prepend-inner-icon="mdi-lock-check"
                        class="mb-3"
                    />

                    <v-btn
                        block
                        color="primary"
                        size="large"
                        :loading="loading"
                        @click="handleSignUp"
                    >
                        Create Account
                    </v-btn>
                </template>

                <template v-else>
                    <v-text-field
                        v-model="email"
                        label="Email"
                        variant="outlined"
                        prepend-inner-icon="mdi-email"
                        class="mb-3"
                    />

                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        prepend-inner-icon="mdi-lock"
                        class="mb-3"
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
                </template>

                <div class="text-center mt-6">
                    <span class="text-gray-500">
                        {{
                            isSignUp
                                ? 'Already have an account?'
                                : "Don't have an account?"
                        }}
                    </span>

                    <v-btn
                        variant="text"
                        color="primary"
                        @click="switchMode"
                    >
                        {{ isSignUp ? 'Login' : 'Sign Up' }}
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>