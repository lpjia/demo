import { createChunk } from "./createChunk.js"

const CHUNK_SIZE = 5 * 1024 * 1024 // 5MB, 每个分片的大小
// 基础单位是字节, 1024是1KB, 再*1024是1MB

export async function cutFile(file) {
  const chunkCount = Math.ceil(file.size / CHUNK_SIZE) // 计算分片的数量
  const result = []
  for (let i = 0; i < chunkCount; i++) {
    const chunk = await createChunk(file, i, CHUNK_SIZE) // createChunk(file, 0, CHUNK_SIZE) // 返回1个分片信息
    result.push(chunk)
  }
  return result
}
