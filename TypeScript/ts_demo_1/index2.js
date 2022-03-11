class Animal {
  typee = 'animal'

  constructor() {
    this.father = '动物'
  }
}

class Cat extends Animal {
  typee = 'cat'

  constructor() {
    super()
    this.name = '猫'
  }

  eat() {
    console.log('猫吃鱼')
  }
}

class Dog extends Animal {
  typee = 'dog'

  constructor() {
    super()
    this.name = '狗'
  }

  eat() {
    console.log('狗吃鱼')
  }
}


let a = new Animal()
console.log('a:', a)
let b = new Cat()
console.log('b:', b)
