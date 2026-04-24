import Hero from './components/Hero.jsx'
import TaskFilters from './components/TaskFilters.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import TaskProvider from './context/TaskProvider.jsx'

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
