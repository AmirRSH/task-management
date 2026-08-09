<script setup>
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const props = defineProps({
    task: {
        type: Object,
        required: true,
    },
})

const userStore = useUserStore()

onMounted(() => {
    userStore.fetchUsers()
})

const assignee = computed(() => {
    if (!props.task.assigneeId) {
        return null
    }

    return userStore.users.find(
        user => String(user.id) === String(props.task.assigneeId)
    )
})
</script>

<template>
    <v-card>
        <v-card-text>
            <div class="space-y-6">
                <div>
                    <div class="text-sm text-gray-500">
                        Description
                    </div>

                    <div class="mt-1">
                        {{ task.description }}
                    </div>
                </div>

                <div class="flex flex-wrap gap-2">
                    <v-chip>
                        Type: {{ task.type }}
                    </v-chip>

                    <v-chip>
                        Status: {{ task.status }}
                    </v-chip>

                    <v-chip>
                        Priority: {{ task.priority }}
                    </v-chip>

                    <v-chip v-if="task.type === 'task' && assignee">
                        Assigned to: {{ assignee.name }}
                    </v-chip>
                </div>

                <div>
                    <div class="text-sm text-gray-500">
                        Created At
                    </div>

                    <div class="mt-1">
                        {{ task.createdAt }}
                    </div>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>