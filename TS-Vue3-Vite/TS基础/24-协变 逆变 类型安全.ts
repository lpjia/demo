export { }

/* 类型的 协变 逆变
也就是类型安全
保证成员始终可用

理清谁给 谁收 数据, 要求就是
给: 窄类型
收: 宽类型

变量, 比较的是值的类型范围
函数, 调用时, 比较的是参的类型范围、返回值的类型范围 */


/* 用宽类型 窄类型来理解, 简单记就是(对象类型)属性越多, 类型越窄
子类型相比较父, 肯定是窄类型
子类型 -> 窄类型 */


interface Fans {
  call: any
}

interface IKun extends Fans {
  sing: any;
  dance: any;
  backetball: any;
}

interface SuperIKun extends IKun {
  rap: any
}


// let fans: Fans = {
//   call: ''
// }
// /* 报错, 宽类型Fans的值不能赋值给窄类型IKun的值
// 失去了类型安全
// 窄类型IKun的成员, 宽类型Fans没有 */
// let ikun: IKun = fans
// // 没有dance成员, 访问dance成员会出错
// ikun.dance


/* 窄类型的值可以赋值给宽类型
保证类型安全 */
let ikun: IKun = {
  sing: '',
  dance: '',
  backetball: '',
  call: '',
}
let fans: Fans = ikun
fans.call


type Transform = (x: IKun) => IKun
// type SubTransform = (x: SuperIKun) => SuperIKun // 报错
type SubTransform = (x: Fans) => SuperIKun // 不报错
// type SubTransform = (x: Fans) => Fans // 报错
const subTransform: SubTransform = (x) => {
  return x as any
}
const transform: Transform = subTransform
/* 比较参的类型范围
函数调用时, transform定义的参x, 类型是IKun, 谁给, transform给, 给的是IKun类型
谁收, subTransform收, subTransform定义的参x, 类型是SuperIKun
给: IKun 宽类型
收: SuperIKun 窄类型
不符合
type SubTransform = (x: SuperIKun) => SuperIKun // 报错 */


/* 再比较返回值的类型范围
函数调用时, 谁给, subTransform给, 给的是Fans类型
谁收, transform收, transform定义的返回值, 类型是IKun
给: Fans 宽类型
收: IKun 窄类型
不符合
type SubTransform = (x: Fans) => Fans // 报错 */

// transform()