import {memo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {selectTitle, setTitle, addTask} from '../store/taskStore.ts'
import useTrack from '../useTrack.ts';

function TaskForm() {
  const title = useSelector(selectTitle);
  const dispatch = useDispatch();

  useTrack('TaskForm')

  return (
    <form className="task-form" onSubmit={(e) => {
      e.preventDefault()
      dispatch(addTask())
    }}>
      <label className="task-form-field">
        <span>Новая задача</span>
        <input
          type="text"
          name="title"
          placeholder="Например, подготовить демо"
          value={title}
          onChange={(event) => dispatch(setTitle(event.target.value))}
        />
      </label>
      <button type="submit">Добавить</button>
    </form>
  )
}

export default memo(TaskForm)
