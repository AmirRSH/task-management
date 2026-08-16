import { describe , it , expect , beforeEach , vi } from "vitest";
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

describe('Auth Store', () => { 
    let pinia;
    beforeEach(()=>{
        localStorage.clear();
        pinia = createPinia();
        setActivePinia(pinia);
    });
    it('logs out the user',()=>{
        const authStore = useAuthStore();
        authStore.user =  { 
            "id": "1",
            "name": "AmirRSH",
            "email": "amir@example.test" 
        }
        authStore.logout()
        expect(authStore.user).toBeNull()
        expect(localStorage.getItem('user')).toBeNull()         
    })
    it('logs in the user successfully', async ()=>{
        const mockUser = {
            id: '1',
            name: 'AmirRSH',
            email: 'amir@example.test',
            password: '123456',
        }
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => [mockUser],
        })
        const authStore = useAuthStore()
        await authStore.login(
            'amir@example.test',
            '123456'
        )
        expect(authStore.user).toEqual({
            id: '1',
            name: 'AmirRSH',
            email: 'amir@example.test',
        })
        expect(localStorage.getItem('user')).toBe(
            JSON.stringify({
                id: '1',
                name: 'AmirRSH',
                email: 'amir@example.test',
            })
        )    
        expect(global.fetch).toHaveBeenCalledTimes(1)
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:3000/users'
        )
    })
    

 })