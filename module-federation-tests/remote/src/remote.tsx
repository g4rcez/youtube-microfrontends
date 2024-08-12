import React from "react";
import './index.scss'
import { useMfState } from "./use-mf-state";

export const Remote = () => {
  const count = useMfState(0, "http://localhost:3000")
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <div>Name: remote</div>
      <div>Framework: react</div>
      <div>Language: TypeScript</div>
      <div>CSS: Tailwind</div>
      <p>{count}</p>
    </div>
  )
}
