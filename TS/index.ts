let leng: number = 10000 * 1000 * 4;
console.log(leng);
let arrR: number[] = [];
arrR.length = leng;
console.time("计时器");
for (let i = 0; i < leng; i++) {
  arrR[i] = i;
}
console.timeEnd("计时器");

let arrR_: number[] = [];
console.time("计时器2");
for (let i = 0; i < leng; i++) {
  arrR_.push(i);
}
console.timeEnd("计时器2");

let isDone: boolean = false;
let myName: string = "Tom";
let myAge: number = 25;

function log(): void {
  console.log("My name is Tom");
  // 要么无返回, 要么返回 undefined
  return undefined;
}
// log()

let a: undefined = undefined;
// console.log(a)
let b: null = null;
// console.log(b)
let d: string | undefined = undefined;
// let d: string = undefined
// console.log(d)

let g: any = "hello";
// console.log(g.length)
g = "one";
// console.log(g)

let c;
c = "one";
// console.log(typeof c)
c = 1;
// console.log(typeof c)

function e(params: string | number): string {
  return params.toString();
}
// console.log(e(111))

let h: string | number;
h = "three";
// console.log(h.length)
h = 10;
// console.log(h.toString())
// console.log(h)

interface IPerson {
  readonly id: number;
  age: number;
  name: string;
  isMan?: boolean;
  hasMoney?: boolean;
  [propName: string]: number | boolean | string | undefined;
}

let tom: IPerson = {
  id: 8984,
  age: 25,
  name: "Tom",
  isMan: true,
  haha: "123",
};
// console.log(tom.id)

function sum() {
  // let args: number[] = arguments
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}

let fib3: string[] = ["1", "1", "2", "3", "5"];
// console.log(fib3)

let list: any[] = [1, "1", 2, "3", 5];
// console.log(list)

let hi = (name: any): string => `Hi ${name}`;
const greeting = hi;
// console.log(greeting('haha'))

let mySum = function (x: number, y: number): number {
  return x + y;
};
// console.log(mySum(1, 2))

let fib: number[] = [1, 1, 2, 3, 5, 8];

interface INumArr {
  [index: number]: string;
}
let fib2: INumArr = ["1", "1"];

let fib6: Array<number> = [1, 1, 2, 3, 5, 8];

let arr: any = [1, "1", 2];

// function sum100(x, y) {
//   return x + y
// }
// let sum3 = (x, y) => x + y

// let sum2 = function (x, y) {
//   return x + y
// }

function sum4(x: number, y: number): number {
  return x + y;
}

let sum5 = function (x: number, y: number): number {
  return x + y;
};

let sum6: (x: number, y: number) => number = function (
  x: number,
  y: number,
): number {
  return x + y;
};

interface IFc {
  (a: string, b: string): boolean;
}
let fc: IFc = function (a: string, b: string): boolean {
  return a.search(b) !== -1;
};
let fc4: IFc = (a: string, b: string): boolean => a.search(b) !== -1;
// console.log(fc('string', 'i'))
// console.log(fc4('number', 'm'))

function buildName(firstName: string = "hello", lastName: string = "James") {
  return lastName ? `${firstName} ${lastName}` : `${firstName}`;
}
// console.log(buildName('Tom',))
// console.log(buildName('Tom2', undefined))
// console.log(buildName(undefined, 'Cat'))

let fc2: (a: string, b: string, c: string, ...items: string[]) => string =
  function (
    a: string = "1",
    b: string = "2",
    c: string = "3",
    ...items: string[]
  ) {
    return a + b + c + items.length;
  };
// console.log(fc2('11', '22', '33', '44', '55', '66', '77', '88', '99'))
// let fc3: (a?: string, b?: string, c?: string, ...items: string[]) => string = (
//   a: string = "1",
//   b: string = "2",
//   c: string = "3",
//   ...items: string[]
// ) => a + b + c;
let fc3: (a?: string, b?: string, c?: string, ...items: string[]) => string = (
  a: string | undefined,
  b: string = "2",
  c: string = "3",
  ...items: string[]
) => b + c;
// console.log(fc3('11'))

function cz(x: number): number;
function cz(x: string): string;
function cz(x: number | string): number | string | void {
  return typeof x === "number"
    ? +x.toString().split("").reverse().join("")
    : typeof x === "string"
    ? x.split("").reverse().join("")
    : "";
}
// console.log(cz(12345))
// console.log(cz('6789'))

interface ICat {
  name: string;
  run(): void;
}

interface IFish {
  name: string;
  swim(): void;
}

