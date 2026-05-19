/* 具名导入 */
import {
  count, increase,
  count2, increase2,
  o, increase3,
} from './2.mjs';



console.log('count:', count)
/* count在2.mjs是作为let导出的
但在1.mjs中, 具名导入是常量, 不可重新赋值, 会报错 */
// count++
// o = 2
increase() // 改动count的值
console.log('count:', count)
/* 不希望count在1.mjs中可变, 否则不可控
但改动成功, 故不推荐导出用let */

/* count2在2.mjs是作为const导出的, 不可变
increase2改动不了count2的值, 推荐 */
/* console.log('count2:', count2)
increase2()
console.log('count2:', count2) */


/* const 对象, 属性可随便更改, 目前不好限制 */
console.log('o.count3:', o.count3)
increase3()
console.log('o.count3:', o.count3)
// 不过也符合js的认知, const 对象, 对象的属性依然可变