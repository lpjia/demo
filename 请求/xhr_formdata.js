function request(file) {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:7010/api/upload/single')
  /* 用formdata传文件时, 不要写这一行, 防止Boundary被覆盖, 浏览器需要Boundary
  浏览器发送请求时的默认Content-Type
  Content-Type: multipart/form-data; boundary=----WebKitFormBoundarynBD8INkQpRGnuh6T */
  // xhr.setRequestHeader("Content-Type", 'multipart/form-data')

  const formdata = new FormData()
  formdata.append('inputFile', file)

  xhr.responseType = 'json'
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const res = xhr.response  // 响应体
      console.log(res)
    }
    else if (xhr.readyState === 4 && xhr.status !== 200) {
      console.log('err:', xhr.status)
    }
  }
  xhr.send(formdata);
  return function () {
    xhr.abort() // 中止请求
  }
}
const domInputFile = document.querySelector('input[type=file]')
domInputFile.onchange = (e) => {
  console.log(e.target.files[0])
  const req = request(e.target.files[0])
  //  req.abort()
}