import {createContext, useContext, useState} from 'react'
import {
  type FilterId,
  type Task,
  type Stats,
  initialTasks,
  filters,
  getTaskStats,
  getFilteredTasks,
  addTaskToList,
  toggleTaskInList,
  moveTaskToProgressInList
} from './taskModel.ts';

export const TaskContext = createContext<Stats & {
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
} | null>(null)

export function useTasksStore() {
  const [tasks, setTasks] = useState<Array<Task>>(initialTasks)
  const [title, setTitle] = useState<string>('')
  const [filter, setFilter] = useState<FilterId>(filters[0].id)

  return {
    ...getTaskStats(tasks),
    tasks,
    filteredTasks: getFilteredTasks(tasks, filter),
    title,
    filter,
    filters,
    setTitle,
    setFilter,
    addTask() {
      const normalizedTitle = title.trim()
      if (!normalizedTitle) {
        return
      }

      setTasks((currentTasks) => addTaskToList(currentTasks, normalizedTitle))
      setTitle('')
    },
    toggleTask(taskId: number) {
      setTasks((currentTasks) => toggleTaskInList(currentTasks, taskId))
    },
    moveTaskToProgress(taskId: number) {
      setTasks((currentTasks) => moveTaskToProgressInList(currentTasks, taskId))
    },
  };
}

export function useTasks() {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useTasks must be used as an context')
  }

  return context
}
