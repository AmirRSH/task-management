<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

const drawer = ref(true)
</script>

<template>
    <v-app>
        <AppHeader
            @toggle-drawer="drawer = !drawer"
        />

        <AppSidebar
            v-model="drawer"
        />

        <v-main>
            <div class="min-h-[calc(100vh-64px)] p-4 lg:p-6">
                <RouterView />
            </div>
        </v-main>
    </v-app>
</template>