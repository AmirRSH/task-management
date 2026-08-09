import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import HomePage from '@/pages/HomePage.vue'
import TasksPage from '@/pages/TasksPage.vue'
import TaskDetailsPage from '@/pages/TaskDetailsPage.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import LoginPage from '@/pages/LoginPage.vue'
import { useAuthStore } from '@/stores/auth'
import TaskForm from '@/components/task/TaskForm.vue'

const routes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                  path: '',
                  name: 'home',
                  component: HomePage,
            },
            {
                  path: 'tasks',
                  name: 'tasks',
                  component: TasksPage,
            },
            {
                path: 'tasks/:id',
                name: 'task-details',
                component: TaskDetailsPage,
            },
            {
                path: 'tasks/create',
                name: 'task-create',
                component: TaskForm,
            },
        ],
    },
    {
        path: '/login',
        component: AuthLayout,
        children: [
            {
                path: '',
                name: 'login',
                component: LoginPage,
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to) => {
  const authStore = useAuthStore()

  const isAuthenticated = !!authStore.user

  if (to.path !== '/login' && !isAuthenticated) {
    return '/login'
  }

  if (to.path === '/login' && isAuthenticated) {
    return '/'
  }
})

export default router