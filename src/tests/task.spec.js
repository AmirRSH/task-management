import { describe , it , expect , beforeEach , vi } from "vitest";
import { createPinia, setActivePinia } from 'pinia'
import { useTaskStore } from '@/stores/task'


describe('Task Store', ()=>{
    beforeEach(() => {
        setActivePinia(createPinia())
    })
    it('fetches tasks successfully',async ()=>{
        const mockTasks = [
            {
                id: '1',
                title: 'Learn Vue',
                description: 'Practice Vue',
                status: 'open',
            },
            {
                id: '2',
                title: 'Read docs',
                description: 'Read Vue docs',
                status: 'done',
            },
        ]
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockTasks,
        })
        const taskStore = useTaskStore()

        await taskStore.fetchTasks()
        expect(taskStore.tasks).toEqual(mockTasks)
    })
    it('handles fetch tasks error' , async ()=>{
        global.fetch = vi.fn().mockResolvedValue({
            ok: false, 
        })

        const taskStore = useTaskStore()
        await taskStore.fetchTasks()
        expect(taskStore.error).toBe('Failed to fetch tasks')
        expect(taskStore.isLoading).toBe(false)
    })
})