function request(file) {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:7010/api/upload/single2')
  // 使用二进制流来上传文件, 不用fromdata
  xhr.setRequestHeader("Content-Type", 'application/octet-stream')
  xhr.setRequestHeader('X-Ext', '.' + file.name.split('.').pop())
  /* 加上该请求头后, koa2会报错, 原因是后端需要允许该请求头
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Ext'] */

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
  xhr.send(file);
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

/* 用koa2不知道怎么接收上传的文件(二进制格式, 不用fromdata) */