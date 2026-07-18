'use strict';

// 由 rollup-plugin-my-log 自动添加
console.log("Hello Rollup Plugin!");
var foo = 'Hello Rollup! foo.js';

// 由 rollup-plugin-my-log 自动添加
console.log("Hello Rollup Plugin!");
function add(a, b) {
  return a + b;
}
console.log('math.js loaded!');

// 由 rollup-plugin-my-log 自动添加
console.log("Hello Rollup Plugin!");

console.log(foo);

const result = add(1, 2);
console.log(`1 + 2 = ${result}`);

function greet() {
  console.log('Greeting from Rollup! main.js');
}

module.exports = greet;
