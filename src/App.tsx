import {Provider} from 'react-redux'
import Hero from './components/Hero.js'
import TaskFilters from './components/TaskFilters.js'
import TaskForm from './components/TaskForm.js'
import TaskList from './components/TaskList.js'
import {store} from './store/taskStore.ts';

function App() {
  return (
    <Provider store={store}>
      <main className="app">
        <Hero/>

        <section className="panel">
          <TaskForm/>
          <TaskFilters/>
          <TaskList/>
        </section>
      </main>
    </Provider>
  )
}

export default App
