import {useSelector} from 'react-redux'
import {selectStats} from '../store/taskStore.ts';
import useTrack from '../useTrack.ts';

function Hero() {
  const {totalCount, activeCount, doneCount} = useSelector(selectStats);

  useTrack('Hero')

  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Task board</p>
        <h1>To Do List</h1>
        <p className="hero-text">
          Небольшое приложение на React и CSS для учета задач, добавления новых дел и
          переключения их статусов.
        </p>
      </div>

      <div className="stats">
        <article className="stat-card">
          <span>Всего задач</span>
          <strong>{totalCount}</strong>
        </article>
        <article className="stat-card">
          <span>В работе</span>
          <strong>{activeCount}</strong>
        </article>
        <article className="stat-card">
          <span>Завершено</span>
          <strong>{doneCount}</strong>
        </article>
      </div>
    </section>
  )
}

export default Hero
