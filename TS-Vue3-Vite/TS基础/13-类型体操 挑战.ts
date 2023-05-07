export { }

// https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md

{
  /* 实现 Pick */
  type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
  }

  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyPick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
  }
}



{
  /* 实现 Readonly */
  type MyReadonly<T> = {
    readonly [K in keyof T]: T[K]
  }
  interface Todo {
    title: string
    description: string
  }

  const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar"
  }

  // todo.title = "Hello" // Error: cannot reassign a readonly property
  // todo.description = "barFoo" // Error: cannot reassign a readonly property
}




{
  /* 元组转换为对象 */
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
  type TupleToObject<T extends readonly (keyof any)[]> = {
    [P in T[number]]: P
  }

  type result = TupleToObject<typeof tuple>
  // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
}
{
  // 需要总结, 熟悉元组
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
  type Params = typeof tuple
  type Item = typeof tuple[number]
}