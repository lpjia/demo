import { createChunk } from "./createChunk.js"

onmessage = async (e) => {
  const { file, start, end, CHUNK_SIZE } = e.data
  const result = []
  for (let i = start; i < end; i++) {
    const promise = createChunk(file, i, CHUNK_SIZE)
    result.push(promise)
  }
  const chunks = await Promise.all(result)
  postMessage(chunks)
}
