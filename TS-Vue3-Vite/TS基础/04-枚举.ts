export { }

enum StatusCode {
  success = 200,
  serverError = 500,
  otherError = 400,
}

let code: number = 400
switch (code) {
  case StatusCode.success:
    console.log('成功')
    break;
  case StatusCode.serverError:
    console.log('失败, 服务器问题')
    break;
  case StatusCode.otherError:
    console.log('失败, 其他问题')
    break;
  default:
    break;
}

enum StatusCode2 {
  success,
  serverError = 500,
  otherError,
}
console.log(StatusCode2.success, StatusCode2.serverError, StatusCode2.otherError)