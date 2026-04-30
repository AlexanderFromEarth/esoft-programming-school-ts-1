import Hero from './components/Hero.js'
import TaskFilters from './components/TaskFilters.js'
import TaskForm from './components/TaskForm.js'
import TaskList from './components/TaskList.js'

function App() {
  return (
    <main className="app">
      <Hero/>

      <section className="panel">
        <TaskForm/>
        <TaskFilters/>
        <TaskList/>
      </section>
    </main>
  )
}

export default App
