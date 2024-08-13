"use client";
import React, { useEffect, useRef, useState } from 'react';

const insertStylesheet = (url: string) => {
  const css = Object.assign(
    document.createElement("link"),
    {
      href: url,
      rel: 'stylesheet'
    }
  )
  const head = document.documentElement.querySelector("head");
  head?.append(css)
  return () => head?.removeChild(css)
}

const script = (src: string, onLoad: (e: any) => void) => {
  const tag = Object.assign(document.createElement("script"), {
    crossOrigin: 'anonymous',
    src
  })
  tag.addEventListener("load", onLoad);
  document.body.append(tag)
  return () => {
    tag.removeEventListener("load", onLoad)
    document.body.removeChild(tag)
  }
}

type Renderer<T extends object = {}> =
  (container: HTMLElement, props: T) => () => void

declare global {
  interface Window {
    __MF_APP__: Renderer<{ message: string }>
    __SOLID_APP__: Renderer<{ message: string }>
  }
}

type HTTP = `http://${string}` | `https://${string}`

const useMicrofrontend = <EL extends HTMLElement>(base: HTTP, alias: string, props: object) => {
  const ref = useRef<EL>(null);
  const destruct = useRef<Function | null>(null);

  useEffect(() => {
    const unmountCss = insertStylesheet(`${base}/style.css`);
    const onLoad = () => {
      if (ref.current !== null) {
        destruct.current = (window as any)[alias](ref.current, props)
      }
    }
    const unmountScript = script(`${base}/index.umd.cjs`, onLoad)
    return () => {
      unmountScript()
      unmountCss()
      if (destruct.current !== null) {
        destruct.current();
      }
    }
  }, [alias])

  return [ref, destruct] as const
}

export default function Home() {
  const [state, setState] = useState({ message: 'Olá mundo' })
  const [render, kill] = useMicrofrontend<HTMLDivElement>("http://localhost:3002", "__SOLID_APP__", state)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      Aplicação host
      <button className="px-4 py-2 bg-emerald-400 text-black rounded" onClick={() => setState({
        message: Math.random().toString(36).substring(2, 8)
      })}>Random message</button>
      <button onClick={() => kill.current?.()}>
        Kill microfrontend
      </button>
      <div data-mf="__SOLID_APP__" ref={render} />
    </main>
  );
}
