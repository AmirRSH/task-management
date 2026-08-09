<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['toggle-drawer'])

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
    authStore.logout()
    router.push('/login')
}
</script>

<template>
    <v-app-bar elevation="1">
        <v-app-bar-nav-icon
            @click="emit('toggle-drawer')"
        />

        <v-app-bar-title>
            Task Management
        </v-app-bar-title>

        <v-spacer />

        <v-menu>
            <template #activator="{ props }">
                <v-btn
                    v-bind="props"
                    variant="text"
                >
                    <v-avatar
                        size="32"
                        class="mr-2"
                    >
                        <v-icon>
                            mdi-account
                        </v-icon>
                    </v-avatar>

                    {{ authStore.user?.name }}
                </v-btn>
            </template>

            <v-list>
                <v-list-item
                    prepend-icon="mdi-account-outline"
                    title="Profile"
                />

                <v-list-item
                    prepend-icon="mdi-logout"
                    title="Logout"
                    @click="handleLogout"
                />
            </v-list>
        </v-menu>
    </v-app-bar>
</template>