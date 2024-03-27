<template>
  <header>
    <div class="header">
      <text style="color: black">Vue task manager</text>
      <button @click="openModal" class="createTask">
        <span class="button-text">Create Task</span>
        <span class="icon">&#9998;</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { modalStore } from '@/stores/modalStore'
const modalData = modalStore()
const { openModal } = modalData // use the openModal function in modalStore
</script>

<style scoped>
.header {
  display: flex;
  background-color: lightgoldenrodyellow;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  padding: 1rem;
  border-radius: 10px;
}
.createTask {
  position: relative;
  padding: 0.5rem 1rem;
  background-color: #4285f4;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
}

.button-text {
  transition: opacity 0.3s ease;
}

.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Desktop styles */
.createTask:hover .button-text {
  opacity: 0;
}

.createTask:hover .icon {
  opacity: 1;
}

/* Mobile styles */
.createTask:active .button-text {
  opacity: 0;
}

.createTask:active .icon {
  opacity: 1;
}
.createTask:after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 4em;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.5s;
  box-shadow: 0 0 10px 40px white;
}

.createTask:active:after {
  box-shadow: 0 0 0 0 white;
  position: absolute;
  border-radius: 4em;
  left: 0;
  top: 0;
  opacity: 1;
  transition: 0s;
}

.createTask:active {
  top: 1px;
}
</style>
