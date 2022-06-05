// export function useEventListener(target: EventTarget, event: string, callback: (e: MouseEvent |) => void) {
export function useEventListener(target: EventTarget, event: string, callback: (e: GlobalEventHandlersEventMap) => void) {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}