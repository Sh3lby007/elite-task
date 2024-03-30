<template>
  <div class="dashboard">
    <div
      v-if="!filteredStatus || filteredStatus === TaskStatus.Upcoming"
      class="dashboard-section"
    >
      <h2>Upcoming Tasks</h2>
      <div class="task-cards">
        <TaskCards
          v-for="task in filteredUpcomingTasks"
          :key="task.title"
          :task="task"
        />
      </div>
    </div>

    <div
      v-if="!filteredStatus || filteredStatus === TaskStatus.Overdue"
      class="dashboard-section"
    >
      <h2>Overdue Tasks</h2>
      <div class="task-cards">
        <TaskCards
          v-for="task in filteredOverdueTasks"
          :key="task.title"
          :task="task"
        />
      </div>
    </div>

    <div
      v-if="!filteredStatus || filteredStatus === TaskStatus.Completed"
      class="dashboard-section"
    >
      <h2>Completed Tasks</h2>
      <div class="task-cards">
        <TaskCards
          v-for="task in filteredCompletedTasks"
          :key="task.title"
          :task="task"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore, TaskStatus } from '@/stores/taskStore'
import TaskCards from '@/components/TaskCards.vue'

import { computed } from 'vue'

const taskStore = useTaskStore()
const tasks = taskStore.tasks

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
  filteredPriority: {
    type: String,
    default: ''
  },
  filteredStatus: {
    type: String,
    default: ''
  }
})
const filteredUpcomingTasks = computed(() => {
  let filtered = tasks.filter((task) => task.status === TaskStatus.Upcoming)

  if (props.searchQuery.trim() !== '') {
    filtered = filtered.filter(
      (task) =>
        task.title.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(props.searchQuery.toLowerCase())
    )
  }
  if (props.filteredPriority !== '') {
    filtered = filtered.filter(
      (task) => task.priority === props.filteredPriority
    )
  }
  return filtered
})

const filteredOverdueTasks = computed(() => {
  let filtered = tasks.filter((task) => task.status === TaskStatus.Overdue)

  if (props.searchQuery.trim() !== '') {
    filtered = filtered.filter(
      (task) =>
        task.title.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(props.searchQuery.toLowerCase())
    )
  }
  if (props.filteredPriority !== '') {
    filtered = filtered.filter(
      (task) => task.priority === props.filteredPriority
    )
  }
  return filtered
})

const filteredCompletedTasks = computed(() => {
  let filtered = tasks.filter((task) => task.status === TaskStatus.Completed)

  if (props.searchQuery.trim() !== '') {
    filtered = filtered.filter(
      (task) =>
        task.title.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(props.searchQuery.toLowerCase())
    )
  }
  if (props.filteredPriority !== '') {
    filtered = filtered.filter(
      (task) => task.priority === props.filteredPriority
    )
  }
  return filtered
})
</script>

<style scoped>
.dashboard {
  margin-top: 20px;
  display: grid;
  gap: 1rem;
}

@media (max-width: 900px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}

.dashboard-section {
  background-color: #f5f5f5;
  border-radius: 1em;
  padding: 1rem;
}

.task-cards {
  display: grid;
  gap: 0.5rem;
}
</style>
