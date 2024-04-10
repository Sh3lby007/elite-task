<template>
  <Header @search="updateSearchQuery" />
  <div class="filters">
    <select class="select-filter" v-model="filterPriority">
      <option value="">All Priorities</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <select class="select-filter" v-model="filterStatus">
      <option value="">All Statuses</option>
      <option value="upcoming">Upcoming</option>
      <option value="overdue">Overdue</option>
      <option value="completed">Completed</option>
    </select>
  </div>
  <TaskDashboard
    :search-query="searchQuery"
    :filtered-priority="filterPriority"
    :filtered-status="filterStatus"
  />
  <Modal v-if="showModal" @taskUpdated="handleTaskUpdated" />
  <div :class="{ overlay: showModal }"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import Header from '@/components/Header.vue'
import TaskDashboard from '@/components/TaskDashboard.vue'
import Modal from '@/components/Modal.vue'
import { useModalStore } from '@/stores/modalStore'
import { useTaskStore, type Task, TaskStatus } from '@/stores/taskStore'

const modalStore = useModalStore()
const taskStore = useTaskStore()
const { showModal } = storeToRefs(modalStore)

const searchQuery = ref('')
const filterPriority = ref('')
const filterStatus = ref('')

const updateSearchQuery = (query: string) => {
  searchQuery.value = query.trim()
}

// Handle emit event from modal when tasks are updated
const handleTaskUpdated = (updatedTask: Task) => {
  const currentDate = new Date()
  const dueDate = new Date(updatedTask.endDate)

  if (updatedTask.status !== TaskStatus.Completed) {
    if (dueDate >= currentDate) {
      updatedTask.status = TaskStatus.Upcoming
    } else {
      updatedTask.status = TaskStatus.Overdue
    }
  }
  // Update the task in the taskStore with the updated status
  taskStore.updateTask(updatedTask)
}
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
}
.filters {
  margin: 1em;
  display: flex;
  justify-content: center;
}
.select-filter {
  margin: 0.5em;
  width: 40vw;
  height: 2rem;
  border-radius: 0.5em;
}
</style>
