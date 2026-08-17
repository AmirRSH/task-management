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


})
