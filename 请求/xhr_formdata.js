function request(file) {
  const xhr = new XMLHttpRequest()
  const url = 'http://localhost:7010/api/upload/single'
  xhr.open('POST', url)

  /* 用FormData传文件时, 不要写这一行, 防止Boundary被覆盖, 浏览器需要Boundary
    xhr.setRequestHeader("Content-Type", 'multipart/form-data')

    浏览器发送请求时的默认Content-Type, 会自动加上 multipart/form-data
    Content-Type: multipart/form-data; boundary=----WebKitFormBoundarynBD8INkQpRGnuh6T
  */

  const formData = new FormData()
  formData.append('inputFile', file)

  xhr.upload.onprogress = (e) => {
    const percent = Math.floor((e.loaded / e.total) * 100);
    console.log('percent:', percent)
  };
  xhr.send(formData); // 文件以二进制的形式传给后台
  return () => xhr.abort() // 中止请求
}

document.querySelector('input[type=file]').onchange = (e) => {
  const file = e.target.files[0]
  console.log(file)
  /* 显示预览图 */
  const reader = new FileReader();
  reader.onload = (e) => {
    // 读取完成
    document.querySelector('img').src = e.target.result;
    const reqAbort = request(file)

    // setTimeout(() => {
    //   reqAbort() // 中止请求
    // }, 2000);

  };
  reader.readAsDataURL(file); // 将文件数据读取为 DataURL（base64编码）
}