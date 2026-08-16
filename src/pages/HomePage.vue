<script setup>
import { computed } from 'vue'
import { useTaskStore } from '@/stores/task'

const taskStore = useTaskStore()

const totalTasks = computed(() => taskStore.tasks.length)

const openTasks = computed(() => {
    return taskStore.tasks.filter(
        task => task.status === 'open'
    ).length
})

const inProgressTasks = computed(() => {
    return taskStore.tasks.filter(
        task => task.status === 'in-progress'
    ).length
})

const doneTasks = computed(() => {
    return taskStore.tasks.filter(
        task => task.status === 'done'
    ).length
})
</script>

<template>
    <div class="space-y-6">
        <div>
            <h1 class="text-2xl font-bold">
                Dashboard
            </h1>

            <p class="text-gray-500">
                Overview of your tasks
            </p>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <v-card>
                <v-card-text>
                    <div class="text-sm text-gray-500">
                        Total Tasks
                    </div>

                    <div class="mt-2 text-3xl font-bold">
                        {{ totalTasks }}
                    </div>
                </v-card-text>
            </v-card>

            <v-card>
                <v-card-text>
                    <div class="text-sm text-gray-500">
                        Open
                    </div>

                    <div class="mt-2 text-3xl font-bold">
                        {{ openTasks }}
                    </div>
                </v-card-text>
            </v-card>

            <v-card>
                <v-card-text>
                    <div class="text-sm text-gray-500">
                        In Progress
                    </div>

                    <div class="mt-2 text-3xl font-bold">
                        {{ inProgressTasks }}
                    </div>
                </v-card-text>
            </v-card>

            <v-card>
                <v-card-text>
                    <div class="text-sm text-gray-500">
                        Done
                    </div>

                    <div class="mt-2 text-3xl font-bold">
                        {{ doneTasks }}
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>