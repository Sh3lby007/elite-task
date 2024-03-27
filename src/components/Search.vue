<template>
  <div class="search-box">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search tasks..."
      @input="emitSearchEvent"
    />
  </div>
</template>

<script setup lang="ts">
// Vue required imports
import { ref } from 'vue'
import { defineEmits } from 'vue'
// Variable declartion
const searchQuery = ref('')
const emit = defineEmits(['search'])

// Functions
const emitSearchEvent = () => {
  const searchValue = searchQuery.value.trim()
  if (searchValue) {
    emit('search', searchValue)
  }
}
</script>

<style scoped>
.search-box {
  font-size: 10px;
  border: solid #000000;
  display: inline-block;
  position: relative;
  border-radius: 2.5em;
  input[type='text'] {
    font-family: inherit;
    font-weight: bold;
    width: 2.5em;
    height: 2.5em;
    padding: 0.3em 2.1em 0.3em 0.4em;
    border: none;
    box-sizing: border-box;
    border-radius: 2.5em;
    transition: width 800ms cubic-bezier(0.68, -0.55, 0.27, 1.55) 150ms;
    &:focus {
      outline: none;
    }
    &:focus,
    &:not(:placeholder-shown) {
      width: 18em;
      transition: width 800ms cubic-bezier(0.68, -0.55, 0.27, 1.55);
      + button[type='reset'] {
        transform: rotate(-45deg) translateY(0);
        transition: transform 150ms ease-out 800ms;
      }
      + button[type='reset']:after {
        opacity: 1;
        transition:
          top 150ms ease-out (800ms + 150ms),
          right 150ms ease-out (800ms + 150ms),
          opacity 150ms ease (800ms + 150ms);
      }
    }
  }
  button[type='reset'] {
    background-color: transparent;
    width: 1.4em;
    height: 1.4em;
    border: 0;
    padding: 0;
    outline: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: (2.5em / 2) - (1.4em / 2);
    right: (2.5em / 2) - (1.4em / 2);
    transform: rotate(-45deg)
      translateY(2.5em - transition transform 150ms ease-out 150ms);
    transition: transform 150ms ease-out 150ms;
    &:before,
    &:after {
      content: '';
      background-color: #000000;
      width: 0.3em;
      height: 1.4em;
      position: absolute;
    }
    &:after {
      transform: rotate(90deg);
      opacity: 0;
      transition:
        transform 150ms ease-out,
        opacity 150ms ease-out;
    }
  }
}
</style>
