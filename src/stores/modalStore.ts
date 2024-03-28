import { defineStore } from 'pinia'

export const modalStore = defineStore('modal', {
  state: () => ({
    showModal: false
  }),
  actions: {
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
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
