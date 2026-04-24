import {type PropsWithChildren, type SyntheticEvent, useCallback, useMemo, useState} from 'react'
import TaskContext from './TaskContext.ts'
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

function TaskProvider({children}: PropsWithChildren) {
  const [tasks, setTasks] = useState<Array<Task>>(initialTasks)
  const [title, setTitle] = useState<string>('')
  const [filter, setFilter] = useState<FilterId>(filters[0].id)

  const stats = useMemo(() => getTaskStats(tasks), [tasks])
  const filteredTasks = useMemo(() => getFilteredTasks(tasks, filter), [tasks, filter])

  const addTask = useCallback((event: SyntheticEvent<unknown>) => {
    event.preventDefault()

    const normalizedTitle = title.trim()
    if (!normalizedTitle) {
      return
    }

    setTasks((currentTasks) => addTaskToList(currentTasks, normalizedTitle))
    setTitle('')
  }, [title])

  const toggleTask = useCallback((taskId: number) => {
    setTasks((currentTasks) => toggleTaskInList(currentTasks, taskId))
  }, [])

  const moveTaskToProgress = useCallback((taskId: number) => {
    setTasks((currentTasks) => moveTaskToProgressInList(currentTasks, taskId))
  }, [])

  const value = useMemo(() => ({
    tasks,
    filteredTasks,
    title,
    filter,
    filters,
    totalCount: stats.totalCount,
    activeCount: stats.activeCount,
    doneCount: stats.doneCount,
    setTitle,
    setFilter,
    addTask,
    toggleTask,
    moveTaskToProgress,
  }), [
    tasks,
    filteredTasks,
    title,
    filter,
    stats,
    addTask,
    toggleTask,
    moveTaskToProgress,
  ])

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export default TaskProvider
