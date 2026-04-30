import {observer} from 'mobx-react-lite'
import useTrack from '../useTrack.ts';
import TaskCard from './TaskCard.js'
import {useTasks} from '../store/taskStore.ts'

function TaskList() {
  const {filteredTasks} = useTasks()

  useTrack('TaskList')

  return (
    <div className="task-list">
      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <h2>Ничего не найдено</h2>
          <p>Смените фильтр или добавьте новую задачу через форму выше.</p>
        </div>
      ) : (
        filteredTasks.map((task) => <TaskCard key={task.id} task={task}/>)
      )}
    </div>
  )
}

export default observer(TaskList)
