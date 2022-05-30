{

  interface Person {
    name: string
    age: number
    gender: string
  }

  type P = keyof Person

  class Student {
    constructor(private info: Person) { }

    // 用值写
    getInfo_2(key: string) {
      if (key === 'name' || key === 'age' || key === 'gender')
        return this.info[key]
    }

    // 用类型写
    getInfo<T extends P>(key: T): Person[T] {
      return this.info[key]
    }
  }

  const student = new Student({
    name: 'uuuu',
    age: 20,
    gender: 'male'
  })
}