<script setup>
defineProps({
  task: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article>
    <h2>{{ task.title }}</h2>

    <p>
      {{ task.description }}
    </p>

    <div>
      <span>{{ task.type }}</span>
      <span>{{ task.status }}</span>
    </div>
  </article>
</template>