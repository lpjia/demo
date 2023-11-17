/* 文件上传 FormData 原生js
https://developer.mozilla.org/zh-CN/docs/Web/API/FormData */

// FormData在nodejs的v18才支持
const formData = new FormData()

const fileObj = {} // 模拟文件对象

// 插入一个键值对
formData.append('name', 'hehe.txt')
formData.append('file', fileObj)
formData.append('size', 1024)

for (const [k, v] of formData) { // params.entries() 效果一样
  console.log(k, v)
}

console.log(
  formData,

  /* 返回一个迭代器 */
  formData.entries()
)

/* 这里只考虑文件上传
如果是原生form通过手动ajax的话, 搜
new FormData(doms.form) */