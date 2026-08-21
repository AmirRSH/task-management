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
    it('shows error when login fields are empty', async () => {
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
                        template: '<button @click="$emit(\'click\')"><slot /></button>',
                    },
                },
            },
        })
    
        const buttons = wrapper.findAll('button')
    
        await buttons[0].trigger('click')
    
        expect(wrapper.text()).toContain(
            'Email and password are required'
        )
    })
    it('switches to signup mode', async () => {
        const wrapper = mount(LoginPage, {
            global: {
                plugins: [router, pinia],

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
                        emits: ['click'],
                        template: `
                            <button @click="$emit('click')">
                                <slot />
                            </button>
                        `,
                    },
                },
            },
        })

        const signupButton = wrapper
            .findAll('button')
            .find(button => button.text() === 'Sign Up')

        await signupButton.trigger('click')

        expect(wrapper.text()).toContain('Create your account')

        const inputs = wrapper.findAll('input')

        expect(inputs).toHaveLength(4)
    })
    it('shows error when signup fields are empty', async () => {
    const wrapper = mount(LoginPage, {
        global: {
            plugins: [router, pinia],

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
                    emits: ['click'],
                    template: `
                        <button @click="$emit('click')">
                            <slot />
                        </button>
                    `,
                },
            },
        },
    })

    const signupButton = wrapper
        .findAll('button')
        .find(button => button.text() === 'Sign Up')

    await signupButton.trigger('click')

    const createAccountButton = wrapper
        .findAll('button')
        .find(button => button.text() === 'Create Account')

    await createAccountButton.trigger('click')

    expect(wrapper.text()).toContain('All fields are required')
})
    
})