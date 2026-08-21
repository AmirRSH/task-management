import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'

import LoginPage from '@/pages/LoginPage.vue'

describe('LoginPage', () => {
    let router
    let pinia

    beforeEach(() => {
        pinia = createPinia()
        setActivePinia(pinia)

        router = createRouter({
            history: createMemoryHistory(),
            routes: [
                {
                    path: '/',
                    component: { template: '<div />' },
                },
            ],
        })
    })

    it('renders login form', () => {
        const wrapper = mount(LoginPage, {
            global: {
                plugins: [
                    router,
                    pinia,
                ],

                stubs: {
                    VContainer: {
                        template: '<div><slot /></div>',
                    },

                    VCard: {
                        template: '<div><slot /></div>',
                    },

                    VCardTitle: {
                        template: '<div><slot /></div>',
                    },

                    VCardSubtitle: {
                        template: '<div><slot /></div>',
                    },

                    VCardText: {
                        template: '<div><slot /></div>',
                    },

                    VAlert: {
                        template: '<div><slot /></div>',
                    },

                    VTextField: {
                        template: '<input />',
                    },

                    VBtn: {
                        template: '<button><slot /></button>',
                    },
                },
            },
        })

        expect(wrapper.text()).toContain('Login to your account')
    })

})