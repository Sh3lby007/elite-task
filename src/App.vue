<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Modal from './components/Modal.vue'
import { modalStore } from './stores/modalStore'
import { storeToRefs } from 'pinia'

const modalData = modalStore()
const { showModal } = storeToRefs(modalData)

// console.log(showModal)
</script>

<template>
  <Modal v-if="showModal" />
  <RouterView />
</template>

<style scoped></style>
