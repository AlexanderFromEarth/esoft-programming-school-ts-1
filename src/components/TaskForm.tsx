import {observer} from 'mobx-react-lite'
import {useTasks} from '../store/taskStore.ts'
import useTrack from '../useTrack.ts';

function TaskForm() {
  const {title, setTitle, addTask} = useTasks()

  useTrack('TaskForm')

  return (
    <form className="task-form" onSubmit={(e) => {
      e.preventDefault()
      addTask()
    }}>
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

export default observer(TaskForm)
