import App, { AppProps } from './App.tsx'
import { createRoot } from "react-dom/client"

declare global {
  interface Window {
    __MF_APP__: (container: HTMLElement, props?: AppProps) => () => void
  }
}

window.__MF_APP__ = (container, props) => {
  const root = createRoot(container)
  root.render(<App {...props} />)
  return () => root.unmount();
}

