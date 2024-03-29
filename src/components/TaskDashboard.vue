<template>
  <div class="dashboard">
    <div class="dashboard-section">
      <h2>Upcoming Tasks</h2>
      <div class="task-cards">
        <TaskCards
          v-for="task in filteredUpcomingTasks"
          :key="task.title"
          :task="task"
        />
      </div>
    </div>

    <div class="dashboard-section">
      <h2>Overdue Tasks</h2>
      <div class="task-cards">
        <TaskCards
          v-for="task in filteredOverdueTasks"
          :key="task.title"
          :task="task"
        />
      </div>
    </div>

    <div class="dashboard-section">
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
  return taskStore.tasks.filter(
    (task) =>
      task.status === 'upcoming' &&
      task.title.toLowerCase().includes(props.searchQuery.toLowerCase()) &&
      (props.filteredPriority === '' ||
        task.priority === props.filteredPriority)
  )
})

const filteredOverdueTasks = computed(() => {
  return taskStore.tasks.filter(
    (task) =>
      task.status === 'overdue' &&
      task.title.toLowerCase().includes(props.searchQuery.toLowerCase()) &&
      (props.filteredPriority === '' ||
        task.priority === props.filteredPriority)
  )
})

const filteredCompletedTasks = computed(() => {
  return taskStore.tasks.filter(
    (task) =>
      task.status === 'completed' &&
      task.title.toLowerCase().includes(props.searchQuery.toLowerCase()) &&
      (props.filteredPriority === '' ||
        task.priority === props.filteredPriority)
  )
})
</script>

<style scoped>
.dashboard {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

@media (max-width: 900px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}

.dashboard-section {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
}

.task-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
}
</style>
