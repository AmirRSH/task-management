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
    

 })