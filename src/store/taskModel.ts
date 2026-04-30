interface StateBase {
  id: number;
  title: string;
  resolved: boolean;
}

interface State extends StateBase {
  updatedAt: string | null;
}

export interface Task {
  id: number;
  title: string;
  state: State;
  createdAt: string;
}

export const initialTasks: Array<Task> = [
  {
    id: 1,
    title: 'Подготовить презентацию',
    state: {
      id: 3,
      title: 'Выполнено',
      resolved: true,
      updatedAt: new Date('2026-04-24T14:29:59Z').toISOString()
    },
    createdAt: new Date('2026-04-24T14:29:00Z').toISOString()
  },
  {
    id: 2,
    title: 'Созвониться с заказчиком',
    state: {
      id: 1,
      title: 'Новая',
      resolved: false,
      updatedAt: null
    },
    createdAt: new Date('2026-04-24T15:05:00Z').toISOString()
  },
  {
    id: 3,
    title: 'Проверить pull request',
    state: {
      id: 2,
      title: 'В работе',
      resolved: false,
      updatedAt: new Date('2026-04-24T15:45:00Z').toISOString()
    },
    createdAt: new Date('2026-04-24T15:20:00Z').toISOString()
  },
  {
    id: 4,
    title: 'Обновить документацию',
    state: {
      id: 3,
      title: 'Выполнено',
      resolved: true,
      updatedAt: new Date('2026-04-24T16:30:00Z').toISOString()
    },
    createdAt: new Date('2026-04-24T16:00:00Z').toISOString()
  },
  {
    id: 5,
    title: 'Составить список задач на спринт',
    state: {
      id: 2,
      title: 'В работе',
      resolved: false,
      updatedAt: new Date('2026-04-24T17:00:00Z').toISOString()
    },
    createdAt: new Date('2026-04-24T16:40:00Z').toISOString()
  }
]

export type FilterId = 'all' | 'active' | 'done'

export const filters: Array<{id: FilterId, label: string}> = [
  {id: 'all', label: 'Все'},
  {id: 'active', label: 'Активные'},
  {id: 'done', label: 'Готово'},
]

export const taskStates: {
  new: StateBase;
  inProgress: StateBase;
  done: StateBase;
} = {
  new: {
    id: 1,
    title: 'Новая',
    resolved: false,
  },
  inProgress: {
    id: 2,
    title: 'В работе',
    resolved: false,
  },
  done: {
    id: 3,
    title: 'Выполнено',
    resolved: true,
  },
}

export interface Stats {
  totalCount: number;
  activeCount: number;
  doneCount: number;
}

export function getTaskStats(tasks: Array<Task>): Stats {
  const activeCount = tasks.filter((task) => !task.state.resolved).length

  return {
    totalCount: tasks.length,
    activeCount,
    doneCount: tasks.length - activeCount,
  }
}

export function getFilteredTasks(tasks: Array<Task>, filter: FilterId): Array<Task> {
  if (filter === 'active') {
    return tasks.filter((task) => !task.state.resolved)
  } else if (filter === 'done') {
    return tasks.filter((task) => task.state.resolved)
  }

  return tasks
}

export function createTask(tasks: Array<Task>, title: string): Task {
  return {
    id: tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1,
    title,
    state: {...taskStates.new, updatedAt: null},
    createdAt: new Date().toISOString(),
  }
}

export function addTaskToList(tasks: Array<Task>, title: string): Array<Task> {
  return [createTask(tasks, title), ...tasks]
}

export function toggleTask(task: Task): Task {
  const nextState = task.state.resolved ? taskStates.inProgress : taskStates.done

  task.state = {...nextState, updatedAt: new Date().toISOString()}

  return task
}

export function toggleTaskInList(tasks: Array<Task>, taskId: number): Array<Task> {
  return tasks.map((task) => {
    if (task.id !== taskId) {
      return task
    }

    return toggleTask({...task})
  })
}

export function moveTaskToProgress(task: Task): Task {
  task.state = {...taskStates.inProgress, updatedAt: new Date().toISOString()}

  return task
}

export function moveTaskToProgressInList(tasks: Array<Task>, taskId: number): Array<Task> {
  return tasks.map((task) => {
    if (task.id !== taskId || task.state.id !== taskStates.new.id) {
      return task
    }

    return moveTaskToProgress({...task})
  })
}
