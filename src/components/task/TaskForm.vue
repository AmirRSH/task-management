<script setup>
import { ref, watch , onMounted  } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/task'
import { useUserStore } from '@/stores/user'

const props = defineProps({
    task: {
        type: Object,
        default: null,
    },
})

const emit = defineEmits(['updated', 'cancel'])

const assigneeId = ref(props.task?.assigneeId ?? null)
const router = useRouter()
const taskStore = useTaskStore()

const title = ref('')
const description = ref('')
const type = ref('task')
const status = ref('open')
const priority = ref('medium')
const userStore = useUserStore()

onMounted(() => {
    userStore.fetchUsers()
})
const resetForm = () => {
    title.value = ''
    description.value = ''
    type.value = 'task'
    status.value = 'open'
    priority.value = 'medium'
}

const fillForm = (task) => {
    title.value = task.title
    description.value = task.description
    type.value = task.type
    status.value = task.status
    priority.value = task.priority
}

watch(
    () => props.task,
    (task) => {
        if (task) {
            fillForm(task)
        } else {
            resetForm()
        }
    },
    { immediate: true }
)

const handleSubmit = () => {
    const taskData = {
        title: title.value,
        description: description.value,
        type: type.value,
        status: status.value,
        priority: priority.value,
        assigneeId: assigneeId.value,
    }

    if (props.task) {
        taskStore.updateTask(
            props.task.id,
            taskData
        )

        emit('updated')
        return
    }

    taskStore.addTask({
        ...taskData,
        createdAt: new Date().toISOString().split('T')[0],
    })

    router.push('/tasks')
}

const handleCancel = () => {
    if (props.task) {
        emit('cancel')
        return
    }

    router.back()
}
watch(type, (newType) => {
    if (newType === 'todo') {
        assigneeId.value = null
    }
})
</script>

<template>
    <v-card>
        <v-card-title>
            {{ props.task ? 'Edit Task' : 'Create Task' }}
        </v-card-title>

        <v-card-text>
            <div class="space-y-4">
                <v-text-field
                    v-model="title"
                    label="Title"
                    variant="outlined"
                />
                <v-select
                    v-if="type === 'task'"
                    v-model="assigneeId"
                    label="Assignee"
                    variant="outlined"
                    :items="userStore.users"
                    item-title="name"
                    item-value="id"
                    clearable
                />
                <v-textarea
                    v-model="description"
                    label="Description"
                    variant="outlined"
                    rows="4"
                />

                <v-select
                    v-model="type"
                    label="Type"
                    variant="outlined"
                    :items="[
                        {
                            title: 'Task',
                            value: 'task',
                        },
                        {
                            title: 'Todo',
                            value: 'todo',
                        },
                    ]"
                />

                <v-select
                    v-model="status"
                    label="Status"
                    variant="outlined"
                    :items="[
                        {
                            title: 'Open',
                            value: 'open',
                        },
                        {
                            title: 'In Progress',
                            value: 'in-progress',
                        },
                        {
                            title: 'Done',
                            value: 'done',
                        },
                    ]"
                />

                <v-select
                    v-model="priority"
                    label="Priority"
                    variant="outlined"
                    :items="[
                        {
                            title: 'Low',
                            value: 'low',
                        },
                        {
                            title: 'Medium',
                            value: 'medium',
                        },
                        {
                            title: 'High',
                            value: 'high',
                        },
                    ]"
                />
            </div>
        </v-card-text>

        <v-card-actions>
            <v-spacer />

            <v-btn
                variant="text"
                @click="handleCancel"
            >
                Cancel
            </v-btn>

            <v-btn
                color="primary"
                @click="handleSubmit"
            >
                {{ props.task ? 'Update' : 'Create' }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