function getName(animal: ICat | IFish) {
  return animal.name;
}

function isFish(animal: ICat | IFish) {
  return typeof (animal as IFish).swim === "function";
}

let tom2: [string, number] = ["TOM2", 22];
// console.log(tom2[0].slice(2))

let tom3: number[] = [1];
let tom4: [number, string] = [1, "2"];
tom4.push(3);
// console.log(tom4)

enum mj {
  "zero",
  "one",
  "two",
  "three",
}
enum mjEnum {
  "zero" = 10,
  "one",
  "two",
  "three",
}
// console.log(mj[1])
// console.log(mjEnum[12])
// console.log(mjEnum['three'])

enum colorEnum {
  Red,
  Green,
  Blue = "blue".length,
}
// console.log(colorEnum['Blue'])

const enum direEnum {
  up,
  down,
  left,
  right,
}
let direction = [direEnum.up, direEnum.down, direEnum.left, direEnum.right];
// console.log(direEnum['left'])
// console.log(direction[3])

// declare enum dire2Enum { up, down, left, right }
// let direction2 = [dire2Enum.up, dire2Enum.down, dire2Enum.left, dire2Enum.right]

class Animal {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }

  sayHi() {
    return `my name is ${this.name}`;
  }
}
let aa = new Animal("1");
// console.log(people.sayHi())

class Cat extends Animal {
  constructor(name: string) {
    super(name);
    // console.log(this.name)
  }

  sayHi() {
    return `whool! ${super.sayHi()}`;
  }

  say() {
    return `${super.sayHi()}`;
  }
}
let cc = new Cat("2");
// console.log(c.sayHi())
// console.log(c.say())

class Animal2 {
  constructor(name: string) {
    this.name = name;
  }

  get name() {
    return "jack";
  }

  set name(val) {
    console.log("setter: " + val);
  }
}
// let a2 = new Animal2('2')
// a2.name = '22'
// console.log(a2.name)

class Animal3 {
  name = "jjj";

  constructor() {
  }
}
let a3 = new Animal3();
// console.log(a3.name)

class Animal4 {
  static num = 44;

  constructor() {
  }
}
// console.log(Animal4.num)
// console.log(Animal.name)
// console.log(Animal2.name)
// console.log(Animal3.name)
// console.log(Animal4.name)

class Animal5 {
  public name: string;
  public constructor(name: string) {
    this.name = name;
  }
}
let a5 = new Animal5("555");
// console.log(a5.name)
a5.name = "a55";
// console.log(a5.name)

class Animal6 {
  private name: string;
  public constructor(name: string) {
    this.name = name;
  }
}
let a6 = new Animal6("6");
// console.log(a6.name)
// a6.name = '7'

class Animal7 {
  private name: string;
  public constructor(name: string) {
    this.name = name;
  }
}
class Cat2 extends Animal7 {
  constructor(name: string) {
    super(name);
    // console.log(this.name)
  }
}

class Animal8 {
  protected name: string;
  public constructor(name: string) {
    this.name = name;
  }
}
class Cat3 extends Animal8 {
  constructor(name: string) {
    super(name);
    console.log(this.name);
  }
}

class Animal9 {
  public name: string;
  private constructor(name: string) {
    this.name = name;
  }
}
// class Cat4 extends Animal9 {
//   constructor(name: string) {
//     super(name)
//   }
// }
// let a9 = new Animal9(1)

class Animal10 {
  public name: string;
  protected constructor(name: string) {
    this.name = name;
  }
}
class Cat5 extends Animal10 {
  constructor(name: string) {
    super(name);
  }
}
// let a10 = new Animal10('10')

class Animal11 {
  // public name:sting
  public constructor(public name: string) {
    // this.name = name
  }
}

class Animal12 {
  readonly name: string;
  public constructor(name: string) {
    this.name = name;
  }
}
let a12 = new Animal12("12");
// console.log(a12.name)
// a12.name = 1

class Animal13 {
  // public readonly name:sting
  public constructor(public readonly name: string) {
    // this.name = name
  }
}

class Animal14 {
  constructor(readonly num: number) {}
}
// console.log(new Animal14(0).num)
class Cat6 extends Animal14 {
  constructor(readonly num: number) {
    super(num);
  }
}
// console.log(new Cat6(1).num)

abstract class Animal_15 {
  public name: string;
  public constructor(name: string) {
    this.name = name;
  }
  public abstract sayHi(): void;
}
class Cat7 extends Animal_15 {
  public sayHi() {
    console.log(`whool! your name is ${this.name}`);
  }
}
// console.log(new Cat7('77').name)

