import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_URL = 'http://localhost:3000/tasks'

export const useTaskStore = defineStore('task', () => {
    const tasks = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    const fetchTasks = async () => {
        isLoading.value = true
        error.value = null

        try {
            const response = await fetch(API_URL)

            if (!response.ok) {
                throw new Error('Failed to fetch tasks')
            }

            tasks.value = await response.json()
        } catch (err) {
            error.value = err.message
        } finally {
            isLoading.value = false
        }
    }

    const addTask = async (task) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })

        if (!response.ok) {
            throw new Error('Failed to add task')
        }

        const newTask = await response.json()

        tasks.value.push(newTask)
    }

    const updateTask = async (id, taskData) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        })

        if (!response.ok) {
            throw new Error('Failed to update task')
        }

        const updatedTask = await response.json()

        const index = tasks.value.findIndex(
            task => task.id === id
        )

        if (index !== -1) {
            tasks.value[index] = updatedTask
        }
    }

    const removeTask = async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            throw new Error('Failed to delete task')
        }

        tasks.value = tasks.value.filter(
            task => task.id !== id
        )
    }

    return {
        tasks,
        isLoading,
        error,
        fetchTasks,
        addTask,
        updateTask,
        removeTask,
    }
})