import type { P } from '../hooks/usePointerPosition'

export default function Dot({ position, opacity }: { position: P, opacity: number }) {
  return (
    <div style={{
      position: 'absolute',
      backgroundColor: 'deepskyblue',
      borderRadius: '50%',
      opacity,
      transform: `translate(${position.x}px,${position.y}px)`,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      width: 40,
      height: 40,
    }} />
  )
}