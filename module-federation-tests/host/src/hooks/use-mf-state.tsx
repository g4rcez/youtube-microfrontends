import { useCallback, useState } from "react";

type Setter<T> = T | ((previous: T) => T)

export const useMfState = <T,>(initialState: T, origin: string = "*") => {
  const [r, s] = useState({ value: initialState })

  const setter = useCallback((entry: Setter<T>) => {
    r(prev => {
      const result = typeof entry === "function" ? (entry as any)(prev.value) : entry
      window.postMessage(JSON.stringify({ value: result }), origin)
      return { value: result }
    })
  }, [])

  return [r.value, setter] as const;
}
