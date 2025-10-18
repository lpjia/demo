import { customRef } from 'vue'

export const useDebouncedRef = (value: any, delay = 1000) => {
  let timeout: NodeJS.Timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}