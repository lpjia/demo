export function useFetch(url: string) {
  const data = ref(null)
  const error = ref(null as any)

  fetch(url)
    .then((res: Response) => res.json())
    .then(json => data.value = json)
    .catch((err) => error.value = err)

  return { data, error }
}