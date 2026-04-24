export const initialTasks = [
  {
    id: 1,
    title: 'Подготовить презентацию',
    state: {
      id: 3,
      title: 'Выполнено',
      resolved: true,
      updatedAt: new Date('2026-04-24T14:29:59Z')
    },
    createdAt: new Date('2026-04-24T14:29:00Z')
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
    createdAt: new Date('2026-04-24T15:05:00Z')
  },
  {
    id: 3,
    title: 'Проверить pull request',
    state: {
      id: 2,
      title: 'В работе',
      resolved: false,
      updatedAt: new Date('2026-04-24T15:45:00Z')
    },
    createdAt: new Date('2026-04-24T15:20:00Z')
  },
  {
    id: 4,
    title: 'Обновить документацию',
    state: {
      id: 3,
      title: 'Выполнено',
      resolved: true,
      updatedAt: new Date('2026-04-24T16:30:00Z')
    },
    createdAt: new Date('2026-04-24T16:00:00Z')
  },
  {
    id: 5,
    title: 'Составить список задач на спринт',
    state: {
      id: 2,
      title: 'В работе',
      resolved: false,
      updatedAt: new Date('2026-04-24T17:00:00Z')
    },
    createdAt: new Date('2026-04-24T16:40:00Z')
  }
]

export const filters = [
  {id: 'all', label: 'Все'},
  {id: 'active', label: 'Активные'},
  {id: 'done', label: 'Готово'},
]

const taskStates = {
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

function withUpdatedAt(state, updatedAt) {
  return {
    ...state,
    updatedAt,
  }
}

export function getTaskStats(tasks) {
  const activeCount = tasks.filter((task) => !task.state.resolved).length

  return {
    totalCount: tasks.length,
    activeCount,
    doneCount: tasks.length - activeCount,
  }
}

export function getFilteredTasks(tasks, filter) {
  if (filter === 'active') {
    return tasks.filter((task) => !task.state.resolved)
  }

  if (filter === 'done') {
    return tasks.filter((task) => task.state.resolved)
  }

  return tasks
}

export function createTask(tasks, title) {
  return {
    id: tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1,
    title,
    state: withUpdatedAt(taskStates.new, null),
    createdAt: new Date(),
  }
}

export function addTaskToList(tasks, title) {
  return [createTask(tasks, title), ...tasks]
}

export function toggleTaskInList(tasks, taskId) {
  return tasks.map((task) => {
    if (task.id !== taskId) {
      return task
    }

    const nextState = task.state.resolved ? taskStates.inProgress : taskStates.done

    return {
      ...task,
      state: withUpdatedAt(nextState, new Date()),
    }
  })
}

export function moveTaskToProgressInList(tasks, taskId) {
  return tasks.map((task) => {
    if (task.id !== taskId || task.state.id !== taskStates.new.id) {
      return task
    }

    return {
      ...task,
      state: withUpdatedAt(taskStates.inProgress, new Date()),
    }
  })
}
