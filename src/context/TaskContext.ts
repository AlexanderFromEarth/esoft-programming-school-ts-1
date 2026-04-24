import {createContext, useContext, type EventHandler, type SyntheticEvent} from 'react'
import type {FilterId, Task, Stats} from './taskModel.ts';

const TaskContext = createContext<Stats & {
  tasks: Array<Task>;
  filteredTasks: Array<Task>;
  title: string;
  filter: FilterId;
  filters: Array<{id: FilterId, label: string}>;
  setTitle: (title: string) => void;
  setFilter: (filterId: FilterId) => void;
  addTask: EventHandler<SyntheticEvent<unknown>>;
  toggleTask: (taskId: number) => void;
  moveTaskToProgress: (taskId: number) => void;
} | null>(null)

export function useTasks() {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useTasks must be used as an context')
  }

  return context
}

export default TaskContext
