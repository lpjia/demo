<template>
  <div>
    <button @click="clk">count {{ count }}</button>
    <button @click="clk2">obj.num {{ obj.num }}</button>
    <button @click="clk3">cNum.val {{ cNum.val }}</button>
    <button @click="clk4">state.foo {{ state.foo }}</button>
    <hr>
    <button>占位置用</button>
    <button @click="clk5">num {{ num }}</button>
    <button @click="clk6">val {{ val }}</button>
    <span>fooRef {{ fooRef }}</span>
    <hr>
    <ChildApp :count="count2" />
    <button @click="count2++">add</button>
    <hr>
    <p>汽车信息: 一辆{{ car.brand }}车, 价值{{ car.price }}万</p>
    <p>汽车信息: 一辆{{ car2.brand }}车, 价值{{ car2.price }}万</p>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, toRef } from 'vue'
import ChildApp from "./02-ChildApp.vue";

/* 数据类型有8种, 7+1
7种基本数据类型
1种对象数据类型, 又叫复杂数据类型 */

/* 响应式数据如何定义?
基本数据, 必须用ref
复杂数据, 层级不深, 都可以
复杂数据, 层级较深, 推荐用reactive, 尤其是表单相关的 */

// ref 基本类型数据
const count = ref(0)
const clk = () => {
  count.value++
  console.log(count)
}


// reactive 对象类型数据
const obj = reactive({
  num: 100
})
const clk2 = () => {
  obj.num++
  console.log(obj)
}


// ref复杂数据时, 得记得写.value
const cNum = ref({
  val: 200
})
const clk3 = () => {
  cNum.value.val++
  console.log(cNum)
}


let car = reactive({
  brand: '某众',
  price: 30
})
let car2 = ref({
  brand: '某众',
  price: 30
})
setTimeout(() => {
  /* reactive定义的对象数据类型, 重新分配一个新对象, 会失去响应式
  常规可能是这样写 car = {brand: '某迪',  price: 10}
  可以用Object.assign去整体替换来保持响应式 */
  Object.assign(car, {
    brand: '某迪',
    price: 10
  })
  // ref定义的对象数据类型可以保持响应式
  car2.value = { brand: '某迪', price: 10 }
}, 3000);



/* toRefs解构reactive对象而保持响应式
看命名是变为ref的类型, 解构出的数据还需要.value的形式来操作 */
const { num } = toRefs(obj)
/* const { num } = obj // 直接解构则失去了响应式
原因: 上行代码等价于 const num = obj.num
定义num时, 把obj.num响应式数据的值给了num变量, 当obj.num变化时, num值就不会变化了, 所以失去了响应式 */
const clk5 = () => {
  num.value++ // 继续和obj.num保持响应式
  console.log(num)
}



// const { val } = toRefs(cNum.value)
const val = toRef(cNum.value, 'val')
const clk6 = () => {
  val.value++
}


// 作为对比, toRef()怎么用
const state = reactive({
  foo: 1,
  bar: 2
})
const fooRef = toRef(state, 'foo')
const clk4 = () => {
  // 都保持响应式
  fooRef.value++
  // state.foo++
}


// 最后一次谈响应式
const count2 = ref(0)
/* 响应式描述的是
函数与数据的关联, 不是数据与数据的关联
哪个函数与哪个数据的关联
1. 被监控的函数
    vue2中被Watcher监控的函数    vue3中被effect监控的函数
    上面是源码里的, 不清楚源码则看下面列举了4种
    render, 也可以说模板
    computed回调
    watchEffect
    watch
2. 函数运行期间用到了响应式数据
    一得是响应式数据, 二得在函数中用到(读到/写到)
    ref   reactive
    computed是ref, props是reactive
    
    响应式数据一定是对象类型, 原始类型不可能成为响应式数据, 原生js做不到的, vue也做不到
    如果自己封装的话, 传参一定要传整个props, 它才是响应式数据, 举例props.count是个原始值, 不是响应式数据
3. 响应式数据变化会导致函数重新运行 */

</script>

<style scoped lang="scss">
button,
span {
  background-color: deeppink;
  color: #fff;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
