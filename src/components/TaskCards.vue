<template>
  <div class="task-card">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>
    <p>Due Date: {{ task.endDate }}</p>
    <p>Priority: {{ task.priority }}</p>
    <p>Status: {{ task.status }}</p>
  </div>
</template>

<script setup lang="ts">
import { type Task } from '@/stores/taskStore'
defineProps<{
  task: Task
}>()
</script>

<style scoped>
.task-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}
</style>
