export { }

/* 类型的 协变 逆变
也就是类型安全
保证成员始终可用


用少key类型 多key类型来理解, 简单记就是(对象类型)属性越多, 类型越窄


其实对于对象而言, 成员越多, 限制越多, 类型范围其实越窄
转变下思路
(对象类型)属性越多, 圈越大
子类型成员多, 圈越大
相当于TS说是JS的超集一样, TS能用的东西(成员)比JS多


跟以前记忆的说法对照
窄类型  多key类型  大圈类型  超集
宽类型  少key类型  小圈类型


理清 谁给 谁收 数据, 要求就是
给: 多key类型  窄类型  大圈类型
收: 少key类型  宽类型  小圈类型

变量, 比较的是值的类型范围
函数, 调用时, 比较的是参的类型范围、返回值的类型范围 */



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
// /* 报错, 小圈类型Fans的值不能赋值给大圈类型IKun的值
// 大圈类型IKun可用成员多, 超出小圈类型Fans
// 意思就是大圈类型的值有可能用到小圈类型没有的成员, 导致失去了类型安全
// 大圈类型IKun的成员, 小圈类型Fans没有 */
// let ikun: IKun = fans
// // fans没有dance成员, 访问dance成员会出错
// ikun.dance


/* 大圈类型的值可以赋值给小圈类型
小圈类型的成员一定可用
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
给: IKun 小圈类型
收: SuperIKun 大圈类型
不符合
type SubTransform = (x: SuperIKun) => SuperIKun // 报错 */


/* 再比较返回值的类型范围
函数调用时, 谁给, subTransform给, 给的是Fans类型
谁收, transform收, transform定义的返回值, 类型是IKun
给: Fans 小圈类型
收: IKun 大圈类型
不符合
type SubTransform = (x: Fans) => Fans // 报错 */

// transform()