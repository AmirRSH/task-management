<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/task'
import TaskDetails from '@/components/task/TaskDetails.vue'
import TaskForm from '@/components/task/TaskForm.vue'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const isEditing = ref(false)

const task = computed(() => {
    return taskStore.tasks.find(
        task => task.id === Number(route.params.id)
    )
})

const handleDelete = () => {
    if (!task.value) {
        return
    }

    taskStore.removeTask(task.value.id)

    router.push('/tasks')
}

const handleUpdate = () => {
    isEditing.value = false
}
</script>

<template>
    <div v-if="task" class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold">
                    {{ isEditing ? 'Edit Task' : task.title }}
                </h1>

                <p class="text-gray-500">
                    {{ isEditing ? 'Update task information' : 'Task Details' }}
                </p>
            </div>

            <div class="flex gap-2">
                <v-btn
                    variant="text"
                    prepend-icon="mdi-arrow-left"
                    @click="router.back()"
                >
                    Back
                </v-btn>

                <v-btn
                    v-if="!isEditing"
                    color="primary"
                    variant="outlined"
                    prepend-icon="mdi-pencil-outline"
                    @click="isEditing = true"
                >
                    Edit
                </v-btn>

                <v-btn
                    v-if="!isEditing"
                    color="error"
                    variant="outlined"
                    prepend-icon="mdi-delete-outline"
                    @click="handleDelete"
                >
                    Delete
                </v-btn>
            </div>
        </div>

        <TaskForm
            v-if="isEditing"
            :task="task"
            @updated="handleUpdate"
            @cancel="isEditing = false"
        />

        <TaskDetails
            v-else
            :task="task"
        />
    </div>

    <div v-else>
        <v-alert
            type="error"
            title="Task not found"
            text="The requested task does not exist."
        />
    </div>
</template>