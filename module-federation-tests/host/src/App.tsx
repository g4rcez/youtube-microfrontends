import React from 'react'
import ReactDOM from 'react-dom/client'
import * as R from "remote/remote"
import { useMfState } from './hooks/use-mf-state'
import './index.scss'

const Component = R.Remote

const App = () => {
  const r = useMfState(0)
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <div>Name: host</div>
      <button className='px-4 py-2 bg-black text-white rounded' onClick={() => r[1](prev => prev + 1)}>Increment {r[0]}</button>
      <Component />
    </div>
  )
}
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)
