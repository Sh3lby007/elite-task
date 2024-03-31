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
    tasks: [
      {
        title: 'Create design mockups',
        description:
          'Create user interface design mockups for the new website.',
        endDate: '2024-06-10',
        priority: PriorityLevel.High,
        status: TaskStatus.Upcoming
      },
      {
        title: 'Develop landing page',
        description:
          'Develop the landing page based on the approved design mockups.',
        endDate: '2024-06-15',
        priority: PriorityLevel.Medium,
        status: TaskStatus.Upcoming
      },
      {
        title: 'Code review',
        description: 'Perform code review for the landing page implementation.',
        endDate: '2024-06-18',
        priority: PriorityLevel.Low,
        status: TaskStatus.Upcoming
      },
      {
        title: 'Deploy to production',
        description: 'Deploy the website to the production server.',
        endDate: '2024-06-20',
        priority: PriorityLevel.High,
        status: TaskStatus.Upcoming
      },
      {
        title: 'Write user documentation',
        description: 'Create user documentation for the new website features.',
        endDate: '2024-06-25',
        priority: PriorityLevel.Medium,
        status: TaskStatus.Upcoming
      },
      {
        title: 'Implement search functionality',
        description: 'Add search functionality to the website.',
        endDate: '2024-02-01',
        priority: PriorityLevel.High,
        status: TaskStatus.Overdue
      },
      {
        title: 'Fix responsive issues',
        description: 'Fix responsive layout issues on mobile devices.',
        endDate: '2024-06-05',
        priority: 'medium',
        status: TaskStatus.Completed
      }
    ] as Task[]
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
        this.tasks[index] = { ...this.tasks[index], ...updatedTask }
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
        return dueDate < currentDate && task.status !== TaskStatus.Completed
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
