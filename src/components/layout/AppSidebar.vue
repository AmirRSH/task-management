<script setup>
const navigationItems = [
    {
        title: 'Dashboard',
        icon: 'mdi-view-dashboard-outline',
        to: '/',
    },
    {
        title: 'Tasks',
        icon: 'mdi-format-list-checks',
        to: '/tasks',
    },
]
</script>

<template>
    <v-navigation-drawer>
        <v-list>
            <v-list-item
                title="Task Management"
            />

            <v-divider />

            <v-list-item
                v-for="item in navigationItems"
                :key="item.to"
                :to="item.to"
                :prepend-icon="item.icon"
                :title="item.title"
            />
        </v-list>
    </v-navigation-drawer>
</template>