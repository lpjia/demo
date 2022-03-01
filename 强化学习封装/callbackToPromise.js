function request(url, callback) {
  console.log('url:', url)
  const res = 'res...'
  callback(res)
  return '这是 request() 返回的东西'
}

const req = request('localhost:8100/api/post', response => {
  console.log('response:', response)
  return response + '异步返回的数据'
})

console.log('req:', req)
console.log('---- 分割线 ----\n\n\n')



// 把异步回调转为 async await
const promise = new Promise((resolve, rejects) => {
  request('localhost:8100/api/post', response => {
    console.log('response2:', response)
    resolve(response + '异步返回的数据2')
  })
})
const need = await promise
console.log('need:', need)
console.log('---- 分割线 ----\n\n\n')