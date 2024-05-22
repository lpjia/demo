
# 类型系统

### JS与TS

JavaScript 语言（注意，不是 TypeScript）将值分成8种类型。

* boolean
* string
* number
* bigint
* symbol
* object
* undefined
* null

TypeScript 继承了 JavaScript 的类型设计，以上8种类型可以看作 TypeScript 的基本类型。

注意，上面所有类型的名称都是小写字母，首字母大写的`Number`、`String`、`Boolean`等在 JavaScript 语言中都是内置对象，而不是类型名称。

另外，undefined 和 null 既可以作为值，也可以作为类型，取决于在哪里使用它们。

这8种基本类型是 TypeScript 类型系统的基础，复杂类型由它们组合而成。


### 字面量类型 包装对象类型

``` javascript
'hello' // 字面量
new String('hello') // 包装对象
```

为了区分这两种情况，TypeScript 对五种原始类型分别提供了大写和小写两种类型。

* Boolean 和 boolean
* String 和 string
* Number 和 number
* BigInt 和 bigint
* Symbol 和 symbol

其中，大写类型同时包含包装对象和字面量两种情况，小写类型只包含字面量，不包含包装对象。

> 建议只使用小写类型，不使用大写类型。

``` typescript
const s1:String = 'hello'; // 正确
const s2:String = new String('hello'); // 正确

const s3:string = 'hello'; // 正确
const s4:string = new String('hello'); // 报错
```









# 类型范围

### 基本类型, 可以认为分作 宽类型、窄类型

顶层类型"top type", 底层类型"bottom type"

TypeScript 有两个“顶层类型”（any和unknown），但是“底层类型”只有never唯一一个

any、unknown类型范围很大, unknown类型更安全(推荐用)

never类型是所有类型的子类型


### 对象类型

对于对象类型
属性(成员)越多, 圈越大

成员多  多key类型  大圈类型
成员少  少key类型  小圈类型





# TS模块化

## TS中如何书写模块化语句

TS中, 导入和导出模块, 统一使用ES6的模块化标准

推荐使用具名导出, 编辑器会有智能提示, 而不用手写导入语句

导入时, 不要去加后缀名.ts, 因为编译后没有.ts文件

## 编译结果中的模块化

> 前端领域中的模块化标准: ES6、commonjs、amd、umd

可配置, 在tsconfig.json文件, 主要是compilerOptions

TS中的模块化在编译结果中:

- 如果编译结果的模块化标准是ES6: 没有区别
- 如果编译结果的模块化标准是commonjs: 具名的导出会变成 exports 的属性, 默认的导出会变成 exports 的 default 属性; 导入还是命名空间形式的用法 xxx.yyy, 默认导入是 xxx.default

> commonjs其实没有默认导出这个东西, 曲线救国, 加了 default 属性

### 可能遇到的问题: 默认导入报错

``` typescript
// main.ts
import fs from 'fs' // 报错, fs没有默认导出
fs.readFileSync('./')
```

### 编译结果

``` javascript
// main.js
const fs_1 = require("fs");
fs_1.default.readFileSync('./'); // 这明显有问题
```

原因: 编译结果的模块化标准是commonjs, 而 fs 的源码是 module.exports = {} 的语法, 非 exports.default, 编译结果中的 fs_1.default 就不对

### 怎么解决

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

## 如何在TS中书写commonjs模块化代码

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

### 在TS中书写commonjs模块化代码

导出: export = xxx

导入: import xxx = require('url')

### 总之一句话, 推荐ES模块语法, 毕竟是官方标准

## 模块解析

模块解析: 应该从什么位置寻找模块

TS中, 有两种模块解析策略

- classic: 经典

- node: node解析策略 (唯一的变化, 是将js替换为ts)

  - 相对路径
  - 非相对模块

建议项目中直接锁死为node解析, "moduleResolution": "node",


## tsconfig.json 配置项说明

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