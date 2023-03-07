function main() {
  console.log('main')
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(111)
    }, 2000); // 等待
  })
    .then(res => console.log(res));
  throw promise // 这里抛出的promise是pending状态
}

function run(fn) {
  try {
    fn()
  } catch (error) {
    console.log('error:', error)
  }
  console.log('try catch 之后执行的代码, 是会继续执行的')
}

run(main)