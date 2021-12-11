class 人 {
  speak(words: string): void {
    console.log('speak()', words)
  }
}

const somebody = new 人()
somebody.speak('新人')
console.log('---- 分割线 ----\n')




class 看洋文的人 extends 人 {
  主张: string
  constructor() {
    super()
    this.主张 = '看洋文'
  }
  说洋话(): void {
    this.speak('洋话')
  }
}

const somebody2 = new 看洋文的人()
console.log(somebody2.主张)
somebody2.说洋话()
somebody2.speak('somebody2')
console.log('---- 分割线 ----\n')




class 洋奴 extends 看洋文的人 {
  人格破产: boolean
  constructor() {
    super()
    this.人格破产 = true
  }
}

const somebody3 = new 洋奴()
console.log(somebody3.人格破产)
console.log(somebody3.主张)
somebody3.说洋话()
somebody3.speak('somebody3')
console.log('---- 分割线 ----\n')




class 读洋书的人 extends 人 {
  主张: string
  constructor() {
    super()
    this.主张 = '读洋书'
  }
}

const somebody4 = new 读洋书的人()
console.log(somebody4.主张)
const somebody5 = new 读洋书的人() as 看洋文的人 as 洋奴
// as 类型断言会欺骗 TS 编译器
console.log(somebody5.主张)
console.log(somebody5.人格破产)
console.log('---- 分割线 ----\n')