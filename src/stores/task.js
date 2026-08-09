import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('task', () => {
    const tasks = ref([
        {
            id: 1,
            title: 'Learn Vue Router',
            description: 'Practice nested and dynamic routes',
            type: 'task',
            status: 'open',
            priority: 'high',
            createdAt: '2026-08-07',
        },
        {
            id: 2,
            title: 'Read documentation',
            description: 'Review Vue documentation',
            type: 'todo',
            status: 'in-progress',
            priority: 'medium',
            createdAt: '2026-08-07',
        },
    ])

    const addTask = (task) => {
        tasks.value.push({
            id: Date.now(),
            ...task,
        })
    }

    const removeTask = (id) => {
        const index = tasks.value.findIndex(
            task => task.id === id
        )

        if (index !== -1) {
            tasks.value.splice(index, 1)
        }
    }

    const updateTask = (id, updates) => {
        const task = tasks.value.find(
            task => task.id === id
        )

        if (task) {
            Object.assign(task, updates)
        }
    }

    return {
        tasks,
        addTask,
        removeTask,
        updateTask,
    }
})