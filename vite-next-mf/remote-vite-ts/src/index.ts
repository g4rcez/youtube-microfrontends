import { createElement } from 'react';
import App from './App.tsx'
import { createRoot } from "react-dom/client"

(window as any).__MF_APP__ = (container: HTMLElement, props?: any) => {
  const root = createRoot(container)
  root.render(createElement(App, props))
  return () => root.unmount();
}

