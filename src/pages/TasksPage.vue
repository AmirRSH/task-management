<script setup>
import { useTaskStore } from '@/stores/task'
import TaskCard from '@/components/task/TaskCard.vue'

const taskStore = useTaskStore()
</script>

<template>
  <div>
    <h1>Tasks Page</h1>

    <TaskCard
      v-for="task in taskStore.tasks"
      :key="task.id"
      :task="task"
    />
  </div>
</template>