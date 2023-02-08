// 作用域变为本地
export { }

interface DataItf {
  id: string
  name: string
}

interface ResItf {
  code: number
  // data: Array<DataItf> // 泛型写法
  data: DataItf[] // 简写
  // data: { id: string, name: string }[] // 复杂写法
  msg: string
}

const p = new Promise<ResItf>((resolve, reject) => {
  resolve({
    code: 200,
    data: [
      { id: 'aaa', name: 'a', },
      { id: 'bbb', name: 'b', },
      { id: 'ccc', name: 'c', },
    ],
    msg: '',
  })
})

p.then(res => {
  if (res.code === 200) {
    const nameList = res.data.map(item => item.name)
    console.log('nameList:', nameList)
  }
})