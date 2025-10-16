/* 链式调用, 关键点是返回自身
延迟执行, 关键点是把每个任务都弄成函数保存到一个数组中, 然后依次拿到调用 */

function arrange(name) {
  const tasks = []

  tasks.push(() => {
    console.log(`${name} is notified`)
  })

  function wait(time) {
    /* 要实现等待, 异步 */
    tasks.push(() => new Promise((resolve) => {
      setTimeout(resolve, time * 1_000);
    }))
    return this
  }
  function doSomething(taskName) {
    tasks.push(() => {
      console.log(`Start to ${taskName}`)
    })
    return this
  }
  function waitFirst(time) {
    tasks.unshift(() => new Promise((resolve) => {
      setTimeout(resolve, time * 1_000);
    }))
    return this
  }
  async function execute() {
    for (const task of tasks) {
      await task()
    }
    return this
  }

  return {
    wait,
    do: doSomething,
    waitFirst,
    execute,
  }
}

arrange('William')
  .wait(5)
  .do('commit')
  .waitFirst(3)
  .execute()

/* 等待3s
输出:William is notified
等待5s
输出:Start to commit */