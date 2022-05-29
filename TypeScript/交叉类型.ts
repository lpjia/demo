{
  interface JK {
    name: string
  }

  type LX = {
    age: number
  }

  // 交叉时, 类型结构得一致
  const bl: JK & LX = {
    name: 'jiaocha',
    age: 0
  }






  // 类型结构不一样, 交叉不了, 返回 never 类型
  type LX2 = string & number

  type LX3 = 'a' & 'b'





  type LX4 = {
    name: string,
  }

  type LX5 = {
    age: number,
    name: boolean
  }

  // name 属性无法交叉
  type JC = LX4 & LX5
  // 报错
  // const bl2: JC = {age:0,name:'jiaocha'}

  // 选取一部分来交叉
  type JC2 = LX4 & Pick<LX5, 'age'>

  const bl3: JC2 = {
    name: 'jiaocha',
    age: 3
  }

  type JC3 = Pick<LX4, 'name'> & Pick<LX5, 'age'>

  const bl4: JC3 = {
    name: 'jiaocha',
    age: 3
  }




  interface User {
    name: string,
    age: number
  }

  interface Member extends User {
    level: string,
  }

  const bl5: Member = {
    name: 'jlp',
    age: 29,
    level: 'VIP'
  }




  //  把 b 的所有属性都添加到 a 中
  function merge<T, U>(a: T & U, b: U): T & U {
    for (const k in b) {
      a[k] = b[k] as any
    }

    return a
  }






  type LH = string | number | boolean

  type LH2 = keyof any

  type LX6 = LH & LH2

}