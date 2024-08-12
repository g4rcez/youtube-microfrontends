import "./index.scss";
import { createSignal, createEffect } from "solid-js";

const useMfState = <T,>(initialValue: T, origin: string) => {
  const r = createSignal({ value: initialValue });
  createEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.origin !== origin) return;
      const result = JSON.parse(event.data)
      if (result) r[1](result)
    })
  })
  return r[0]
}


export const RemoteSolid = () => {
  const count = useMfState(0, "http://localhost:3000")
  return (
    <div class="mt-10 text-3xl mx-auto max-w-6xl">
      <div>Name: solid-remote</div>
      <div>Framework: solid-js</div>
      <div>Language: TypeScript</div>
      <div>CSS: Tailwind</div>
      Count: {count().value}
    </div>
  )
};
