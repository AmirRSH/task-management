<script setup>
defineProps({
    modelValue: {
        type: Boolean,
        default: true,
    },
})

defineEmits(['update:modelValue'])

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
    <v-navigation-drawer
        :model-value="modelValue"
        :temporary="$vuetify.display.mdAndDown"
        :permanent="$vuetify.display.lgAndUp"
        @update:model-value="$emit('update:modelValue', $event)"
    >
        <v-list>
            <v-list-item
                title="Task Management"
                prepend-icon="mdi-check-circle-outline"
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