import {memo} from 'react'
import {useTasks} from '../store/TaskContext.ts'

function TaskForm() {
  const {title, setTitle, addTask} = useTasks()

  return (
    <form className="task-form" onSubmit={addTask}>
      <label className="task-form-field">
        <span>Новая задача</span>
        <input
          type="text"
          name="title"
          placeholder="Например, подготовить демо"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <button type="submit">Добавить</button>
    </form>
  )
}

export default memo(TaskForm)
