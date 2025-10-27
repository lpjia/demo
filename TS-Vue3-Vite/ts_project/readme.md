# 从0开始一个ts项目

## 初始化node

```
pnpm init -y
```

## 安装依赖

```
pnpm add -D typescript
```

## 初始化ts

```
tsc --init
```

## 配置tsconfig.json

配置项看`TS笔记`


## tsc操作

#### 编译单个ts文件

```
tsc ts文件路径
```

> 文件相对根目录的路径, 一般用相对路径

#### 编译单个ts文件且持续监视文件

```
tsc ts文件路径 -w
```

#### 编译所有ts文件

```
tsc
```

#### 编译所有ts文件且持续监视文件

```
tsc -w
tsc --watch
```

> 以上操作一般适用于查看编译后的结果<br>
> 正常开发项目一般用ts-node相关依赖直接执行ts, ts文件变更后自动重启项目<br>
> 比如koa2_ts项目, 用ts-node-dev启动, 就看不到编译后的js文件<br>

## 项目开发

#### 安装依赖

```
pnpm add -D ts-node-dev
```

配置启动脚本命令
```
"dev": "ts-node-dev ./src/main.ts",
```


[TypeScript 进阶之路-编译和打包](https://juejin.cn/post/7016635784631418916)

[简单好用的 Typescript 项目重启工具：ts-node-dev](https://juejin.cn/post/7165675624810414087)