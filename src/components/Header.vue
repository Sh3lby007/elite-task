<template>
  <header>
    <div class="header">
      <Search @search="$emit('search', $event)" />
      <text>Elite Task</text>
      <button @click="openModal" class="create-task">
        <span class="button-text">Create Task</span>
        <span class="icon">&#9998;</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import Search from './Search.vue'
import { useModalStore } from '@/stores/modalStore'
const modalData = useModalStore()
const { openModal } = modalData // use the openModal function in modalStore
</script>

<style scoped lang="scss">
.header {
  font-weight: 600;
  align-items: center;
  display: flex;
  background-color: lightgoldenrodyellow;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  padding: 1rem;
  border-radius: 10px;
}
.create-task {
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
.create-task:hover .button-text {
  opacity: 0;
}

.create-task:hover .icon {
  opacity: 1;
}

/* Mobile styles */
.create-task:active .button-text {
  opacity: 0;
}
</style>
