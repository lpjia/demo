/* 分析, 连续取[], 说明类似于链式
[x]中, 最后的结果好像是x相加之和
数组可实现不了链式, 函数也不符合[x]
对象好像可以, 但是对象的key怎么定? 例子中好像是动态的属性
只能用代理来拦截 */

/* 代理对象, 不管读什么属性, 都走get
r1 = add[1]
r2 = r1[2]
r3 = r2[3]
所以返回也得是个代理, 才支持链式
对象 + 数字, 对象要转原始类型
Symbol.toPrimitive属性要返回一个函数, 是方法, 需要调用 */

function createProxy(v = 0) {
  const handler = () => v
  return new Proxy({}, {
    get(target, prop, receiver) {
      if (prop === Symbol.toPrimitive) {
        return handler
      }
      return createProxy(v + Number(prop))
    }
  })
}

const add = createProxy()

/* 实现add, 让下面代码成立 */
const r1 = add[1][2][3] + 4 // 10
const r2 = add[10][20] + 30 // 60
const r3 = add[100][200][300] + 60 // 660
console.log('r1:', r1)
console.log('r2:', r2)
console.log('r3:', r3)