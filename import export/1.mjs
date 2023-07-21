import {
  count, increase,
  count2, increase2,
  o, increase3,
} from './2.mjs';
console.log('count:', count)
/* count在1.mjs是常量 */
// count++
increase()
console.log('count:', count)


console.log('count2:', count2)
/* count2在2.mjs是常量, 不可变 */
// increase2()
console.log('count2:', count2)


console.log('o.count3:', o.count3)
increase3()
console.log('o.count3:', o.count3)
// 不过也符合js的认知, const 对象, 对象的属性依然可变