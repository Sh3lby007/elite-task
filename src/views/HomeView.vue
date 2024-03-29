<template>
  <Header @search="updateSearchQuery" />
  <div class="filters">
    <select v-model="filterPriority" @change="applyFilters">
      <option value="">All Priorities</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <select v-model="filterStatus" @change="applyFilters">
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
  <Modal v-if="showModal" />
  <div :class="{ overlay: showModal }"></div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'

import Header from '@/components/Header.vue'
import TaskDashboard from '@/components/TaskDashboard.vue'
import Modal from '@/components/Modal.vue'
import { useModalStore } from '@/stores/modalStore'
import { type Task, TaskStatus } from '@/stores/taskStore'

const modalData = useModalStore()
const { showModal } = storeToRefs(modalData)

const searchQuery = ref('')
const filterPriority = ref('')
const filterStatus = ref('')
const tasks = ref<Task[]>([])

const updateSearchQuery = (query: string) => {
  searchQuery.value = query
}

const applyFilters = () => {
  // Trigger the computed property to update based on the selected filters
  filteredTasks.value
}
const filteredTasks = computed(() => {
  let filtered = tasks.value

  // Apply search filter
  if (searchQuery.value.trim() !== '') {
    const lowerCaseSearchQuery = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerCaseSearchQuery) ||
        task.description.toLowerCase().includes(lowerCaseSearchQuery)
    )
  }

  // Apply priority filter
  if (filterPriority.value !== '') {
    filtered = filtered.filter((task) => task.priority === filterPriority.value)
  }

  // Apply status filter
  if (filterStatus.value !== '') {
    const status = filterStatus.value as TaskStatus
    filtered = filtered.filter((task) => task.status === status)
  }

  return filtered
})
</script>

<style scoped>
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
</style>
