import Hero from './components/Hero.js'
import TaskFilters from './components/TaskFilters.js'
import TaskForm from './components/TaskForm.js'
import TaskList from './components/TaskList.js'
import {TaskContext, useTasksStore} from './store/taskStore.ts'

function App() {
  const store = useTasksStore()

  return (
    <TaskContext.Provider value={store}>
      <main className="app">
        <Hero/>

        <section className="panel">
          <TaskForm/>
          <TaskFilters/>
          <TaskList/>
        </section>
      </main>
    </TaskContext.Provider>
  )
}

export default App
