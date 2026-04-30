import {configureStore, createSelector, createSlice} from '@reduxjs/toolkit'

import {
  addTaskToList,
  type FilterId,
  filters,
  getFilteredTasks,
  getTaskStats,
  initialTasks,
  moveTaskToProgressInList,
  type Task,
  toggleTaskInList
} from './taskModel.ts'

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: initialTasks,
    title: '',
    filter: 'all' as FilterId,
    filters
  },
  selectors: {
    selectTitle: ({title}) => title,
    selectFilter: ({filter}) => filter,
    selectFilters: ({filters}) => filters,
    selectStats: createSelector(
      [({tasks}: {tasks: Array<Task>}) => tasks],
      (tasks) => getTaskStats(tasks)
    ),
    selectFilteredTasks: createSelector(
      [({tasks}: {tasks: Array<Task>}) => tasks, ({filter}: {filter: FilterId}) => filter],
      (tasks, filter) => getFilteredTasks(tasks, filter)
    )
  },
  reducers: {
    setTitle(state, action) {
      return {...state, title: action.payload}
    },
    setFilter(state, action) {
      return {...state, filter: action.payload}
    },
    addTask(state) {
      const title = state.title.trim()

      if (!title) {
        return
      }

      const tasks = addTaskToList(state.tasks, title)

      return {...state, title: '', tasks}
    },
    toggleTask(state, action) {
      const tasks = toggleTaskInList(state.tasks, action.payload)

      return {...state, tasks}
    },
    moveTaskToProgress(state, action) {
      const tasks = moveTaskToProgressInList(state.tasks, action.payload)

      return {...state, tasks}
    }
  }
})

export const {
  setTitle,
  setFilter,
  toggleTask,
  addTask,
  moveTaskToProgress
} = tasksSlice.actions

export const {
  selectTitle,
  selectFilters,
  selectFilter,
  selectStats,
  selectFilteredTasks
} = tasksSlice.selectors

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer
  }
})
