export { }

// brand 品牌
interface CarItf {
  name: string
  brand: string
}

// 类型操作符
// keyof 获取的是联合类型
type CarKeys = keyof CarItf // 'name' | 'brand' 都是常量
let car: CarKeys = 'brand' // 常量的值只能是它本身
console.log(car)


// 怎么写任意字符串? 不局限于上面的两个key
interface Car2Itf {
  [p: string]: string
}
type Car2Keys = keyof Car2Itf
let car2: Car2Keys = 'xxx'
console.log(car2)

type StrOrNum = Car2Keys
type P = {
  [k in StrOrNum]: boolean
}
let p: P = {
  aaa: true,
  0: false
}
console.log(p)





// 类型操作符
// typeof 获取值的类型
type CarTypeof = typeof car // 常量的typeof还是常量
type Car2Typeof = typeof car2 // 变量的typeof是正确的类型

let car_: CarTypeof = 'brand'
let car2_: Car2Typeof = 'xyz'

// 提取对象的类型
let car3 = {
  name: '轿车',
  brand: '比亚迪'
}
type Car3Typeof = typeof car3
let car4: Car3Typeof = {
  name: 'SUV',
  brand: '吉利'
}