### popper的过渡效果

el-popover组件包裹其他组件, 添加过渡效果, 在el-popover加属性transition="abc", 值随便取, 然后写样式

#### style不加scoped

全局样式, 命名容易冲突, 样式覆盖

#### style加scoped

* popper是挂载在body下的, 和#app是兄弟关系, style加scoped的话, 生成的样式带属性哈希scope_id, 命中不到popper元素
* 如果使用样式穿透::v-deep, 那么生成的样式是父元素必须带属性哈希scope_id, 然而父元素是body, 显然不行
* 可以手动给popper元素加上属性哈希scope_id, 可以命中, 不是很优雅
* 做一个v-scoped自定义指令来优雅实现, 把this传进来, el.__vue__得到一个vue组件对象

#### 样式穿透和样式隔离

::v-deep
