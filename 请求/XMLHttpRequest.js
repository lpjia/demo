/* https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest */
const xhr = new XMLHttpRequest()
xhr.open('POST', 'http://localhost:7010/api/student')
xhr.setRequestHeader("Content-Type", 'application/json;charset=utf-8')

const data = {
  k111: 'v111',
  k222: 'v222',
}

xhr.responseType = 'json'
xhr.onreadystatechange = function () {
  console.log(xhr.readyState)
  console.log('XMLHttpRequest.DONE:', XMLHttpRequest.DONE)
  if (xhr.readyState === 4 && xhr.status === 200) {
    /* xhr.responseType默认值是'text' */
    // const res = JSON.parse(xhr.responseText)
    // console.log(
    //   xhr.responseText,
    //   typeof xhr.responseText,
    //   res
    // )

    /* xhr.responseType = 'json' */
    const res = xhr.response
    console.log(
      res
    )
  }
  else if (xhr.readyState === 4 && xhr.status !== 200) {
    console.log('err:', xhr.status)
  }
}
/* 请求体是string, obj结构得转成json字符串 */
xhr.send(JSON.stringify(data));