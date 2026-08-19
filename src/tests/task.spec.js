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
    it('adds task successfully', async ()=>{
        const taskData = {
            title: 'Learn Vitest',
            description: 'Write tests for task store',
            type: 'task',
            status: 'open',
            priority: 'high',
        }
        const mockCreatedTask = {
            id: '3',
            ...taskData,
        }
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockCreatedTask,
        })

        const taskStore = useTaskStore()
        await taskStore.addTask(taskData)

        expect(taskStore.tasks).toContainEqual(mockCreatedTask)
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:3000/tasks',
            expect.objectContaining({
                method: 'POST',
            })
        )
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:3000/tasks',
            expect.objectContaining({
                body: JSON.stringify(taskData),
            })
        )
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:3000/tasks',
            expect.objectContaining({
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        )
    })
    it('handles add task error' , async ()=>{
        const taskData = {
            title: 'Learn Vitest',
            description: 'Write tests for task store',
            type: 'task',
            status: 'open',
            priority: 'high',
        }
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
        })
        const taskStore = useTaskStore()
        await expect(
            taskStore.addTask(taskData)
        ).rejects.toThrow('Failed to add task')
        expect(taskStore.tasks).toEqual([])
    })
})