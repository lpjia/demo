import foo from './module/foo.js';
import { add } from './module/math.js';

console.log(foo);

const result = add(1, 2);
console.log(`1 + 2 = ${result}`);

export default function greet() {
  console.log('Greeting from Rollup! main.js');
}