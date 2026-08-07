import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {

  const storedUser = localStorage.getItem('user')

  const user = ref(
    storedUser ? JSON.parse(storedUser) : null
  )


  const login = () => {
    user.value = {
      id: 1,
      name: 'Amir',
      email: 'demo@test.com',
    }

    localStorage.setItem(
      'user',
      JSON.stringify(user.value)
    )
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