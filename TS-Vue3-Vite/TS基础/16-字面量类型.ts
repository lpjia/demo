export { }


// 字面量类型
// 应用场景是把多个字面量类型组合成一个联合类型, 用来描述拥有明确成员的集合
// 方便传参限制 智能代码提示
type Union = "success" | "serverError" | "otherError"
function fnc(p: Union) { }
fnc('success')
fnc('serverError')
fnc('otherError')





// 模版字面量类型
type Direction = 'left' | 'right' | 'top' | 'bottom'
type CssPadding = `padding-${Direction}`
type CssMargin = `margin-${Direction}`

// 从值提取类型
const fangxiang = 'left'
type CssPadding2 = `padding-${typeof fangxiang}`

// 模版字面量类型中的变量只允许是
// string number boolean bigint null undefined
// 或他们的联合类型




// TS自带处理字符串的一些实用方法 只接受一个字符串字面量类型作为参数
type FirstDaxie = Capitalize<'name'>
type FirstXiaoxie = Uncapitalize<'Number'>
type AllDaxie = Uppercase<'http'>
type AllXiaoxie = Lowercase<'XML'>


// 更复杂的场景 把两种类型组合形成驼峰命名的新类型
type Actions = 'add' | 'remove'
type Property = 'name' | 'phone' | 'address'
type Result = `${Actions}${Capitalize<Property>}`



// 推断 infer
type InferRoot<T> = T extends `${infer K}${Capitalize<Direction>}` ? K : T
// 模版字面量可以解构类型

type Result2 = InferRoot<'marginLeft'> // 推断出想要的结果
type Result3 = InferRoot<'color'> // 非想要的结果



// 将模版字面量串类型作为判别式 用于类型推导
interface Message {
  typ: string
  url: string
}
interface SuccessMessage extends Message {
  typ: `${string}Success`
  body: string
}
interface ErrorMessage extends Message {
  typ: `${string}Error`
  message: string
}
function handler(r: SuccessMessage | ErrorMessage) {
  if (r.typ === 'HttpSuccess') {
    let token = r.body
  }
}