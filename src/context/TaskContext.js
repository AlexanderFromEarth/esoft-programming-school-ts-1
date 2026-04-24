import {createContext, useContext} from 'react'

const TaskContext = createContext(null)

export function useTasks() {
  return useContext(TaskContext)
}

export default TaskContext
