<script setup>
defineProps({
    task: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <v-card>
        <v-card-title>
            {{ task.title }}
        </v-card-title>

        <v-card-text>
            <p class="mb-4 text-gray-500">
                {{ task.description }}
            </p>

            <div class="flex flex-wrap gap-2">
                <v-chip>
                    {{ task.type }}
                </v-chip>

                <v-chip>
                    {{ task.status }}
                </v-chip>

                <v-chip>
                    {{ task.priority }}
                </v-chip>
            </div>
        </v-card-text>

        <v-card-actions>
            <v-btn
                variant="text"
                :to="`/tasks/${task.id}`"
            >
                View
            </v-btn>
        </v-card-actions>
    </v-card>
</template>