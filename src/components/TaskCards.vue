<template>
  <div class="task-card">
    <div class="card-header">
      <h3>{{ task.title }}</h3>
      <div class="options-menu">
        <i
          @click="showOptionsMenu = !showOptionsMenu"
          class="fa-solid fa-ellipsis-vertical"
        ></i>
        <div v-show="showOptionsMenu" class="options-dropdown">
          <div class="option" @click="openEditModal(task)">
            <i class="fa-regular fa-edit"></i>
            <span>Edit</span>
          </div>
          <div style="color: red" class="option" @click="deleteTask(task)">
            <i class="fa-regular fa-trash-can"></i>
            <span>Delete</span>
          </div>
          <div
            v-if="task.status !== TaskStatus.Completed"
            style="color: green"
            class="option"
            @click="markAsCompleted(task)"
          >
            <i class="fa-regular fa-circle-check"></i>
            <span>Completed</span>
          </div>
        </div>
      </div>
    </div>
    <p>{{ task.description }}</p>
    <p>Due: {{ task.endDate }}</p>
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
</script>

<style scoped lang="scss">
.task-card {
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border-radius: 1em;
  &:hover {
    transform: translateY(-5px);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.options-menu {
  position: relative;
}

.options-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 120px;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.options-dropdown span {
  padding: 0.5rem;
  cursor: pointer;
}
.option {
  display: flex;
  align-items: center;
  margin-left: 10px;
  border-radius: 1em;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    background-color: #f5f5f5;
  }
}
</style>
