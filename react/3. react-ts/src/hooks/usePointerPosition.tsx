import { useState, useEffect } from 'react';

const p = { x: 0, y: 0 }
export function usePointerPosition() {
  const [position, setPosition] = useState(p)
  useEffect(() => {

    function handleMove(e: PointerEvent) {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
      })
    }
    window.addEventListener('pointermove', handleMove)

    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return position
}
export type P = typeof p