interface IAlarm {
  alert(): void;
}
interface ILight {
  lightOn(): void;
  lightOff(): void;
}
interface ILightAlarm extends IAlarm, ILight {}
class Door {}
class SecurityDoor extends Door implements IAlarm {
  alert() {
    console.log("防盗门的 alert");
  }
}
class Car implements IAlarm, ILight {
  alert() {
    console.log("车的 alert");
  }
  lightOn() {
    console.log("车开灯");
  }
  lightOff() {
    console.log("车关灯");
  }
}
class Car2 implements ILightAlarm {
  alert() {
    console.log("车的 alert");
  }
  lightOn() {
    console.log("车开灯");
  }
  lightOff() {
    console.log("车关灯");
  }
}
// console.log(new SecurityDoor().alert())
// console.log(new Car().alert())
// console.log(new Car().lightOn())
// console.log(new Car().lightOff())
// console.log(new Car2().alert())
// console.log(new Car2().lightOn())
// console.log(new Car2().lightOff())

class Point {
  // x: number
  // y: number
  // 有修饰符等同于类中定义该属性同时给该属性赋值
  constructor(public x: number, public y: number) {
    // this.x = x
    // this.y = y
  }
}
let point2 = new Point(11, 22); // 类一般是这样用的
// console.log(point2.x)

let point3: Point = { // 类能当做类型用
  x: 11,
  y: 22,
};
// console.log(point3.y)

interface PointInstanceType {
  x: number;
  y: number;
}
// 等价于 interface IPoint extends PointInstanceType
interface IPoint extends Point { // 所以「接口继承类」和「接口继承接口」没有什么本质的区别。
  z: number;
  str: string;
}
let point: IPoint = { // 接口
  x: 1,
  y: 2,
  z: 3,
  str: "strstr",
};
// console.log(point.x)
// console.log(point.y)
// console.log(point.z)
// console.log(point.str)

let fib4: Array<number> = [1, 1, 2, 3, 5];
let fib5: number[] = [1, 1, 2, 3, 5];
// 泛型
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
// console.log(createArray<string>(2, 'x'))
// console.log(createArray(3, 2))
// console.log(createArray(4, true))

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}
// console.log(swap([undefined, null]))

interface ILengthwise {
  length: number;
}
function loggingIdentity<T extends ILengthwise>(arg: T): T {
  // console.log(arg.length)
  return arg;
}
// console.log(loggingIdentity('1'))

interface ISearchFc {
  (source: string, subString: string): boolean;
}
let mySearch: ISearchFc = function (source: string, subString: string) {
  return source.search(subString) !== -1;
};

interface ICreateArrayFc {
  <T>(length: number, value: T): Array<T>;
}
let createArray2: ICreateArrayFc = function <T>(
  length: number,
  value: T,
): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
};
// console.log(createArray2(5, 'x'))
interface ICreateArrayFc2<T> {
  (length: number, value: T): Array<T>;
}
let createArray3: ICreateArrayFc2<any> = function <T>(
  length: number,
  value: T,
): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
};
// console.log(createArray3(6, 'y'))

function iden(value: number): number {
  return value;
}
let iden2: (value: number) => number = (value: number) => value;
// console.log(iden(321))
// console.log(iden2(123))
function iden3<T>(value: T): T {
  return value;
}
let iden4: <T>(value: T) => T = <T>(value: T): T => value;
// console.log(iden3<string>('hehe'))
// console.log(iden4<boolean>(true))
function iden5<T, U>(value: T, msg: U): T {
  console.log(msg);
  return value;
}
let iden6: <T, U>(value: T, msg: U) => T = <T, U>(value: T, msg: U): T => value;
// console.log(iden5<number, undefined>(10, undefined))
// console.log(iden6<boolean, string>(false, 'haha'))

interface Identities<V, M> {
  value: V;
  message: M;
}
function identity<T, U>(value: T, message: U): Identities<T, U> {
  console.log(value + ": " + typeof (value));
  console.log(message + ": " + typeof (message));
  let identities: Identities<T, U> = {
    value,
    message,
  };
  return identities;
}
// console.log(identity<number, string>(68, "Semlinker"));

interface IAlarm2 {
  price: number;
  alert(s: string): string;
}
interface IAlarm2 {
  weight: number;
  alert(s: string, n: number): string;
}
// let a2: IAlarm2 = {
//   price: 10,
//   weight: 20,
//   alert(params: string, num: number): string {
//     return params
//   }
// }
