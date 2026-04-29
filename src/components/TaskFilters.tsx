import {memo} from 'react'
import {useTasks} from '../store/TaskContext.ts'

function TaskFilters() {
  const {filters, filter, setFilter} = useTasks()

  return (
    <div className="toolbar">
      <div className="filters" aria-label="Фильтр задач">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === filter ? 'filter-button is-active' : 'filter-button'}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="toolbar-note">Клик по чекбоксу завершает задачу или возвращает ее в работу.</p>
    </div>
  )
}

export default memo(TaskFilters)
