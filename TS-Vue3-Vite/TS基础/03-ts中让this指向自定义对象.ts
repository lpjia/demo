export { }

type ObjType = {
  myName: string
  person: (n: string) => void
}

let obj: ObjType = {
  myName: 'xiongda',
  person: () => { }
}

// 声明函数时, this的类型, 必须和调用时的类型一致
// this: ObjType | Window, 可以给多种类型所对应的对象, 让this去指向
// this指向联合类型写法
// function person(this: ObjType | Window, name: string) {

function person(this: ObjType, name: string) {
  this.myName = name
}

obj.person = person
obj.person('b')
console.log('obj:', obj)

// this指向联合类型写法
// window.person = person
// window.person('a')