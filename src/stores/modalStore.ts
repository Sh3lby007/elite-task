import { defineStore } from 'pinia'
import type { Task } from './taskStore'

export const useModalStore = defineStore('modal', {
  state: () => ({
    showModal: false,
    taskData: null as Task | null,
    isEditMode: false
  }),
  actions: {
    openModal(task: Task | null, isEditMode: boolean) {
      this.showModal = true
      this.taskData = task
      this.isEditMode = isEditMode
    },
    closeModal() {
      this.showModal = false
      this.taskData = null
      this.isEditMode = false
    }
  },
  /**  https://www.npmjs.com/package/pinia-plugin-persistedstate
   *  Persists this store's state in localStorage to reuse across sessions
   *  Note that this is not efficient for large to extremely large state trees,
   *  as on every state change, the entire tree is serialized and saved.
   *  https://github.com/prazdevs/pinia-plugin-persistedstate#-usage
   *  This can be customised to use other storage implementations like sessionStorage
   */

  /**
   * localStorage as default storage
   * store.$id as default key for storage
   * JSON.stringify/JSON.parse as serializers/deserializers
   */
  persist: true
})
