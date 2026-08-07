import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import HomePage from '@/pages/HomePage.vue'
import TasksPage from '@/pages/TasksPage.vue'
import TaskDetailsPage from '@/pages/TaskDetailsPage.vue'
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
            }
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router