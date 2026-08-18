import { describe , it , expect , beforeEach , vi } from "vitest";
import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '@/stores/user'


describe('User Store', ()=> {
    beforeEach (()=>{
        setActivePinia(createPinia());
    })
    it('fetches users successfully', async ()=>{
        const mockUser = [
            {
                id: '1',
                name: 'AmirRSH',
                email: 'amir@example.test',
            },
            {
                id: '2',
                name: 'John',
                email: 'john@example.test',
            },
        ]
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockUser,
        })
        const userStore = useUserStore();
        await userStore.fetchUsers()
        expect(userStore.users).toEqual(mockUser)
    })
    it('handles fetch users error', async () => {
        const mockUser = []
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
        })
        const userStore = useUserStore();
        await userStore.fetchUsers()
        expect(userStore.error).toBe('Failed to fetch users')
        expect(userStore.isLoading).toBe(false)
    })
    it('sets loading while fetching users', async () => {
        let resolveFetch
        
        const pendingFetch = new Promise((resolve) => {
            resolveFetch = resolve
        })
    
        global.fetch = vi.fn().mockReturnValue(pendingFetch)
    
        const userStore = useUserStore()
        const fetchPromise = userStore.fetchUsers()
        expect(userStore.isLoading).toBe(true)

        resolveFetch({
            ok: true,
            json: async () => []
        })

        await fetchPromise
        expect(userStore.isLoading).toBe(false)
    })
    it('adds user successfully', async ()=>{
        const userData = {
            name: 'AmirRSH',
            email: 'amir@example.test',
            password: '123456',
        }
        const mockCreatedUser = {
            id: '4',
            ...userData,
        }
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockCreatedUser,
        })

        const userStore = useUserStore()
        const createdUser = await userStore.addUser(userData)
        expect(userStore.users).toContainEqual(mockCreatedUser)
        expect(createdUser).toEqual(mockCreatedUser)
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:3000/users',
            expect.objectContaining({
                method: 'POST',
            })
        )
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:3000/users',
            expect.objectContaining({
                body: JSON.stringify(userData),
            })
        )
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:3000/users',
            expect.objectContaining({
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        )
    })

})
