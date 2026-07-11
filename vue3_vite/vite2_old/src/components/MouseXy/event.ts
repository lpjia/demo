export function useEventListener(target: EventTarget, event: string, callback: (e: any) => void) {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}