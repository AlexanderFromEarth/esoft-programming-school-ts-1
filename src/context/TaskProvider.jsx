import {useCallback, useMemo, useState} from 'react'
import TaskContext from './TaskContext.js'
import {
  addTaskToList,
  filters,
  getFilteredTasks,
  getTaskStats,
  initialTasks,
  moveTaskToProgressInList,
  toggleTaskInList,
} from './taskModel.js'

function TaskProvider({children}) {
  const [tasks, setTasks] = useState(initialTasks)
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState(filters[0].id)

  const stats = useMemo(() => getTaskStats(tasks), [tasks])
  const filteredTasks = useMemo(() => getFilteredTasks(tasks, filter), [tasks, filter])

  const addTask = useCallback((event) => {
    event.preventDefault()

    const normalizedTitle = title.trim()
    if (!normalizedTitle) {
      return
    }

    setTasks((currentTasks) => addTaskToList(currentTasks, normalizedTitle))
    setTitle('')
  }, [title])

  const toggleTask = useCallback((taskId) => {
    setTasks((currentTasks) => toggleTaskInList(currentTasks, taskId))
  }, [])

  const moveTaskToProgress = useCallback((taskId) => {
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
