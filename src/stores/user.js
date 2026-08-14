import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_URL = 'http://localhost:3000/users'

export const useUserStore = defineStore('user', () => {
    const users = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    const fetchUsers = async () => {
        isLoading.value = true
        error.value = null

        try {
            const response = await fetch(API_URL)

            if (!response.ok) {
                throw new Error('Failed to fetch users')
            }

            users.value = await response.json()
        } catch (err) {
            error.value = err.message
        } finally {
            isLoading.value = false
        }
    }

    const addUser = async (userData) => {
        error.value = null

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            throw new Error('Failed to create user')
        }

        const newUser = await response.json()

        users.value.push(newUser)

        return newUser
    }

    return {
        users,
        isLoading,
        error,
        fetchUsers,
        addUser,
    }
})