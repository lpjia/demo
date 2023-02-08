export { }

type StrOrNum = string | number

// T 约束在只能传 string | number, 不能传其他类型
interface PersonItf<T extends StrOrNum, P> {
  name: T,
  getName: () => P
}

let obj: PersonItf<string, string> = {
  name: 'xj',
  getName() {
    return this.name
  },
}