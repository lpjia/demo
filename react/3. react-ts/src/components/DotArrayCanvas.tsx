import { useState, useEffect } from 'react'
import { usePointerPosition } from '../hooks/usePointerPosition'
import type { P } from '../hooks/usePointerPosition'
import Dot from './Dot'

function useDelayedValue(value: P, delay: number) {
  const [delayedValue, setDelayedValue] = useState(value)
  useEffect(() => {
    setTimeout(() => {
      setDelayedValue(value)
    }, delay)

  }, [value, delay])

  return delayedValue;
}

export default function DotArrayCanvas() {
  const pos1 = usePointerPosition();
  const pos2 = useDelayedValue(pos1, 100);
  const pos3 = useDelayedValue(pos2, 200);
  const pos4 = useDelayedValue(pos3, 100);
  const pos5 = useDelayedValue(pos3, 50);
  return (
    <>
      <Dot position={pos1} opacity={1} />
      <Dot position={pos2} opacity={0.8} />
      <Dot position={pos3} opacity={0.6} />
      <Dot position={pos4} opacity={0.4} />
      <Dot position={pos5} opacity={0.2} />
    </>
  );
}