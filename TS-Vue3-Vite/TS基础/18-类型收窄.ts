export { }

// 类型保护


// instanceof
class CreateByClass1 {
  public age = 18
  constructor() { }
}

class CreateByClass2 {
  public name = 'TS'
  constructor() { }
}

function getRandomItem() {
  return Math.random() < .5
    ? new CreateByClass1()
    : new CreateByClass2()
}

const item = getRandomItem()

if (item instanceof CreateByClass1) {
  console.log(item.age)
} else {
  console.log(item.name)
}


// typeof
function studentId(x: string | number) {
  if (typeof x === 'string') {
    console.log('student')
  }
  if (typeof x === 'number') {
    console.log('id')
  }
}
studentId('446')
studentId(446)


// in
interface Person {
  firstName: string;
  surname: string;
}
interface Organisation {
  name: string;
}

type Contact = Person | Organisation

function sayHello(contact: Contact) {
  if ('firstName' in contact) {
    console.log(contact.surname)
  }
}


// in 类型收窄
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
    // (parameter) animal: Fish
  }

  return animal.fly();
  // (parameter) animal: Bird
}



// 看不懂这个
// 自定义类型保护
// 实现方式是定义一个函数，这个函数返回的类型是类型判断式
// 这个例子中，pet is Fish就是我们的类型判断式
// 一个类型判断式采用 parameterName is Type的形式，但 parameterName 必须是当前函数的参数名。
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

// 这里不知道怎么写这个方法, 先保证不报错
function getSmallPet(): Fish | Bird {
  return pet
}

let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim(); // let pet: Fish
} else {
  pet.fly(); // let pet: Bird
}


// 下面这个例子好理解
const valueList = [123.456, 'abcdefg']

const getRandomValue = () => {
  const num = Math.random() * 10 // Math.random()返回0-1, 但取不到1
  if (num < 5) return valueList[0]
  else return valueList[1]
}

function isString(val: number | string): val is string {
  return typeof val === 'string'
}

const randomVal = getRandomValue()

if (isString(randomVal)) console.log(randomVal.length)
else console.log(randomVal.toFixed())