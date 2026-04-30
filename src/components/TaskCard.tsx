import {observer} from 'mobx-react-lite'
import {useTasks} from '../store/taskStore.ts'
import type {Task} from '../store/taskModel.ts';
import useTrack from '../useTrack.ts';

interface TaskCardProps {
  task: Task
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

function TaskCard({task}: TaskCardProps) {
  const {toggleTask, moveTaskToProgress} = useTasks()

  useTrack(`TaskCard ${task.id}`)

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

export default observer(TaskCard)
