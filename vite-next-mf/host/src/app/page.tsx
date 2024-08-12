"use client";
import React, { useEffect, useRef } from 'react';

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
  const tag = Object.assign(document.createElement("script"), { crossOrigin: 'anonymous', src })
  tag.addEventListener("load", onLoad);
  document.body.append(tag)
  return () => {
    tag.removeEventListener("load", onLoad)
    document.body.removeChild(tag)
  }
}

type Renderer<T extends object = {}> = (container: HTMLElement, props: T) => () => void

declare global {
  interface Window {
    __MF_APP__: Renderer<{ message: string }>
  }
}

const useMicrofrontend = <EL extends HTMLElement>(base: `http://${string}`) => {
  const ref = useRef<EL>(null);
  const destruct = useRef<Function | null>(null);

  useEffect(() => {
    const unmountCss = insertStylesheet(`${base}/style.css`);
    const onLoad = () => {
      if (ref.current) {
        destruct.current = window.__MF_APP__(ref.current, { message: " - FUNCIONOU!!!" })
      }
    }
    const unmountScript = script(`${base}/index.umd.cjs`, onLoad)
    return () => {
      unmountScript()
      unmountCss()
      if (destruct.current) {
        destruct.current();
      }
    }
  }, [])
  return [ref, destruct] as const
}

export default function Home() {
  const [render, kill] = useMicrofrontend<HTMLDivElement>("http://localhost:3001")
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      Aplicação host
      <button onClick={() => kill.current?.()}>
        Kill microfrontend
      </button>
      <div ref={render} />
    </main>
  );
}
