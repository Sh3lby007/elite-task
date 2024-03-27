<template>
  <header>
    <div class="header">
      <text>Vue task manager</text>
      <button @click="openModal" class="createTask">Create Task</button>
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
  place-items: center;
  justify-content: space-between;
  /* padding-right: calc(var(--section-gap) / 2); */
}
.createTask {
  flex-direction: row;
  justify-content: space-between;
}
</style>
@/stores/modalStore
