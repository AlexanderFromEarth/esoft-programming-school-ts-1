import {memo} from 'react'
import {useTasks} from '../context/TaskContext.ts'
import type {Task} from '../context/taskModel.ts';

interface TaskCardProps {
  task: Task
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function TaskCard({task}: TaskCardProps) {
  const {toggleTask, moveTaskToProgress} = useTasks()

  return (
    <article className={task.state.resolved ? 'task-card is-done' : 'task-card'}>
      <label className="task-check">
        <input
          type="checkbox"
          checked={task.state.resolved}
          onChange={() => toggleTask(task.id)}
        />
        <span/>
      </label>

      <div className="task-content">
        <div className="task-header">
          <h2>{task.title}</h2>
          <span className={`state-badge state-${task.state.id}`}>{task.state.title}</span>
        </div>

        <p className="task-meta">
          Создано: {formatDate(task.createdAt)} {task.state.updatedAt ? `• Обновлено: ${formatDate(task.state.updatedAt)}` : ''}
        </p>
      </div>

      <div className="task-actions">
        {task.state.id === 1 && (
          <button type="button" onClick={() => moveTaskToProgress(task.id)}>
            Начать
          </button>
        )}
        {!task.state.resolved && (
          <button type="button" className="ghost-button" onClick={() => toggleTask(task.id)}>
            Завершить
          </button>
        )}
      </div>
    </article>
  )
}

export default memo(TaskCard)
