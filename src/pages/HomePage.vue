<script setup>
import { useTaskStore } from '@/stores/task'

const taskStore = useTaskStore()
</script>

<template>
  <h1 class="text-4xl font-bold text-red-500">Home Page</h1>

  <p>
    Tasks count: {{ taskStore.tasks.length }}
  </p>
</template>