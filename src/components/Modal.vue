<template>
  <section class="modal">
    <div class="flex">
      <h3>{{ isEditMode ? 'Edit Task' : 'Add New Task' }}</h3>
      <button @click="closeModal" class="btn-close">⨉</button>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="title-area">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="taskData.title" required />
      </div>
      <div class="desc-area">
        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="taskData.description"
          required
        ></textarea>
      </div>
      <div class="due-date">
        <label for="endDate">Due Date:</label>
        <input type="date" id="endDate" v-model="taskData.endDate" required />
      </div>
      <div class="priority">
        <label for="priority">Priority:</label>
        <select id="priority" v-model="taskData.priority" required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div v-if="isEditMode" class="status">
        <label for="status">Status:</label>
        <select id="status" v-model="taskData.status">
          <option :value="TaskStatus.Upcoming">Upcoming</option>
          <option :value="TaskStatus.Overdue">Overdue</option>
          <option :value="TaskStatus.Completed">Completed</option>
        </select>
      </div>
      <div class="actions">
        <button type="submit" class="btn">
          {{ isEditMode ? 'Update' : 'Add' }}
        </button>
        <button
          v-if="isEditMode"
          type="button"
          class="btn btn-danger"
          @click="deleteTask"
        >
          Delete
        </button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'
import {
  useTaskStore,
  type Task,
  PriorityLevel,
  TaskStatus
} from '@/stores/taskStore'
import { reactive } from 'vue'

const modalStore = useModalStore()
const taskStore = useTaskStore()
const { closeModal } = modalStore
const isEditMode = modalStore.isEditMode
// const taskData = computed(() => modalStore.taskData)
const emit = defineEmits(['taskUpdated'])
let taskData = reactive({
  title: '',
  description: '',
  endDate: '',
  priority: PriorityLevel.Low, // Set the default priority to Low
  status: TaskStatus.Upcoming
})

if (isEditMode) {
  taskData = modalStore.taskData
}

const handleSubmit = () => {
  if (isEditMode) {
    const updatedTask: Task = {
      title: taskData.title,
      description: taskData.description,
      endDate: taskData.endDate,
      priority: taskData.priority,
      status: taskData.status
    }
    taskStore.updateTask(updatedTask)
    emit('taskUpdated', updatedTask)
  } else {
    taskStore.addTask(taskData)
  }
  closeModal()
}

const deleteTask = () => {
  if (isEditMode && taskData.title) {
    taskStore.deleteTask(taskData.title)
  }
  closeModal()
}
</script>

<style scoped>
/* Default styles for larger screens */
@media (min-width: 600px) {
  .modal {
    width: 500px; /* Set a fixed width for larger screens */
  }
  .btn {
    width: 500px;
  }
}

/* Styles for smaller screens */
@media (max-width: 550px) {
  .modal {
    width: 80vw; /* Set the width to 90% of the viewport width */
  }
  .btn {
    width: 80vw;
  }
}
.modal {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 90vh;
  max-width: 90vw;
  padding: 1.3rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 3px solid #ddd;
  border-radius: 15px;
  z-index: 10;
  overflow: auto;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal p {
  font-size: 0.9rem;
  color: #777;
  margin: 0.4rem 0 0.2rem;
}

.actions {
  display: flex;
  justify-content: center;
}
.btn {
  padding: 0.6rem 1rem;
  border-radius: 6px;
  background-color: green;
  color: white;
  text-align: center;
  cursor: pointer;
}

.btn-danger {
  background-color: #d32f2f;
}
.btn-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}
.title-area {
  display: contents;
}
.desc-area {
  display: contents;
}
.due-date {
  display: contents;
}
.priority {
  display: contents;
}
.status {
  display: contents;
}

select {
  height: 50px;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
}
input {
  height: 20px;
  padding: 0.7rem 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 16px;
}
button {
  cursor: pointer;
  border: none;
  font-weight: 600;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: bold;
}
textarea {
  border-radius: 0.5rem;
  border: 1px solid #ddd;
  height: 100px;
  font-size: 18px;
}
</style>
