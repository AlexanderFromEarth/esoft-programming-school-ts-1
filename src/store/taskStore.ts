import {create} from 'zustand'
import {devtools} from 'zustand/middleware'

import {
  addTaskToList,
  type FilterId,
  filters,
  getFilteredTasks,
  getTaskStats,
  initialTasks,
  moveTaskToProgressInList,
  type Task,
  type Stats,
  toggleTaskInList
} from './taskModel.ts'

export const useTasks = create(devtools<Stats & {
  tasks: Array<Task>;
  filteredTasks: Array<Task>;
  title: string;
  filter: FilterId;
  filters: Array<{id: FilterId, label: string}>;
  setTitle: (title: string) => void;
  setFilter: (filterId: FilterId) => void;
  addTask: () => void;
  toggleTask: (taskId: number) => void;
  moveTaskToProgress: (taskId: number) => void;
}>((set, get) => ({
  ...getTaskStats(initialTasks),
  tasks: initialTasks,
  filteredTasks: initialTasks,
  title: '',
  filter: 'all',
  filters,
  setTitle(title) {
    set({title})
  },
  setFilter(filterId) {
    set((state) => ({
      filter: filterId,
      filteredTasks: getFilteredTasks(state.tasks, filterId)
    }))
  },
  addTask() {
    const normalizedTitle = get().title.trim()
    if (!normalizedTitle) {
      return
    }

    set((state) => {
      const tasks = addTaskToList(state.tasks, normalizedTitle);

      return ({tasks, title: '', filteredTasks: getFilteredTasks(tasks, state.filter), ...getTaskStats(tasks)});
    })
  },
  toggleTask(taskId) {
    set((state) => {
      const tasks = toggleTaskInList(state.tasks, taskId);

      return ({tasks, filteredTasks: getFilteredTasks(tasks, state.filter), ...getTaskStats(tasks)});
    })
  },
  moveTaskToProgress(taskId) {
    set((state) => {
      const tasks = moveTaskToProgressInList(state.tasks, taskId);

      return ({tasks, filteredTasks: getFilteredTasks(tasks, state.filter), ...getTaskStats(tasks)});
    })
  }
})))
