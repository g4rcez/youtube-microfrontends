import { createSignal } from 'solid-js'
import './App.css'

export type AppProps = {
  message: string
}

function App(props: AppProps) {
  console.log("SOLID CONSOLE", props)
  const [count, setCount] = createSignal(0)

  return (
    <main data-name='solid-app'>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count()} - Solid
      </button>
    </main>
  )
}

export default App
