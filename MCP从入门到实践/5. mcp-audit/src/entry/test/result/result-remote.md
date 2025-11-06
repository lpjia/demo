# `webpack-dev-server`审计结果


您所审计的工程总共有 **4** 个风险漏洞。

其中：

- **严重漏洞**：共计 **0** 个
- **高危漏洞**：共计 **3** 个
- **中危漏洞**：共计 **1** 个
- **低危漏洞**：共计 **0** 个

> 说明：
>
> - **严重**漏洞被认为是极其严重的，应该立即修复。
> - **高危**漏洞被认为是严重的，应该尽快修复。
> - **中危**漏洞被认为是中等严重的，可以选择在时间允许时修复。
> - **低危**漏洞被认为是轻微的，可以根据自行需要进行修复。

下面是漏洞的详细信息



## 高危漏洞

共计 **3** 个


### `semver`

**漏洞描述**：

- semver vulnerable to Regular Expression Denial of Service
  - npm漏洞编号：`1101088`
  - 漏洞详细说明：https://github.com/advisories/GHSA-c2qf-rxjj-qqgw
  - 漏洞等级：高危
  - 受影响的版本：`>=7.0.0 <7.5.2`


**依赖关系**：



- `webpack-dev-server` / `@commitlint/cli` / `@commitlint/lint` / `@commitlint/is-ignored` / `semver`

  
  

**漏洞包所在目录**：

- `node_modules/@commitlint/is-ignored/node_modules/semver`


### `tar-fs`

**漏洞描述**：

- tar-fs Vulnerable to Link Following and Path Traversal via Extracting a Crafted tar File
  - npm漏洞编号：`1104677`
  - 漏洞详细说明：https://github.com/advisories/GHSA-pq67-2wwv-3xjx
  - 漏洞等级：高危
  - 受影响的版本：`>=2.0.0 <2.1.2`

- tar-fs can extract outside the specified dir with a specific tarball
  - npm漏洞编号：`1105197`
  - 漏洞详细说明：https://github.com/advisories/GHSA-8cj5-5rvv-wf4v
  - 漏洞等级：高危
  - 受影响的版本：`>=2.0.0 <2.1.3`


**依赖关系**：



- `webpack-dev-server` / `puppeteer` / `tar-fs`

  
  

**漏洞包所在目录**：

- `node_modules/tar-fs`


### `ws`

**漏洞描述**：

- ws affected by a DoS when handling a request with many HTTP headers
  - npm漏洞编号：`1098392`
  - 漏洞详细说明：https://github.com/advisories/GHSA-3h5v-q93c-6h6q
  - 漏洞等级：高危
  - 受影响的版本：`>=8.0.0 <8.17.1`


**依赖关系**：



- `webpack-dev-server` / `puppeteer` / `ws`

  
  

**漏洞包所在目录**：

- `node_modules/puppeteer/node_modules/ws`





## 中危漏洞

共计 **1** 个


### `webpack-dev-server`

**漏洞描述**：

- webpack-dev-server users' source code may be stolen when they access a malicious web site with non-Chromium based browser
  - npm漏洞编号：`1105256`
  - 漏洞详细说明：https://github.com/advisories/GHSA-9jgg-88mc-972h
  - 漏洞等级：中危
  - 受影响的版本：`<=5.2.0`

- webpack-dev-server users' source code may be stolen when they access a malicious web site
  - npm漏洞编号：`1105257`
  - 漏洞详细说明：https://github.com/advisories/GHSA-4v9v-hfq4-rm2v
  - 漏洞等级：中危
  - 受影响的版本：`<=5.2.0`


**依赖关系**：


当前工程



**漏洞包所在目录**：

- `.`







