import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const users = ref([
        {
            id: 1,
            name: 'Amir Hossein',
            email: 'amir@example.com',
        },
        {
            id: 2,
            name: 'John Doe',
            email: 'john@example.com',
        },
        {
            id: 3,
            name: 'Jane Smith',
            email: 'jane@example.com',
        },
    ])

    return {
        users,
    }
})