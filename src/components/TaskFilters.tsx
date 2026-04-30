import {memo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setFilter, selectFilters, selectFilter} from '../store/taskStore.ts'
import useTrack from '../useTrack.ts';

function TaskFilters() {
  const filters = useSelector(selectFilters);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  useTrack('TaskFilters')

  return (
    <div className="toolbar">
      <div className="filters" aria-label="Фильтр задач">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === filter ? 'filter-button is-active' : 'filter-button'}
            onClick={() => dispatch(setFilter(item.id))}
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
