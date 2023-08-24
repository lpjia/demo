const timeout = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time);
  })
}
class SuperTask {
  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount // 并发数量
    this.tasks = [] // 队列, 排队队列
    this.runningCount = 0 // 正在执行的任务数量
  }

  add(task) {
    // 添加任务要加到队列里
    return new Promise((resolve, reject) => {
      /* 由于任务执行后, 完成状态(成功或失败)由其他函数来决定
      所以这时候要把task、resolve、reject一起push到队列里 */
      this.tasks.push({ task, resolve, reject })
      this._run()
    })
  }

  // 执行任务
  _run() {
    // 从队列里取task
    while (this.runningCount < this.parallelCount && this.tasks.length > 0) {
      const { task, resolve, reject } = this.tasks.shift()
      this.runningCount++
      task().then(resolve, reject).finally(() => {
        this.runningCount--
        this._run()
      })
    }
  }
}
const superTask = new SuperTask(3)
const addTask = (time, name) => {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`)
    })
}

/* 并发 */
addTask(10 * 1000, 1)
addTask(5 * 1000, 2)
addTask(3 * 1000, 3)
addTask(4 * 1000, 4)
addTask(5 * 1000, 5)

// addTask(1 * 1000, 1)
// addTask(1 * 1000, 2)
// addTask(1 * 1000, 3)
// addTask(1 * 1000, 4)
// addTask(1 * 1000, 5)
