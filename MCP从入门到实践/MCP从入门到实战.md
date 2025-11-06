# MCP从入门到实战

## 前置知识

### 通信方式：stdio

stdio: **st**an**d**ard **i**nput and **o**utput 标准输入输出

<img src="https://resource.duyiedu.com/yuanjin/202507121302745.png" alt="image-20250712130252722" style="zoom: 33%;" />

<img src="https://resource.duyiedu.com/yuanjin/202507121308463.png" alt="image-20250712130835444" style="zoom:33%;" />

stdio通信高效、简洁，但仅适用于本地进程间通信

### 通信格式：JSON-RPC

`request`

```json
{
  "jsonrpc": "2.0",
  "method": "sum",
  "params": {
    "a": 5,
    "b": 6
  },
  "id": 1
}
```

`response`

```json
{
  "jsonrpc": "2.0",
  "result": 11,
  "id": 1
}
```

## MCP

**MCP是一套标准协议， 它规定了应用程序之间如何通信**

如何通信：

- 通信方式
  - stdio： 推荐，高效、简洁、本地
  - http： 可远程
- 通信格式： 基于JSON-RPC的进一步规范

官网地址： https://modelcontextprotocol.io/

**基本规范**

1. 初始化 `initialize`
   `request`

   ```json
   {
     "jsonrpc": "2.0",
     "id": 1,
     "method": "initialize", // 固定为 initialize
     "params": {
       "protocolVersion": "2024-11-05",
       "capabilities": {
         "roots": {
           "listChanged": true
         },
         "sampling": {},
         "elicitation": {}
       },
       "clientInfo": { // 告知服务器客户端的信息
         "name": "ExampleClient",
         "title": "Example Client Display Name",
         "version": "1.0.0"
       }
     }
   }
   ```

   `response`

   ```json
   {
     "jsonrpc": "2.0",
     "id": 1, 
     "result": {
       "protocolVersion": "2024-11-05",
       "capabilities": {
         "logging": {},
         "prompts": {
           "listChanged": true
         },
         "resources": {
           "subscribe": true,
           "listChanged": true
         },
         "tools": {
           "listChanged": true
         }
       },
       "serverInfo": { // 服务端信息
         "name": "ExampleServer",
         "title": "Example Server Display Name",
         "version": "1.0.0"
       },
       "instructions": "Optional instructions for the client"
     }
   }
   ```

2. 工具发现 `tools/list`

   服务器有哪些工具函数可以供客户端调用

   `request`

   ```json
   {
     "jsonrpc": "2.0",
     "id": 1,
     "method": "tools/list",
     "params": {}
   }
   ```

   `response`

   ```json
   {
     "jsonrpc": "2.0",
     "id": 1,
     "result": {
       "tools": [
         {
           "name": "get_weather",
           "title": "Weather Information Provider",
           "description": "Get current weather information for a location",
           "inputSchema": {
             "type": "object",
             "properties": {
               "location": {
                 "type": "string",
                 "description": "City name or zip code"
               }
             },
             "required": ["location"]
           }
         }
       ]
     }
   }
   ```

3. 工具调用 `tools/call`
   `request`

   ```json
   {
     "jsonrpc": "2.0",
     "id": 2,
     "method": "tools/call", // 调用工具
     "params": {
       "name": "get_weather", // 工具名，对应工具发现中的name
       "arguments": { // 工具参数，需要和工具发现中的结构一致
         "location": "New York" 
       }
     }
   }
   ```

   `resonse`

   ```json
   {
     "jsonrpc": "2.0",
     "id": 2,
     "result": {
       "content": [{ // 函数结果需要放到content字段中，如果有多个，使用数组
         // 函数结果的类型
         // 支持的类型： https://modelcontextprotocol.io/specification/2025-06-18/server/tools#tool-result
         "type": "text", 
         "text": "72°F" 
       }]
     }
   }
   ```

## 工具和效率

### MCP Server 的调试工具

直接运行

```shell
 npx @modelcontextprotocol/inspector
```

### MCP SDK

使用`@modelcontextprotocol/sdk`可以更方便的开发`MCP Server`

```shell
npm install @modelcontextprotocol/sdk
```

## 对接AI应用程序

什么是AI应用程序？

所有能与大模型交互的应用都可以看作是AI应用程序

常见的AI应用程序：

- ChatGPT
- DeepSeek Chat Page
- Claude Desktop
  支持MCP协议，可充当MCP客户端
  https://claude.ai/download
- VSCode
  支持MCP协议，可充当MCP客户端
- Cursor
  支持MCP协议，可充当MCP客户端
  https://cursor.com/cn
- ...

