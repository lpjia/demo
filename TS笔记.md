# TS中如何书写模块化语句

TS中, 导入和导出模块, 统一使用ES6的模块化标准

推荐使用具名导出, 编辑器会有智能提示, 而不用手写导入语句

导入时, 不要去加后缀名.ts, 因为编译后没有.ts文件

# 编译结果中的模块化

> 前端领域中的模块化标准: ES6、commonjs、amd、umd

可配置, 在tsconfig.json文件, 主要是compilerOptions

TS中的模块化在编译结果中:

- 如果编译结果的模块化标准是ES6: 没有区别
- 如果编译结果的模块化标准是commonjs: 具名的导出会变成 exports 的属性, 默认的导出会变成 exports 的 default 属性; 导入还是命名空间形式的用法 xxx.yyy, 默认导入是 xxx.default

> commonjs其实没有默认导出这个东西, 曲线救国, 加了 default 属性

#### 可能遇到的问题: 默认导入报错

``` typescript
// main.ts
import fs from 'fs' // 报错, fs没有默认导出
fs.readFileSync('./')
```

#### 编译结果

``` javascript
// main.js
const fs_1 = require("fs");
fs_1.default.readFileSync('./'); // 这明显有问题
```

原因: 编译结果的模块化标准是commonjs, 而 fs 的源码是 module.exports = {} 的语法, 非 exports.default, 编译结果中的 fs_1.default 就不对

#### 怎么解决

``` typescript
// 方案一, 具名导入
// main.ts
import { readFileSync } from 'fs'
readFileSync('./')
```

``` typescript
// 方案二, 把所有导出统一重命名再导入
// main.ts
import * as fs from 'fs'
fs.readFileSync('./')
```

``` json
// 方案三, 改配置
// tsconfig.json
"esModuleInterop": true,
// 也就是编译后, 增加一个辅助函数, 给加一个 default 属性, 配合默认导入
```

# 如何在TS中书写commonjs模块化代码

``` typescript
// child.ts
module.exports = {
  name: 'child',
  fn() {
    console.log('执行fn')
    return 'fn'
  }
}
```

``` typescript
// main.ts
const c = require('./children/child')
```

上面两个代码写法, 编译结果和编译前代码一模一样, 但是ts中不推荐这样写法, 会丢失类型检查

一定要写的话, 得这样改语法

``` typescript
// child.ts
export = {
  name: 'child',
  fn() {
    console.log('执行fn')
    return 'fn'
  }
}
```

``` typescript
// main.ts
import c = require('./children/child')
// import c from "./children/child"; 得搭配上面改的配置, 否则报错
```

编译结果是常见的commonjs的语法, 也获得了类型检查

#### 在TS中书写commonjs模块化代码

导出: export = xxx

导入: import xxx = require('url')

#### 总之一句话, 推荐ES模块语法, 毕竟是官方标准

# 模块解析

模块解析: 应该从什么位置寻找模块

TS中, 有两种模块解析策略

- classic: 经典

- node: node解析策略 (唯一的变化, 是将js替换为ts)

  - 相对路径
  - 非相对模块

建议项目中直接锁死为node解析, "moduleResolution": "node",


# tsconfig.json 配置项说明

**compilerOptions**

|  子属性    | 含义 |
|  ---- | ----  |
| target | 编译后的js版本, 如ES3、ES5等 |
| module | 使用什么模块化标准来编译生成js |
| outDir | 编译后的文件目录 |
| removeComments | 编译结果移除注释 |
| noEmitOnError | 错误时不生成编译结果 |
| esModuleInterop | 启用es模块化交互 非es模块导出 |
| moduleResolution | 设置解析模块的模式 |


|  同级属性    | 值 | 含义 |
|  ---- | ----  | ---- |
| include | ["./src/**/*"] | 表示编译src目录下的所有ts文件 |
|   |  | **表示任意目录 |
|   |  | *表示任意文件 |
| exclude | 默认值 ["node_modules",   | 不需要被编译的文件目录 |
|   | "bower_componets", |  |
|   | "jspm_packages"] |  |
| extends | "./tsconfig.base.json" | 引入其他配置文件，继承配置 |
| files  | [单个ts文件] |  指定被编译的文件列表 |