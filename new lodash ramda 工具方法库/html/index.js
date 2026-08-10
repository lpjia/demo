/* nil 
判断 null 或 undefined, 其它不是 */
// console.log(R.isNil(undefined)) // true
// console.log(_.isNil(undefined)) // true

// console.log(R.isNil(null)) // true
// console.log(_.isNil(null)) // true



/* R没有isNaN方法, 用Number.isNaN(v)就行 */
// console.log(_.isNaN(NaN)) // true
// console.log(Number.isNaN(NaN)) // true
// console.log(R.isEmpty(NaN)) // false



/* equals
深度比较相等, 结构一致的obj/arr也相等 */
// console.log(R.equals(1, 1)) // true
// console.log(R.equals(1, '1')) // false
// console.log(R.equals([1, 2, 3], [1, 2, 3])); // true

// /* 带循环依赖的对象也能比较 */
// const a = {}; a.v = a;
// const b = {}; b.v = b;
// console.log(R.equals(a, b)) // true



// /* 与R.isNil()功能不重叠 */
// console.log(R.isEmpty(null)) // false
// console.log(R.isEmpty(undefined)) // false


/* 空 数据, 有 '' 对象(泛指)  */
console.log(R.isEmpty('')) // true
console.log(R.isEmpty({})) // true
console.log(R.isEmpty([])) // true
console.log(R.isEmpty(new Object())) // true
console.log(R.isEmpty(new Array())) // true
console.log(R.isEmpty(new Map())) // true
console.log(R.isEmpty(new Set())) // true
console.log(R.isEmpty(Array(0).fill())) // true



/* 函数  Symbol  false  0
不为空 */
// console.log(R.isEmpty(()=>{})) // fasle
// console.log(R.isEmpty(Symbol(1))) // fasle
// console.log(R.isEmpty(false)) // false
// console.log(R.isEmpty(0)) // false













// 以下还没总结



// console.log('---- 分隔线 ----\n\n\n')
// console.log(R.is(Number, 123)) // true
// console.log(R.type([])) // 'Array'