{
  // 一、接口(interface)只能定义对象类型
  // 类型别名(type)可以定义基本类型、对象类型、联合类型、元组类型、映射类型、函数(方法)类型、泛型

  // 二、接口使用 extends 来扩展
  // 类型别名使用 & 来扩展
  // 可以相互扩展, 但注意用法

  // 三、同名接口会自动合并
  // 类型别名不能重名



  interface User {
    name: string,
    age: number,
    totalMoney: number
  }

  interface Member extends User {
    level: string,
    doIt: (count: number) => void,
    // doIt_2(count: number): void // 两种写法都可以
  }

  const bl: Member = {
    name: 'jlp',
    age: 29,
    totalMoney: 10000,
    level: 'VIP',
    doIt(totalMoney) {
      console.log(totalMoney)
    },
  }







  type User_2 = {
    name: string,
    age: number,
    totalMoney: number
  }

  // 多用类型别名来定义方法
  type Behavior = (count: number) => void

  type Member_2 = {
    level: string,
    doIt: Behavior,
  } & User_2
  // 方法不能和属性交叉, 下面就报错
  // type Member_2 = {
  //   level: string
  // } & User_2 & Behavior

  const bl_2: Member_2 = {
    name: 'jlp',
    age: 29,
    totalMoney: 10000,
    level: 'VIP',
    doIt(totalMoney) {
      console.log(totalMoney)
    }
  }




  // 类型别名继承接口
  type Member_3 = { level: string } & User

  const bl_3: Member_3 = {
    name: 'jlp',
    age: 29,
    totalMoney: 10000,
    level: 'VIP',
  }

  // 接口继承类型别名
  interface Member_4 extends User_2 {
    level: string
  }

  const bl_4: Member_4 = {
    name: 'jlp',
    age: 29,
    totalMoney: 10000,
    level: 'VIP',
  }








  interface Car {
    name: string,
    totalWheel: number,
    canDrive: boolean,
    drive: (totalWheel: number, canDrive: boolean) => void
  }

  interface Car {
    price: number,
    haveMaintain: boolean
  }
  // 重名接口合并, 同属性类型一致, 同方法类型也要一致

  const bl_5: Car = {
    name: 'mini',
    totalWheel: 4,
    price: 3_0000_0000.00,
    haveMaintain: true,
    canDrive: true,
    drive() {
      console.log(this.totalWheel)
    }
  }
}