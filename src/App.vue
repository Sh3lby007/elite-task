<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Modal from './components/Modal.vue'
import { useModalStore } from './stores/modalStore'
import { storeToRefs } from 'pinia'

const modalData = useModalStore()
const { showModal } = storeToRefs(modalData)

// console.log(showModal)
</script>

<template>
  <RouterView />
  <Modal v-if="showModal" />
  <div :class="{ overlay: showModal }"></div>
</template>

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
