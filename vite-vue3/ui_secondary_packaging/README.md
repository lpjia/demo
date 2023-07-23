## ui组件的二次封装

以element-plus为例

### 属性和事件怎么传递?

v-bind="$attrs"全部接收

### 插槽怎么传递?

遍历$slots, k就是插槽名

### ref获取子组件, 怎么传递?