import { useState } from 'react'
import './App.css'

type Props = {
  message?: string
}

function App(props: Props) {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>
        From parent {props.message}
      </p>
      <div className="group">
        <button onClick={() => setCount(p => p - 1)}>-</button>
        <div className="button">
          {count}
        </div>
        <button onClick={() => setCount(p => p + 1)}>+</button>
      </div>
    </div>
  )
}

export default App
