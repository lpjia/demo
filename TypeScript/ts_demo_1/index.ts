interface IPerson {
  readonly id: number,
  name: string
  [propName: string]: string | number
}

let tom: IPerson = {
  id: 89757,
  name: 'Tom',
  gender: 'male'
};



let fibonacci: number[] = [1, 1, 2, 3, 5];

let test: IPerson[] = [
  {
    id: 89757,
    name: 'Tom',
    gender: 'male'
  }
]


// 类数组
function sum() {
  let args: {
    [index: number]: number
    length: number
    callee: Function
  } = arguments

  let args2: IArguments = arguments
}



type Alias = { num: number }
interface Interface {
  num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;




type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'
class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    // ...
  }
}
let button = new UIElement()

