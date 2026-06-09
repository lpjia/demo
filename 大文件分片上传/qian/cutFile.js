const CHUNK_SIZE = 5 * 1024 * 1024 // 5MB, 每个分片的大小
// 基础单位是字节, 1024是1KB, 再*1024是1MB

const THREAD_COUNT = navigator.hardwareConcurrency || 4 // 获取当前设备的线程数

export function cutFile(file) {
  return new Promise((resolve) => {
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE) // 计算分片的数量
    const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT) // 计算每个线程处理的分片数量
    const result = [] // 存储每个线程处理的结果
    let finishCount = 0 // 完成任务的线程数量
    for (let i = 0; i < THREAD_COUNT; i++) {
      // 给每个线程分配任务
      const worker = new Worker('./worker.js', {
        type: 'module'
      })
      let start = i * threadChunkCount // 起始的分片下标
      let end = Math.min((i + 1) * threadChunkCount, chunkCount) // 结束的分片下标
      // 最后一个线程有可能分片数量不满, 所以取一个小值

      worker.postMessage({
        file,
        start,
        end,
        CHUNK_SIZE
      })
      worker.onmessage = (e) => {
        worker.terminate() // 终止当前线程
        result[i] = e.data // 接收每个线程处理的结果
        finishCount++
        if (finishCount === THREAD_COUNT) {
          resolve(result.flat()) // 把二维数组拍扁
        }
      }
    }
  })
}
