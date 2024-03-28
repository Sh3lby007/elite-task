<template>
  <section class="modal">
    <div class="flex">
      <h3>{{ isEditMode ? 'Edit Task' : 'Add New Task' }}</h3>
      <button @click="closeModal" class="btn-close">⨉</button>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="title-area">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="task.title" required />
      </div>
      <div class="desc-area">
        <label for="description">Description:</label>
        <textarea id="description" v-model="task.description"></textarea>
      </div>
      <div class="due-date">
        <label for="dueDate">Due Date:</label>
        <input type="date" id="dueDate" v-model="task.endDate" />
      </div>
      <div class="priority">
        <label for="priority">Priority:</label>
        <select id="priority" v-model="task.priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
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
import { modalStore } from '@/stores/modalStore'
import { reactive, ref } from 'vue'

const modalData = modalStore()
const { closeModal } = modalData
const isEditMode = ref(false)
const task = reactive({
  title: '',
  description: '',
  endDate: '',
  priority: 'Low'
})

const handleSubmit = () => {
  // Handle form submission logic
  if (isEditMode.value) {
    // Update task logic
  } else {
    // Add new task logic
  }
  closeModal()
}

const deleteTask = () => {
  // Delete task logic
  closeModal()
}
</script>

<style scoped>
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
/* Default styles for larger screens */
@media (min-width: 600px) {
  .modal {
    width: 500px; /* Set a fixed width for larger screens */
  }
}

/* Styles for smaller screens */
@media (max-width: 550px) {
  .modal {
    width: 80vw; /* Set the width to 90% of the viewport width */
  }
}
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

input {
  padding: 0.7rem 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9em;
}

.modal p {
  font-size: 0.9rem;
  color: #777;
  margin: 0.4rem 0 0.2rem;
}

button {
  cursor: pointer;
  border: none;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
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

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: bold;
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
</style>
