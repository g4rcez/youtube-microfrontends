import { render } from 'solid-js/web'
import './index.css'
import App, { AppProps } from './App'


declare global {
  interface Window {
    __SOLID_APP__: (container: HTMLElement, props: AppProps) => () => void
  }
}

window.__SOLID_APP__ = (container, props) => {
  return render(() => <App {...props} />, container)
}
