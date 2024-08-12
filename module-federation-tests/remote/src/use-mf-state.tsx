import { useEffect, useState } from "react";

export const useMfState = <T,>(initialState: T, origin: string = "*") => {
  const r = useState({ value: initialState })

  useEffect(() => {
    window.addEventListener(
      "message",
      (event) => {
        if (event.origin !== origin) return;
        const result = JSON.parse(event.data)
        if (result) r[1](result)
      },
      false,
    );
  }, [origin])
  return r[0].value;
}

