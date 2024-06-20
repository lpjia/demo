async function asy1() {
  console.log(1)
  await asy2()
  console.log(2)
}

const asy2 = async () => {
  // // 第一组
  // await setTimeout(() => {
  //   Promise.resolve().then(() => {
  //     console.log(3)
  //   })
  //   console.log(4)
  // }, 0);
  // // 相当于await timerID
  // // 相当于await Promise.resolve(timerID)
  // // await下 没有代码了, asy2马上就要完成了
  // // 有await, 在微队列里完成asy2

  // // 第二组
  // await (async () => {
  //   await (() => {
  //     console.log(3)
  //   })()
  //   // await右是同步代码, 执行输出3
  //   // 相当于await undefined
  //   // 相当于await Promise.resolve(undefined)
  //   console.log(4)
  //   // await下的代码会被放入微队列去执行, 将输出4推入微队列
  // })()
  // // await右是同步代码, await下 没有代码了

  // // 第三组
  // await (async () => {
  //   Promise.resolve().then(() => {
  //     console.log(3)
  //   })
  //   console.log(4)
  // })()
  // // 将'完成asy2'推入微队列

  // // 第四组
  // await Promise.resolve().then(() => {
  //   // 做个标记, 函数一
  //   Promise.resolve().then(() => {
  //     console.log(3)
  //   })
  //   console.log(4)
  // })
  // console.log(5)
}

const asy3 = async () => {
  Promise.resolve().then(() => {
    console.log(6)
  })
}

asy1()
console.log(7)
asy3()