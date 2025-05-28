export { }
import type { ObjType } from './35-仅仅导入或导出类型'

/* 这个 try.ts 文件的优势是可以使用工具类型 ShowMe */

/* 此文件用来调试ts代码 */

let obj = {
  // name: '',
  // age: 10
}

interface User {
  name: string;
  age: number;
  open: boolean;
  lessons: {
    title: string;
  }[];
}
interface Todo {
  name: string
  like: boolean
}

type A = keyof (User | Todo)
type A2 = keyof User | keyof Todo


type A3 = keyof object
type A31 = keyof any
type A4 = Record<keyof any, any>


type B = Array<User>

type B2 = B[number]


const o: ObjType<string> = { name: 'ooo' }