'use strict';

var foo = 'Hello Rollup! foo.js';

function add(a, b) {
  return a + b;
}
console.log('math.js loaded!');

console.log(foo);

const result = add(1, 2);
console.log(`1 + 2 = ${result}`);

function greet() {
  console.log('Greeting from Rollup! main.js');
}

module.exports = greet;
