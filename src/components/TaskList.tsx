import {memo} from 'react'
import TaskCard from './TaskCard.js'
import {useTasks} from '../context/TaskContext.ts'

function TaskList() {
  const {filteredTasks} = useTasks()

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

export default memo(TaskList)
