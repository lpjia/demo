export { }


// 可以设置默认的类型, 但是后面不能再有非默认类型参数


// 泛型-类型别名
type ObjType<T, P> = {
  name: T,
  // getName(): P
  getName: () => P
}

let obj: ObjType<string, string> = {
  name: 'xj',
  getName() {
    return this.name
  },
}



// 泛型-接口
interface PersonItf<T, P = string> {
  name: T,
  getName: () => P
}

let obj2: PersonItf<string, string> = {
  name: 'xj',
  getName() {
    return this.name
  },
}


let obj3: PersonItf<string> = {
  name: 'xj',
  getName() {
    return this.name
  },
}