## script_setup语法糖引发的问题

script_setup确实是语法糖, 跟setup()的区别是, 它默认调用了expose()


## 问题

### 为什么这样做?

保证单向数据流

ref

喜欢用$refs.xxx.data = 3 来改动数据

改动数据会打破单向数据流

defineExpose 手动暴露, 是个宏, 运行时, 压根不存在, 所以不用导入

### 模板的数据来源

没有暴露到组件实例上

看render函数, 通过$setup传进来参拿到数据, 没有从组件实例上拿

