export { }

/* Partial类型 */

interface PaItf {
  name: string
  age: number
}

// Partial
// 所有属性都设置为可选
let pa: Partial<PaItf> = {
  name: 'pa'
}
console.log(pa)

type KeyPaItf = keyof PaItf // 'name' | 'age'
let keyPaItf: KeyPaItf = 'age'
console.log(keyPaItf)





/* Required类型 */

interface ReItf {
  name: string
  age?: number
  like?: boolean
}

// Required
// 所有属性都设置为必填
let re: Required<ReItf> = {
  name: 're',
  age: 33,
  like: false
}
console.log(re)







/* Readonly类型 */

let re2: Readonly<ReItf> = {
  name: 're'
}
// 属性只读, 不能改
// re2.name = ''







/* Pick类型 */

// 挑选出一些属性组成新的类型
let re3: Pick<ReItf, 'like'> = {
  like: false
}
