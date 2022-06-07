import { Ref } from "vue"

export function useFetch(url: string | Ref) {
  const data = ref(null)
  const error = ref(null as any)

  function doFetch(): void {
    // 在请求之前重设状态...
    data.value = null
    error.value = null

    // unref() 解包可能为 ref 的值
    const urlValue = unref(url)

    fetch(urlValue)
      .then((res: Response) => res.json())
      .then(json => data.value = json)
      .catch((err) => error.value = err)
  }

  if (isRef(url))
    // 若输入的 URL 是一个 ref，那么启动一个响应式的请求
    watchEffect(doFetch)
  else
    // 否则只请求一次
    // 避免监听器的额外开销
    doFetch()

  return { data, error }
}