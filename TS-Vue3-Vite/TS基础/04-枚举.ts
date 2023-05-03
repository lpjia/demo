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

// 枚举可被遍历, 联合类型不能(当做值)被遍历
console.log(Object.values(StatusCode))
// console.log(Object.values(EnumToUnion)) // “EnumToUnion”仅表示类型，但在此处却作为值使用

enum StatusCode2 {
  success,
  serverError = 500,
  otherError,
}
console.log('StatusCode2 枚举值: ', StatusCode2.success, StatusCode2.serverError, StatusCode2.otherError)
console.log(StatusCode2[0], StatusCode2[1], StatusCode2[500])



// 抖音上看到的, 把枚举类型变为联合类型
type EnumToUnion = keyof (typeof StatusCode)
const enumToUnion: EnumToUnion = 'success'
// 不过这有什么用呢? 首先枚举自身用途是给一个映射集合, 可以双向映射
// 其次枚举一旦声明好, 里面的key可就是只读属性了(不支持程序去修改它的值)
// 一般是字符串枚举和数字枚举