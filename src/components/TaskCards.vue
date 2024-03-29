<template>
  <div class="task-card">
    <div class="card-header">
      <h3>{{ task.title }}</h3>
      <div class="options-menu">
        <span class="three-dot-icon" @click="showOptionsMenu = !showOptionsMenu"
          >&#8230;</span
        >
        <div v-show="showOptionsMenu" class="options-dropdown">
          <button @click="openEditModal(task)">Edit</button>
          <button @click="deleteTask(task)">Delete</button>
          <div class="status-options">
            <span @click="markAsCompleted(task)">Mark as Completed</span>
            <span @click="markAsOverdue(task)">Mark as Overdue</span>
            <span @click="markAsToDo(task)">Mark as To Do</span>
          </div>
        </div>
      </div>
    </div>
    <p>{{ task.description }}</p>
    <p>Due Date: {{ task.endDate }}</p>
  </div>
</template>

<script setup lang="ts">
import { type Task, TaskStatus, useTaskStore } from '@/stores/taskStore'
import { useModalStore } from '@/stores/modalStore'
import { ref } from 'vue'

const taskStore = useTaskStore()
const modalStore = useModalStore()

const props = defineProps<{
  task: Task
}>()

const showOptionsMenu = ref(false)

const openEditModal = (task: Task) => {
  modalStore.openModal(task, true) //pass task data and turn edit mode on in modal
  showOptionsMenu.value = false
}

const deleteTask = (task: Task) => {
  taskStore.deleteTask(task.title)
  showOptionsMenu.value = false
}

const markAsCompleted = (task: Task) => {
  const updatedTask = { ...task, status: TaskStatus.Completed }
  taskStore.updateTask(updatedTask)
  showOptionsMenu.value = false
}

const markAsOverdue = (task: Task) => {
  const updatedTask = { ...task, status: TaskStatus.Overdue }
  taskStore.updateTask(updatedTask)
  showOptionsMenu.value = false
}

const markAsToDo = (task: Task) => {
  const updatedTask = { ...task, status: TaskStatus.Upcoming }
  taskStore.updateTask(updatedTask)
  showOptionsMenu.value = false
}
</script>

<style scoped>
.task-card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.options-menu {
  position: relative;
}

.three-dot-icon {
  cursor: pointer;
}

.options-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.options-dropdown button,
.options-dropdown span {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.status-options {
  border-top: 1px solid #ccc;
}
</style>
