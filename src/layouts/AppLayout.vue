<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
</script>

<template>
    <v-app>
        <AppHeader />
        <AppSidebar />

        <v-main>
            <RouterView />
        </v-main>
    </v-app>
</template>