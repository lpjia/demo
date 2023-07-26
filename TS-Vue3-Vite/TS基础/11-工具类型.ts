export { }

/* Partial 类型 */

interface PaItf {
  name: string
  age: number
}

// Partial 所有属性都设置为可选
let pa: Partial<PaItf> = {
  name: 'pa'
}
console.log(pa)

type KeyPaItf = keyof PaItf // 'name' | 'age'
let keyPaItf: KeyPaItf = 'name'
console.log(keyPaItf)





/* Required 类型 */

interface ReItf {
  name: string
  age?: number
  like?: boolean
}

// Required 所有属性都设置为必填
let re: Required<ReItf> = {
  name: 're',
  age: 33,
  like: false
}
console.log(re)






/* Readonly 类型 */

let re2: Readonly<ReItf> = {
  name: 're'
}
// 属性只读, 不能改
// re2.name = ''






/* Pick 类型 */

// 挑选出一些属性组成新的类型
let re3: Pick<ReItf, 'like'> = {
  like: false
}





/* Omit 类型, 排除某些key */

let res4: Omit<ReItf, 'age' | 'like'> = {
  name: 'res4'
}


/* -------------非内置工具类型---------------------------- */


/* Optional 类型, 把某些key变为可选 */

interface Article {
  title: string
  content: string
  author: string
  date: string
  readCount: number
}
type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>

type CreateArticleOptions = Optional<Article, 'author' | 'date' | 'readCount'>
function createArticle(options: CreateArticleOptions) {
  // options.
}