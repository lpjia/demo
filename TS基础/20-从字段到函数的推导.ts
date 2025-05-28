export { }

/* type Watcher = {
  on(
    eventName: string,
    callback: (oldValue: any, newValue: any) => void
  ): void
} */

/* 想约束事件名为xxxChanged, 以实参的key来拼接
keyof T 返回的有 Symbol, 得用 string & 进一步约束 */

/* type Watcher<T> = {
  on(
    eventName: `${string & keyof T}Changed`,
    callback: (oldValue: any, newValue: any) => void
  ): void
} */

/* 想把callback的两个参的类型也约束为value的类型
T是整个对象, K是某个字段
on方法的泛型可以推导出来 */

type Watcher<T> = {
  on<K extends string & keyof T>(
    eventName: `${K}Changed`,
    callback: (oldValue: T[K], newValue: T[K]) => void
  ): void
}

/* declare function watch(obj: object): Watcher; */
declare function watch<T>(obj: T): Watcher<T>;

const personWatcher = watch({
  firstName: 'John',
  lastName: 'Doe',
  age: 26,
  birthday: new Date()
})

personWatcher.on(
  'birthdayChanged',
  (oldValue, newValue) => {

  }
)