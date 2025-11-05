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


// in 类型收缩
type Fish = {
  swim: () => void
};
type Bird = {
  fly: () => void
};

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
    // (parameter) animal: Fish
  }

  return animal.fly();
  // (parameter) animal: Bird
}




/* satisfies 操作符（在 TypeScript 4.9 中引入）主要用于校验一个值是否符合某个类型，
  但同时保留该值的原始具体类型（而非被 “断言” 成目标类型）。
  它解决了 “类型断言（as）会丢失具体类型信息” 的问题，兼顾了类型校验和类型精确性
*/

/* 和as对比
我知道它是什么类型，强制转换 */
type UserConfig = {
  theme: "light" | "dark";
  settings: {
    [key: string]: boolean | number
  };
};

const config = {
  theme: "system",
  abc: {
    fontSize: 'sixteen'
  },
} as unknown as UserConfig;


// 对比 satisfies
const config2 = {
  theme: "dark",
  settings: {
    notifications: true,
    fontSize: 16,
  },
} satisfies UserConfig;


// satisfies可以和as const结合
const config3 = {
  theme: "dark",
  settings: {
    notifications: true,
    fontSize: 16,
  },
} as const satisfies UserConfig;










/* 自定义类型保护
实现方式是定义一个函数，这个函数返回的类型是类型判断式
这个例子中，pet is Fish就是我们的类型判断式
一个类型判断式采用 parameterName is Type的形式，但 parameterName 必须是当前函数的参数名。 */

// 感觉很鸡肋, 先定义一个isX函数, 返回T/F
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

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
  if (num < 5) {
    return valueList[0]
  }
  else {
    return valueList[1]
  }
}

function isString(val: number | string): val is string {
  return typeof val === 'string'
}

const randomVal = getRandomValue()

if (isString(randomVal)) {
  console.log(randomVal.length)
}
else {
  console.log(randomVal.toFixed())
}