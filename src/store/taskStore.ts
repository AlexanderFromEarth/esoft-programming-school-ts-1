import {makeAutoObservable} from 'mobx'
import {createContext, useContext} from 'react';
import {
  type FilterId,
  initialTasks,
  filters,
  getTaskStats,
  getFilteredTasks,
  createTask,
  toggleTask,
  moveTaskToProgress
} from './taskModel.ts';

export const store = makeAutoObservable({
  tasks: [...initialTasks],
  filter: filters[0].id,
  title: '',
  get filters() {
    return filters;
  },
  get filteredTasks() {
    return getFilteredTasks(this.tasks, this.filter)
  },
  get stats() {
    return getTaskStats(this.tasks)
  },
  get totalCount() {
    return this.stats.totalCount
  },
  get activeCount() {
    return this.stats.activeCount
  },
  get doneCount() {
    return this.stats.doneCount
  },
  setTitle(title: string) {
    this.title = title
  },
  setFilter(filterId: FilterId) {
    this.filter = filterId
  },
  addTask() {
    const normalizedTitle = this.title.trim()
    if (!normalizedTitle) {
      return
    }

    this.tasks.unshift(createTask(this.tasks, normalizedTitle))
    this.title = ''
  },
  toggleTask(taskId: number) {
    const task = this.tasks.find((task) => task.id === taskId)

    if (task) {
      toggleTask(task)
    }
  },
  moveTaskToProgress(taskId: number) {
    const task = this.tasks.find((task) => task.id === taskId)

    if (task) {
      moveTaskToProgress(task)
    }
  }
}, undefined, {autoBind: true})

export const TaskContext = createContext<typeof store | null>(null)

export function useTasks() {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useTasks must be used as an context')
  }

  return context
}
