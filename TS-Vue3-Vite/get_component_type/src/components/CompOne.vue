<template>
  <div>
    <ElForm ref="formRef"></ElForm>
  </div>
</template>

<script setup lang="ts">
import { ElForm } from 'element-plus';
import { ref } from 'vue';

/* 获取vue组件的类型
子组件ElForm */


// const formRef = ref()
// formRef.value // value的类型是any, 类型推断无效


// const formRef = ref<ElForm>() // 加上泛型<ElForm>报错, ElForm是值, 不是"类型", 泛型需要传入"类型"
// formRef.value // value的类型是any, 类型推断无效


// const formRef = ref<typeof ElForm>() // typeof ElForm是类型
// formRef.value.validate() // formRef.value报错, 可能为undefined, 再调方法有问题
// // formRef.value是联合类型(xxx | undefined)


// const formRef = ref<typeof ElForm>()
// formRef.value?.validate() // 加上可选链运算符?. , 解决可能为undefined的问题, 保证安全
// // validate的类型是any, 类型推断无效


const formRef = ref<InstanceType<typeof ElForm>>() // InstanceType是获取模板的实例的类型
formRef.value?.validate() // validate的类型正确


/* 类和实例
类可以看作是模板, 类也是构造函数, 构造函数是用来产生实例的模版
实例是通过 new 类() 来创建的
需要模版?还是需要实例? */

/* DefineComponent 定义 Vue 组件(上面是ElForm组件)时提供类型推导的辅助函数
注意返回值的类型有一点特别：它会是一个构造函数类型, 它的实例类型是根据选项推断出的组件实例类型。
typeof ElForm 返回的是构造函数类型, 也就是模板类型, 或者叫组件模版类型
InstanceType 返回实例类型

const Foo = defineComponent(xxx)
type FooInstance = InstanceType<typeof Foo>

https://cn.vuejs.org/api/general.html#definecomponent */


</script>

<style scoped></style>