![image-20250712221447931](https://resource.duyiedu.com/yuanjin/202507122214955.png)

两个核心概念：

- `MCP Host`: 往往指代AI应用本身，用于发现MCP Server以及其中的工具列表
- `MCP Client`： 用于和MCP Server通信的客户端，往往在Host内部开启，通常情况下，每启动一个MCP Server，就会开启一个MCP Client

![image-20250712222733393](https://resource.duyiedu.com/yuanjin/202507122227442.png)

例如：

1. 在Claude Desk 中打开一个新的聊天窗口
2. Claude查看当前启用了哪些MCP Server
3. Claude（host）为每个MCP Server创建一个Client
4. 每个Client分别启动各自的MCP Server，随时准备通信
5. 当时机到达时，每个Client负责调用各自的工具并把结果传递个Host
6. Host根据结果处理后续逻辑

## 重新认识MCP

**MCP，全称 Model Context Protocal， 模型上下文协议。 其旨在为AI与外部程序之间建立通信标准， 从而使得外部程序可以被部署到任意AI， 也使得AI应用可以使用任意的外部程序**

## MCP 资源聚合平台

1. https://github.com/modelcontextprotocol/servers
2. https://mcpservers.org/
3. https://mcp.so/
4. https://modelscope.cn/mcp
5. ...

## MCP项目实战 - 安全依赖审计工具

### 什么是安全依赖审计

安全依赖审计是指对某个工程的所有直接依赖和间接依赖进行安全验证，发现其是否包含潜藏的风险。

### 何时会进行安全依赖审计

- 技术选型： 
  - 针对目标技术
  - 远程审计
- 项目开发
  - 针对当前工程
  - 本地审计 / 远程审计

### 如何进行安全审计

```
npm audit
```

### 为什么不直接使用npm audit

`npm audit`的问题：

- 阅读不友好
  - 依赖关系不清晰
- 功能不完整
  - 无法对远程仓库进行审计
  - 无法对工程本身进行审计（只能审计依赖）
- 难以集成
  - AI应用集成：取决于应用是否支持运行命令
  - CI/CD集成：无法定义部署决策逻辑

### 需求

自定义安全审计功能，该功能可支持：

- 对本地工程或远程仓库均能进行安全审计
- 安全审计时能够对工程本身进行审计
- 审计结果中包含清晰的依赖路径
- 审计的结果是一个统一标准的`markdown`格式文档
- 支持`MCP Server`协议
- 更多的拓展功能...

### MVP版本实现流程

大致分为两部实现功能：

1. 实现安全审计功能本身：
   ```js
   /**
    * 根据项目根目录，审计项目中所有的包（含项目本身）
    * @param {string} projectRoot 项目根目录，可以是本地目录的绝对路径，也可以是远程仓库的URL
    * @param {string} savePath 保存审计结果的文件名，审计结果是一个标准格式的markdown字符串
    */
   export async function auditPackage(projectRoot, savePath) {}
   ```

2. 将该功能套壳为`MCP Server`



#### 安全审计功能的实现流程

1. **创建工作目录**：创建一个临时的工作目录，用于保存执行期间要用到的临时文件
2. **解析工程**：解析本地工程目录或者远程仓库链接，得到对应的`package.json`文件内容
3. **生成lock文件**：将`package.json`写入到临时工作目录，同时根据它生成`package-lock.json`
4. **安全审计**：进入到临时工作目录，使用`npm audit`命令进行安全审计，并讲审计结果规格化
5. **渲染**：将上一步得到的规格化审计结果进行渲染，渲染成标准化的`markdown`内容，并保存到结果文件
6. **删除工作目录**：将之前创建的临时工作目录删除



**实现细节**

1. **创建工作目录**: 创建一个临时的工作目录，用于保存执行期间要用到的临时文件

   - 如何保证目录名的唯一性：随机字符串+时间戳、uuid

2. **解析工程**：解析本地工程目录或者远程仓库链接，得到对应的`package.json`文件内容

   - 分辨是本地工程还是远程仓库
   - 具体是何种远程仓库（MVP版本仅考虑github仓库）
   - 如何从出远程仓库的链接中分析得到关键信息：owner、repo、tag、default_brach
   - 如何获取远程仓库中的package.json
   - 其他情况处理（MVP版本不涉及）：非前端工程、monorepo工程

3. **生成lock文件**：将`package.json`写入到临时工作目录，同时根据它生成`package-lock.json`

   - 如何根据package.json生成lock文件：`npm install --package-lock-only`

4. **安全审计**：进入到临时工作目录，使用`npm audit`命令进行安全审计，并讲审计结果规格化

   - 如何得到审计结果：`npm audit --json`

   - 审计结果中包含哪些信息：

     severity: https://docs.npmjs.com/about-audit-reports#severity

     source: npm对漏洞的编号，仅存在于npm包中的漏洞

     CVE：漏洞的通用编号，该编号跨越语言，可以从https://www.cve.org/查询详情

     CWE：漏洞类型编号，通过此编号可以找到漏洞是如何产生的，会造成什么影响，可以通过https://cwe.mitre.org/ 进行查询

     CVSS：漏洞严重性评分，对应到severity字段

   - 规格化的目标

   - 如何实现规格化
     图的DFS算法

   - 如何获取当前工程的审计结果：npm的远程API

   - 把当前工程的审计结果汇总到结果中

5. **渲染**：将上一步得到的规格化审计结果进行渲染，渲染成标准化的 markdown 内容，并保存到结果文件

   - 如何将审计结果渲染为 markdown：使用模板引擎，此项目使用的是`ejs`

6. **删除工作目录**：将之前创建的临时工作目录删除



#### MCP套壳



无特别说明



### 持续优化

- 使用 TypeScript 重构

- 上传到 npm，并可以使用 npx 下载执行

- 从问题出发还是从依赖出发？

- monorepo工程如何处理？

  工程特征检测、workspace api的使用

- 如何适配不同的仓库，比如gitee、gitlab等

  url特征检测、策略模式

- 如何适配不同的本地环境，比如npm版本不同

  容器技术（本地docker、远程服务器）固定版本

- 图形表达依赖关系

  mermaid、AntV、D3、...

- 性能提升

  包-版本 审计结果缓存，本地 / 远程缓存

  本地缓存可采用 LRU 缓存模型

- 语义范围合并

  某个包的多个版本范围都有漏洞，如何根据多个语义版本求并集

- 修复建议

  提示词 + AI 建议

- 步骤拆分

  MCP Tools、MCP Prompt、MCP Resouces、Dify
  
- 集成到生产管线（CI/CD)



### 简历

**项目名**：AISC ( AI Security-Check ) 

**角色**：前端架构师

**项目描述**

研发基于MCP Server协议的前端通用安全依赖审计工具，解决 npm audit 的核心痛点。

工具支持本地工程和远程仓库，包含CVSS、CWE、依赖链等关键审计信息。

审计结果为标准化 markdown 文件，将来亦可支持渲染为其他标准格式，如JSON、HTML等。工具可用于本地依赖检查和技术选型等安全审计工作。

项目已无缝集成到公司的LLM工具链，服务于公司所有生产线，安全审计效率提升90%。

**技术栈**：NodeJS、MCP Server、Zod、Ejs、Git API、Semver、Docker、Monorepo

**项目业绩**： 

- 多种仓库类型的特征提炼和远程解析
- 利用 workspace api 解析 monorepo 工程的所有子工程依赖
- 无安装实现 lock 文件生成
- 利用 npm security api 完成住主工程安全审计
- 依赖图到依赖链底转换，完成图结构的DFS并处理 recursive dependency 问题
- 使用模板引擎渲染审计结果
- 使用容器技术固定环境保本
- 合并漏洞影响的语义范围
- 使用 LRU 提升审计性能
- 使用 MCP Prompts、MCP Tools、MCP Resources 构建 MCP 服务链



### 面试

> **请谈一谈你做的AI Security-Check**

**背景**

这是一个安全审计工具。

过去在开发过程中，或者在做技术选型的时候，我们都是使用npm audit进行手动审计。

手动审计有很多的问题，比方说难以和公司现有的AI工具链结合，然后结果格式既不友好、也不稳定，还有就是 npm audit 只能对本地工程的依赖项进行审计，对远程工程和工程自身无法处理。

总之有很多问题，导致每次在做安全审计的时候都会浪费大量时间。

所有我们架构组就提了一个OKR来解决这个问题，最后这个项目就交到了我手上。

**方案**

首先我制定了一套自动化管线来解决这个问题，这套管线大致流程是：

第一步自动创建一个临时工作目录

第二步则要获取待审计工程的package.json

第三步在该环境中根据这个package.json生成lock文件来锁定具体版本

第四步根据lock文件得到一个审计结果，并且把这个审计结果规格化，比如把依赖图转换为依赖链，比如利用npm远程API得到自身工程的审计结果并合并到最终结果，总之最终能得到一个标准化的审计结果。

第五步把审计结果渲染成markdown

最后把临时工作目录删除

整个流程用程序自动化完成

**实施**

流程还是比较简单，但这里面有很多细节不好处理。

比如版本问题，由于这个工具是作为MCP Server在本地运行的，而本地的npm版本是有差异的，就导致审计出来的结果格式不一致，为解决这个问题我引入了docker来固定环境版本。

另外官方的审计API得到的结果是一个依赖图，而我们最终需要的是一个依赖链，这里就涉及到图转链的操作，并且还要考虑到图中有环的问题，这一块属于算法问题。

然后还有就是某些工程是用monorepo搭建的，这里需要去判断工程使用哪种工具搭建的monorepo，然后去适配不同的workspace api来读取到工程下所有子工程的依赖。

【语义版本合并、缓存性能...】

**效果**

最终这个工具落地效果还是比较惊喜的。它可以集成到Cursor、VSCode、Dify这些工具，也可以直接调用。后面我们所有的安全审计都是靠这套工具完成的，整个公司在审计这一块现在基本不用耗费什么时间。
