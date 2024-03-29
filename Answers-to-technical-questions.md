# How long did you spend on the coding test?

Upon receiving the google docs requirement on Tuesday, 26 March @ 10.08pm. It
took me about 3 days to complete a working MVP as of writing (Friday, 29 March @ 11.11pm).
However, most of the work is done on Friday since the previous 2 days were full working days. Total it took me about 16 hours for the 3 days combined.

# What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

One of the most useful features added to Vue 3 is the Composition API with the setup function. The Composition API allows for better code organization, reusability, and maintainability by enabling developers to encapsulate related logic into composable functions.

In this project, I extensively used the Composition API with the setup function to manage the component's state, computed properties, and methods. Here's a snippet of code from the Search component that demonstrates the usage of the Composition API:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')
const emit = defineEmits(['search'])

const emitSearchEvent = () => {
  const searchValue = searchQuery.value.trim()
  emit('search', searchValue)
}

const resetSearch = () => {
  searchQuery.value = ''
  emit('search', '')
}
</script>
```

# How would you track down a performance issue in production? Have you ever had to do this?

In my current work where we use webpack, I've used tools like webpack bundle
analyzer plugin to see what modules make up most of its size and unused modules.
This allowed me to identify which modules are huge and I've found un-used modules
just laying around the codebase which we successfully deleted which reduces the built file by 5 MB.

# If you had more time, what additional features or improvements would you consider adding to the task management application?

1. Creating sub-tasks when creating a new task, whereby each sub-task is
   accompanied by a check-box or a list so that users can break down their
   task and have a better understanding of what they need to do.
2. Creating more boards to manage other projects and not just one so that
   more can be done
3. Drag and drop each task to allow users to easily re-order tasks to put the
   more important ones higher and also to update the tasks status
