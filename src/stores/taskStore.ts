import { defineStore } from 'pinia'

export enum PriorityLevel {
  Low = 'low',
  Medium = 'medium',
  High = 'high'
}
export enum TaskStatus {
  Upcoming = 'upcoming',
  Overdue = 'overdue',
  Completed = 'completed'
}
export interface Task {
  title: string
  description: string
  endDate: string
  priority: PriorityLevel
  status: TaskStatus
}

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[]
  }),
  actions: {
    addTask(newTask: Task) {
      const currentDate = new Date()
      const dueDate = new Date(newTask.endDate)
      if (dueDate < currentDate) {
        newTask.status = TaskStatus.Overdue
      } else {
        newTask.status = TaskStatus.Upcoming
      }
      this.tasks.push(newTask)
    },
    updateTask(updatedTask: Task) {
      const index = this.tasks.findIndex(
        (task) => task.title === updatedTask.title
      )
      if (index !== -1) {
        this.tasks[index] = updatedTask
      }
    },
    deleteTask(taskTitle: string) {
      const index = this.tasks.findIndex((task) => task.title === taskTitle)
      if (index !== -1) {
        this.tasks.splice(index, 1)
      }
    }
  },
  getters: {
    overdueTasks: (state) => {
      const currentDate = new Date()
      return state.tasks.filter((task) => {
        const dueDate = new Date(task.endDate)
        return dueDate < currentDate && task.status !== 'completed'
      })
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
