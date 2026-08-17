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
    

})
