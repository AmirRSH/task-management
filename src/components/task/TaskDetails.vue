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
        <v-card-text>
            <div class="space-y-4">
                <div>
                    <div class="text-sm text-gray-500">
                        Description
                    </div>

                    <div class="mt-1">
                        {{ task.description }}
                    </div>
                </div>

                <div class="flex flex-wrap gap-2">
                    <v-chip>
                        Type: {{ task.type }}
                    </v-chip>

                    <v-chip>
                        Status: {{ task.status }}
                    </v-chip>

                    <v-chip>
                        Priority: {{ task.priority }}
                    </v-chip>
                </div>

                <div>
                    <div class="text-sm text-gray-500">
                        Created At
                    </div>

                    <div class="mt-1">
                        {{ task.createdAt }}
                    </div>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>