import Hero from './components/Hero.js'
import TaskFilters from './components/TaskFilters.js'
import TaskForm from './components/TaskForm.js'
import TaskList from './components/TaskList.js'
import TaskProvider from './context/TaskProvider.tsx'

function App() {
  return (
    <TaskProvider>
      <main className="app">
        <Hero/>

        <section className="panel">
          <TaskForm/>
          <TaskFilters/>
          <TaskList/>
        </section>
      </main>
    </TaskProvider>
  )
}

export default App
