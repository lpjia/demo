{
  // 常规写, 很繁琐
  type CssPadding = 'padding-left' | 'padding-right' | 'padding-top' | 'padding-bottom'
  type MarginPadding = "margin-left" | "margin-right" | "margin-top" | "margin-bottom";

  // 减少重复工作
  type Direction = "left" | "right" | "top" | "bottom";

  type CssPadding_2 = `padding-${Direction}`;
  type MarginPadding_2 = `margin-${Direction}`;





  type EventName<T extends string> = `${T}Changed`
  type Concat<S1 extends string, S2 extends string> = `${S1}-${S2}`
  type ToString<T extends string | number | boolean | bigint> = `${T}`

  type T0 = EventName<'foo'>
  type T1 = Concat<'Hello', 'World'>
  type T2 = ToString<'爱家' | 666 | true | -123n>

  // 参数类型用联合类型
  type T3 = EventName<"foo" | "bar" | "baz">;
  type T4 = Concat<"top" | "bottom", "left" | "right">; // 拆开分别去算, 可以叫"叉积"






  // 配合使用处理字符串类型的内置工具类型
  type GetterName<T extends string> = `get${Capitalize<T>}`
  type Cases<T extends string, U extends string> = `${Uppercase<T>} ${Lowercase<U>} ${Capitalize<T>} ${Uncapitalize<U>}`

  type T5 = GetterName<'foo'>
  type T6 = Cases<'bar', 'BBQ'>




  // 配合使用类型推断
  type InferRoot<T> = T extends `${infer R}${Capitalize<Direction>}` ? R : T

  type T7 = InferRoot<'marginRight'>
  type T8 = InferRoot<'paddingLeft'>





  interface Person {
    name: string;
    age: number;
    location: string;
  }

  // 改变属性名称
  type FX_7<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
  }
  // 因为 keyof T 返回的类型可能会包含 symbol 类型，
  // 而 Capitalize 工具类型要求处理的类型需要是 string 类型的子类型，
  // 所以需要通过交叉运算符进行类型过滤。

  // 通过交叉把类型参数进行类型约束


  // Capitalize 意思是首字母大写
  // Uncapitalize 首字母小写

  // Uppercase 意思是全大写
  // Lowercase 全小写

  type LX_15 = FX_7<Person>


}



// 获取对象类型中，任意层级属性的类型。
type PropType<T, P extends string> = string extends P ?
  unknown :
  P extends keyof T ?
  T[P] :
  P extends `${infer K}.${infer R}` ?
  (K extends keyof T ? PropType<T[K], R> : unknown) :
  unknown;

declare function getPropValue<T, P extends string>(
  obj: T, path: P
): PropType<T, P>
// 放到上面括号内总是报错, 挪出来就不报错

const obj = {
  a: {
    b: {
      c: 666,
      d: "俺家"
    }
  }
};
let a = getPropValue(obj, "a"); // { b: {c: number, d: string } }
let ab = getPropValue(obj, "a.b"); // {c: number, d: string }
let abd = getPropValue(obj, "a.b.d"); // string