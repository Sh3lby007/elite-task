<template>
  <section class="modal">
    <div class="flex">
      <button @click="closeModal" class="btn-close">⨉</button>
    </div>
    <div>
      <h3>Stay in touch</h3>
      <p>
        This is a dummy newsletter form so don't bother trying to test it. Not
        that I expect you to, anyways. :)
      </p>
    </div>

    <input type="email" id="email" placeholder="brendaneich@js.com" />
    <button class="btn">Submit</button>
  </section>
</template>

<script setup lang="ts">
import { modalStore } from '@/stores/modalStore'

const modalData = modalStore()
const { closeModal } = modalData
</script>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
  width: 500px;
  padding: 2rem;
  min-height: 250px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 3px solid #ddd;
  border-radius: 15px;
  z-index: 10;
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
.modal .flex {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.modal input {
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

.btn {
  display: inline-block;
  padding: 0.8rem 1.4rem;
  font-weight: 700;
  background-color: black;
  color: white;
  border-radius: 5px;
  text-align: center;
  font-size: 1em;
}

.btn-open {
  position: absolute;
  bottom: 150px;
}

.btn-close {
  transform: translate(10px, -20px);
  padding: 0.5rem 0.7rem;
  background: #eee;
  border-radius: 50%;
}
</style>
