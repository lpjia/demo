'use strict';

function Example(name) {
  // 当用new调用时, this instanceof Example === true
  if (!(this instanceof Example)) {
    throw new TypeError(`Class constructor Example cannot be invoked without 'new'`)
  }
  this.name = name
}

Object.defineProperty(Example.prototype, 'fn', {
  value: function () {
    // 看new调不调用, this指向的区别
    console.log('this:', this)
    // 不可通过new调用
    if (!(this instanceof Example)) {
      throw new TypeError(`example.fn is not a constructor`)
    }
    console.log(this.name)
  },
  enumerable: false
});

let example = new Example('构造函数创建的');
// let example = Example('构造函数创建的')
console.log(example)
example.fn()


for (const key in example) {
  console.log(key);
}


// let example2 = new example.fn()
let example2 = example.fn()
