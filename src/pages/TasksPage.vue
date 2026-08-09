<script setup>
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/task'
import TaskCard from '@/components/task/TaskCard.vue'

const router = useRouter()
const taskStore = useTaskStore()
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold">
                    Tasks
                </h1>

                <p class="text-gray-500">
                    Manage your tasks
                </p>
            </div>

            <v-btn
                color="primary"
                prepend-icon="mdi-plus"
                @click="router.push('/tasks/create')"
            >
                Create Task
            </v-btn>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <TaskCard
                v-for="task in taskStore.tasks"
                :key="task.id"
                :task="task"
            />
        </div>
    </div>
</template>