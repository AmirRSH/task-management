import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './user'

export const useAuthStore = defineStore('auth', () => {
    const storedUser = localStorage.getItem('user')

    const user = ref(
        storedUser ? JSON.parse(storedUser) : null
    )

    const login = async (email, password) => {
        const userStore = useUserStore()

        if (!userStore.users.length) {
            await userStore.fetchUsers()
        }

        const foundUser = userStore.users.find(
            item =>
                item.email === email &&
                item.password === password
        )

        if (!foundUser) {
            throw new Error('Invalid email or password')
        }

        const { password: _, ...userWithoutPassword } = foundUser

        user.value = userWithoutPassword

        localStorage.setItem(
            'user',
            JSON.stringify(user.value)
        )

        return user.value
    }

    const logout = () => {
        user.value = null

        localStorage.removeItem('user')
    }

    return {
        user,
        login,
        logout,
    }
})