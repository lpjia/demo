export { }


// 交叉, 用于合并已经存在的对象类型
// 交叉时, 类型结构得一致
interface JcItf {
  name: string
}
interface Jc2Itf {
  age: number
}
// 用type
// 交叉类型&只能用type, 不能用interface
type JX = JcItf & Jc2Itf
const jx: JX = {
  name: 'jx',
  age: 18
}
// 用interface
// interface同样可以实现交叉类型的效果
interface Jc3Itf extends JcItf, Jc2Itf { }
const jx2: Jc3Itf = {
  name: 'jx',
  age: 18
}

// 类型结构不一样, 交叉不了, 返回 never 类型
type BaseJx = string & number
// 这两个数组类型交叉, 其实返回 never[]
type BaseJx2 = number[] & string[]
// 赋值时只能给空数组
const baseJx: BaseJx2 = []


interface Jc4Itf {
  name: string
}
interface Jc5Itf {
  age: number
  name: string | boolean // 交叉得到string
  // name: boolean // 交叉得到never
}
// 交叉, 同一属性取交集, 如果得到never, 则整个类型变为never
// 然后才是不同属性合并
type JX2 = Jc4Itf & Jc5Itf
const jx3: JX2 = {
  // name: false, // 报错
  name: 'a',
  age: 18
}

interface Jc6Itf {
  age: number
  name: boolean
}
// 选取一部分来交叉
type JX3 = Jc4Itf & Pick<Jc6Itf, 'age'>
const jx4: JX3 = {
  name: 'a',
  age: 18
}
// 可选属性?和不带?的同名属性, 交叉后-?, 也就是必填属性


// 联合类型交叉, 取交集
// A中每一项都要和B中每一项交叉
type UnionA = 'a' | 'b' | 'c' | 'd';
type UnionB = 'c' | 'd' | 'e' | 'f';
type UnionC = UnionA & UnionB