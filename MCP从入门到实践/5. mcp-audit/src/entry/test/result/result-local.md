# `my-site`审计结果


您所审计的工程总共有 **20** 个风险漏洞。

其中：

- **严重漏洞**：共计 **4** 个
- **高危漏洞**：共计 **12** 个
- **中危漏洞**：共计 **3** 个
- **低危漏洞**：共计 **1** 个

> 说明：
>
> - **严重**漏洞被认为是极其严重的，应该立即修复。
> - **高危**漏洞被认为是严重的，应该尽快修复。
> - **中危**漏洞被认为是中等严重的，可以选择在时间允许时修复。
> - **低危**漏洞被认为是轻微的，可以根据自行需要进行修复。

下面是漏洞的详细信息


## 严重漏洞

共计 **4** 个


### ejs
**漏洞描述**：

- ejs template injection vulnerability
  - npm漏洞编号：`1089270`
  - 漏洞详细说明：https://github.com/advisories/GHSA-phwq-j96m-2c2q
  - 漏洞等级：严重
  - 受影响的版本：`<3.1.7`

- ejs lacks certain pollution protection
  - npm漏洞编号：`1098366`
  - 漏洞详细说明：https://github.com/advisories/GHSA-ghr5-ch3p-vcr6
  - 漏洞等级：中危
  - 受影响的版本：`<3.1.10`


**依赖关系**：


- `my-site` / `webpack-bundle-analyzer` / `ejs`

  
  

**漏洞包所在目录**：

- `node_modules/ejs`


### form-data
**漏洞描述**：

- form-data uses unsafe random function in form-data for choosing boundary
  - npm漏洞编号：`1106509`
  - 漏洞详细说明：https://github.com/advisories/GHSA-fjxv-7rqg-78g4
  - 漏洞等级：严重
  - 受影响的版本：`<2.5.4`


**依赖关系**：


- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `@vue/cli-plugin-router` / `@vue/cli-shared-utils` / `request` / `form-data`

  
- `my-site` / `@vue/cli-service` / `@vue/cli-plugin-router` / `@vue/cli-shared-utils` / `request` / `form-data`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `@vue/cli-plugin-router` / `@vue/cli-shared-utils` / `request` / `form-data`

  
  

**漏洞包所在目录**：

- `node_modules/form-data`


### loader-utils
**漏洞描述**：

- Prototype pollution in webpack loader-utils
  - npm漏洞编号：`1094088`
  - 漏洞详细说明：https://github.com/advisories/GHSA-76p3-8jx3-jpfq
  - 漏洞等级：严重
  - 受影响的版本：`<1.4.1`


**依赖关系**：


- `my-site` / `html-webpack-plugin` / `loader-utils`

  
  

**漏洞包所在目录**：

- `node_modules/html-webpack-plugin/node_modules/loader-utils`


### request
**漏洞描述**：

- Server-Side Request Forgery in Request
  - npm漏洞编号：`1096727`
  - 漏洞详细说明：https://github.com/advisories/GHSA-p8p7-x288-28g6
  - 漏洞等级：中危
  - 受影响的版本：`<=2.88.2`


**依赖关系**：


- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `@vue/cli-plugin-router` / `@vue/cli-shared-utils` / `request`

  
- `my-site` / `@vue/cli-service` / `@vue/cli-plugin-router` / `@vue/cli-shared-utils` / `request`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `@vue/cli-plugin-router` / `@vue/cli-shared-utils` / `request`

  
  

**漏洞包所在目录**：

- `node_modules/request`





## 高危漏洞

共计 **12** 个


### axios
**漏洞描述**：

- Axios Cross-Site Request Forgery Vulnerability
  - npm漏洞编号：`1097679`
  - 漏洞详细说明：https://github.com/advisories/GHSA-wf5p-g6vw-rhxx
  - 漏洞等级：中危
  - 受影响的版本：`>=0.8.1 <0.28.0`

- axios Requests Vulnerable To Possible SSRF and Credential Leakage via Absolute URL
  - npm漏洞编号：`1103617`
  - 漏洞详细说明：https://github.com/advisories/GHSA-jr5f-v2jv-69x6
  - 漏洞等级：高危
  - 受影响的版本：`<0.30.0`


**依赖关系**：


- `my-site` / `axios`

  
  

**漏洞包所在目录**：

- `node_modules/axios`


### braces
**漏洞描述**：

- Uncontrolled resource consumption in braces
  - npm漏洞编号：`1098094`
  - 漏洞详细说明：https://github.com/advisories/GHSA-grv7-fg5c-xmjg
  - 漏洞等级：高危
  - 受影响的版本：`<3.0.3`


**依赖关系**：


- `my-site` / `@intervolga/optimize-cssnano-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `braces`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `braces`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `file-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `braces`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `file-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `braces`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `file-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `braces`

  
- `my-site` / `mini-css-extract-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `braces`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `braces`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `braces`

  
- `my-site` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `url-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `braces`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `url-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `braces`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `url-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `braces`

  
- `my-site` / `webpack-dev-server` / `chokidar` / `braces`

  
- `my-site` / `@intervolga/optimize-cssnano-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `file-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `file-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `file-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch` / `braces`

  
- `my-site` / `mini-css-extract-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch` / `braces`

  
- `my-site` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `url-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `url-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `url-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch` / `braces`

  
- `my-site` / `webpack-dev-server` / `chokidar` / `anymatch` / `micromatch` / `braces`

  
- `my-site` / `globby` / `fast-glob` / `micromatch` / `braces`

  
- `my-site` / `@types/webpack-dev-server` / `http-proxy-middleware` / `micromatch` / `braces`

  
- `my-site` / `webpack-dev-server` / `http-proxy-middleware` / `micromatch` / `braces`

  
- `my-site` / `@intervolga/optimize-cssnano-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `file-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `file-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `file-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch` / `braces`

  
- `my-site` / `mini-css-extract-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch` / `braces`

  
- `my-site` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `url-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `url-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `url-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch` / `braces`

  
- `my-site` / `webpack-dev-server` / `chokidar` / `readdirp` / `micromatch` / `braces`

  
- `my-site` / `@intervolga/optimize-cssnano-plugin` / `webpack` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `webpack` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `cache-loader` / `webpack` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `cache-loader` / `webpack` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `cache-loader` / `webpack` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `cache-loader` / `webpack` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `file-loader` / `webpack` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `file-loader` / `webpack` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `file-loader` / `webpack` / `micromatch` / `braces`

  
- `my-site` / `mini-css-extract-plugin` / `webpack` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `micromatch` / `braces`

  
- `my-site` / `terser-webpack-plugin` / `webpack` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `url-loader` / `webpack` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `url-loader` / `webpack` / `micromatch` / `braces`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `url-loader` / `webpack` / `micromatch` / `braces`

  
  

**漏洞包所在目录**：

- `node_modules/braces`


### html-minifier
**漏洞描述**：

- kangax html-minifier REDoS vulnerability
  - npm漏洞编号：`1105440`
  - 漏洞详细说明：https://github.com/advisories/GHSA-pfq8-rq6v-vf5m
  - 漏洞等级：高危
  - 受影响的版本：`<=4.0.0`


**依赖关系**：


- `my-site` / `html-webpack-plugin` / `html-minifier`

  
  

**漏洞包所在目录**：

- `node_modules/html-minifier`


### http-proxy-middleware
**漏洞描述**：

- Denial of service in http-proxy-middleware
  - npm漏洞编号：`1100223`
  - 漏洞详细说明：https://github.com/advisories/GHSA-c7qv-q95q-8v27
  - 漏洞等级：高危
  - 受影响的版本：`<2.0.7`

- http-proxy-middleware allows fixRequestBody to proceed even if bodyParser has failed
  - npm漏洞编号：`1104105`
  - 漏洞详细说明：https://github.com/advisories/GHSA-9gqv-wp59-fq42
  - 漏洞等级：中危
  - 受影响的版本：`>=1.3.0 <2.0.9`

- http-proxy-middleware can call writeBody twice because "else if" is not used
  - npm漏洞编号：`1104106`
  - 漏洞详细说明：https://github.com/advisories/GHSA-4www-5p9h-95mh
  - 漏洞等级：中危
  - 受影响的版本：`>=1.3.0 <2.0.8`


**依赖关系**：


- `my-site` / `@types/webpack-dev-server` / `http-proxy-middleware`

  
- `my-site` / `webpack-dev-server` / `http-proxy-middleware`

  
  

**漏洞包所在目录**：

- `node_modules/http-proxy-middleware`

- `node_modules/webpack-dev-server/node_modules/http-proxy-middleware`


### ip
**漏洞描述**：

- ip SSRF improper categorization in isPublic
  - npm漏洞编号：`1101851`
  - 漏洞详细说明：https://github.com/advisories/GHSA-2p57-rm9w-gvfp
  - 漏洞等级：高危
  - 受影响的版本：`<=2.0.1`


**依赖关系**：


- `my-site` / `webpack-dev-server` / `bonjour` / `multicast-dns` / `dns-packet` / `ip`

  
- `my-site` / `webpack-dev-server` / `ip`

  
  

**漏洞包所在目录**：

- `node_modules/ip`


### json5
**漏洞描述**：

- Prototype Pollution in JSON5 via Parse Method
  - npm漏洞编号：`1096543`
  - 漏洞详细说明：https://github.com/advisories/GHSA-9c47-m6qq-7p4h
  - 漏洞等级：高危
  - 受影响的版本：`<1.0.2`


**依赖关系**：


- `my-site` / `html-webpack-plugin` / `loader-utils` / `json5`

  
  

**漏洞包所在目录**：

- `node_modules/html-webpack-plugin/node_modules/json5`


### micromatch
**漏洞描述**：

- Regular Expression Denial of Service (ReDoS) in micromatch
  - npm漏洞编号：`1098681`
  - 漏洞详细说明：https://github.com/advisories/GHSA-952p-6rrq-rcjv
  - 漏洞等级：中危
  - 受影响的版本：`<4.0.8`


**依赖关系**：


- `my-site` / `@intervolga/optimize-cssnano-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-babel` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-babel` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `file-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `file-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `file-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch`

  
- `my-site` / `mini-css-extract-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch`

  
- `my-site` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `url-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `url-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `url-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `anymatch` / `micromatch`

  
- `my-site` / `webpack-dev-server` / `chokidar` / `anymatch` / `micromatch`

  
- `my-site` / `globby` / `fast-glob` / `micromatch`

  
- `my-site` / `@types/webpack-dev-server` / `http-proxy-middleware` / `micromatch`

  
- `my-site` / `webpack-dev-server` / `http-proxy-middleware` / `micromatch`

  
- `my-site` / `@intervolga/optimize-cssnano-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-babel` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-babel` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `cache-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `file-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `file-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `file-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch`

  
- `my-site` / `mini-css-extract-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch`

  
- `my-site` / `terser-webpack-plugin` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `url-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `url-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `url-loader` / `webpack` / `watchpack` / `watchpack-chokidar2` / `chokidar` / `readdirp` / `micromatch`

  
- `my-site` / `webpack-dev-server` / `chokidar` / `readdirp` / `micromatch`

  
- `my-site` / `@intervolga/optimize-cssnano-plugin` / `webpack` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-babel` / `webpack` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-babel` / `cache-loader` / `webpack` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `cache-loader` / `webpack` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `cache-loader` / `webpack` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `cache-loader` / `webpack` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `file-loader` / `webpack` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `file-loader` / `webpack` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `file-loader` / `webpack` / `micromatch`

  
- `my-site` / `mini-css-extract-plugin` / `webpack` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `terser-webpack-plugin` / `webpack` / `micromatch`

  
- `my-site` / `terser-webpack-plugin` / `webpack` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `url-loader` / `webpack` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `url-loader` / `webpack` / `micromatch`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `url-loader` / `webpack` / `micromatch`

  
  

**漏洞包所在目录**：

- `node_modules/micromatch`


### mockjs
**漏洞描述**：

- mockjs vulnerable to Prototype Pollution via the Util.extend function
  - npm漏洞编号：`1095258`
  - 漏洞详细说明：https://github.com/advisories/GHSA-mh8j-9jvh-gjf6
  - 漏洞等级：高危
  - 受影响的版本：`<=1.1.0`


**依赖关系**：


- `my-site` / `mockjs`

  
  

**漏洞包所在目录**：

- `node_modules/mockjs`


### node-forge
**漏洞描述**：

- Prototype Pollution in node-forge debug API.
  - npm漏洞编号：`1088227`
  - 漏洞详细说明：https://github.com/advisories/GHSA-5rrq-pxf6-6jx5
  - 漏洞等级：低危
  - 受影响的版本：`<1.0.0`

- URL parsing in node-forge could lead to undesired behavior.
  - npm漏洞编号：`1088229`
  - 漏洞详细说明：https://github.com/advisories/GHSA-gf8q-jrpm-jvxq
  - 漏洞等级：低危
  - 受影响的版本：`<1.0.0`

- Improper Verification of Cryptographic Signature in `node-forge`
  - npm漏洞编号：`1088746`
  - 漏洞详细说明：https://github.com/advisories/GHSA-2r2c-g63r-vccr
  - 漏洞等级：中危
  - 受影响的版本：`<1.3.0`

- Open Redirect in node-forge
  - npm漏洞编号：`1093719`
  - 漏洞详细说明：https://github.com/advisories/GHSA-8fr3-hfg3-gpgp
  - 漏洞等级：中危
  - 受影响的版本：`<1.0.0`

- Improper Verification of Cryptographic Signature in node-forge
  - npm漏洞编号：`1102321`
  - 漏洞详细说明：https://github.com/advisories/GHSA-x4jg-mjrx-434g
  - 漏洞等级：高危
  - 受影响的版本：`<1.3.0`

- Improper Verification of Cryptographic Signature in node-forge
  - npm漏洞编号：`1102322`
  - 漏洞详细说明：https://github.com/advisories/GHSA-cfm4-qjh2-4765
  - 漏洞等级：高危
  - 受影响的版本：`<1.3.0`


**依赖关系**：


- `my-site` / `webpack-dev-server` / `selfsigned` / `node-forge`

  
  

**漏洞包所在目录**：

- `node_modules/node-forge`


### nth-check
**漏洞描述**：

- Inefficient Regular Expression Complexity in nth-check
  - npm漏洞编号：`1095141`
  - 漏洞详细说明：https://github.com/advisories/GHSA-rp65-9cf3-cjxr
  - 漏洞等级：高危
  - 受影响的版本：`<2.0.1`


**依赖关系**：


- `my-site` / `postcss-svgo` / `svgo` / `css-select` / `nth-check`

  
  

**漏洞包所在目录**：

- `node_modules/svgo/node_modules/nth-check`


### webpack-dev-middleware
**漏洞描述**：

- Path traversal in webpack-dev-middleware
  - npm漏洞编号：`1096729`
  - 漏洞详细说明：https://github.com/advisories/GHSA-wr3j-pwj9-hqq6
  - 漏洞等级：高危
  - 受影响的版本：`<=5.3.3`


**依赖关系**：


- `my-site` / `webpack-dev-server` / `webpack-dev-middleware`

  
  

**漏洞包所在目录**：

- `node_modules/webpack-dev-middleware`


### webpack-dev-server
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


- `my-site` / `webpack-dev-server`

  
  

**漏洞包所在目录**：

- `node_modules/webpack-dev-server`





## 中危漏洞

共计 **3** 个


### postcss
**漏洞描述**：

- PostCSS line return parsing error
  - npm漏洞编号：`1094544`
  - 漏洞详细说明：https://github.com/advisories/GHSA-7fh5-64p2-3v2j
  - 漏洞等级：中危
  - 受影响的版本：`<8.4.31`


**依赖关系**：


- `my-site` / `@intervolga/optimize-cssnano-plugin` / `postcss`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `@vue/component-compiler-utils` / `postcss`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `@vue/component-compiler-utils` / `postcss`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `@vue/component-compiler-utils` / `postcss`

  
- `my-site` / `vue-loader` / `@vue/component-compiler-utils` / `postcss`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `autoprefixer` / `postcss`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `autoprefixer` / `postcss`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `autoprefixer` / `postcss`

  
- `my-site` / `css-declaration-sorter` / `postcss`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `css-loader` / `postcss`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `css-loader` / `postcss`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `css-loader` / `postcss`

  
- `my-site` / `@intervolga/optimize-cssnano-plugin` / `cssnano` / `postcss`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `cssnano` / `postcss`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `cssnano` / `postcss`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `cssnano` / `postcss`

  
- `my-site` / `@intervolga/optimize-cssnano-plugin` / `cssnano` / `cssnano-preset-default` / `postcss`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `cssnano` / `cssnano-preset-default` / `postcss`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `cssnano` / `cssnano-preset-default` / `postcss`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `cssnano` / `cssnano-preset-default` / `postcss`

  
- `my-site` / `cssnano-util-raw-cache` / `postcss`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `css-loader` / `icss-utils` / `postcss`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `css-loader` / `icss-utils` / `postcss`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `css-loader` / `icss-utils` / `postcss`

  
- `my-site` / `postcss-modules-local-by-default` / `icss-utils` / `postcss`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `css-loader` / `postcss-modules-values` / `icss-utils` / `postcss`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `css-loader` / `postcss-modules-values` / `icss-utils` / `postcss`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `css-loader` / `postcss-modules-values` / `icss-utils` / `postcss`

  
- `my-site` / `postcss-calc` / `postcss`

  
- `my-site` / `postcss-colormin` / `postcss`

  
- `my-site` / `postcss-convert-values` / `postcss`

  
- `my-site` / `postcss-discard-comments` / `postcss`

  
- `my-site` / `postcss-discard-duplicates` / `postcss`

  
- `my-site` / `postcss-discard-empty` / `postcss`

  
- `my-site` / `postcss-discard-overridden` / `postcss`

  
- `my-site` / `postcss-loader` / `postcss`

  
- `my-site` / `postcss-merge-longhand` / `postcss`

  
- `my-site` / `postcss-merge-rules` / `postcss`

  
- `my-site` / `postcss-minify-font-values` / `postcss`

  
- `my-site` / `postcss-minify-gradients` / `postcss`

  
- `my-site` / `postcss-minify-params` / `postcss`

  
- `my-site` / `postcss-minify-selectors` / `postcss`

  
- `my-site` / `postcss-modules-extract-imports` / `postcss`

  
- `my-site` / `postcss-modules-local-by-default` / `postcss`

  
- `my-site` / `postcss-modules-scope` / `postcss`

  
- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `css-loader` / `postcss-modules-values` / `postcss`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `css-loader` / `postcss-modules-values` / `postcss`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `css-loader` / `postcss-modules-values` / `postcss`

  
- `my-site` / `postcss-normalize-charset` / `postcss`

  
- `my-site` / `postcss-normalize-display-values` / `postcss`

  
- `my-site` / `postcss-normalize-positions` / `postcss`

  
- `my-site` / `postcss-normalize-repeat-style` / `postcss`

  
- `my-site` / `postcss-normalize-string` / `postcss`

  
- `my-site` / `postcss-normalize-timing-functions` / `postcss`

  
- `my-site` / `postcss-normalize-unicode` / `postcss`

  
- `my-site` / `postcss-normalize-url` / `postcss`

  
- `my-site` / `postcss-normalize-whitespace` / `postcss`

  
- `my-site` / `postcss-ordered-values` / `postcss`

  
- `my-site` / `postcss-reduce-initial` / `postcss`

  
- `my-site` / `postcss-reduce-transforms` / `postcss`

  
- `my-site` / `postcss-svgo` / `postcss`

  
- `my-site` / `postcss-unique-selectors` / `postcss`

  
- `my-site` / `postcss-merge-longhand` / `stylehacks` / `postcss`

  
  

**漏洞包所在目录**：

- `node_modules/postcss`


### tough-cookie
**漏洞描述**：

- tough-cookie Prototype Pollution vulnerability
  - npm漏洞编号：`1097682`
  - 漏洞详细说明：https://github.com/advisories/GHSA-72xf-g2v4-qvf3
  - 漏洞等级：中危
  - 受影响的版本：`<4.1.3`


**依赖关系**：


- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `@vue/cli-plugin-router` / `@vue/cli-shared-utils` / `request` / `tough-cookie`

  
- `my-site` / `@vue/cli-service` / `@vue/cli-plugin-router` / `@vue/cli-shared-utils` / `request` / `tough-cookie`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `@vue/cli-plugin-router` / `@vue/cli-shared-utils` / `request` / `tough-cookie`

  
  

**漏洞包所在目录**：

- `node_modules/tough-cookie`


### vue-template-compiler
**漏洞描述**：

- vue-template-compiler vulnerable to client-side Cross-Site Scripting (XSS)
  - npm漏洞编号：`1098721`
  - 漏洞详细说明：https://github.com/advisories/GHSA-g3ch-rx76-35fx
  - 漏洞等级：中危
  - 受影响的版本：`>=2.0.0 <3.0.0`


**依赖关系**：


- `my-site` / `@vue/cli-plugin-babel` / `@vue/cli-service` / `vue-template-compiler`

  
- `my-site` / `@vue/cli-plugin-router` / `@vue/cli-service` / `vue-template-compiler`

  
- `my-site` / `@vue/cli-plugin-vuex` / `@vue/cli-service` / `vue-template-compiler`

  
  

**漏洞包所在目录**：

- `node_modules/vue-template-compiler`





## 低危漏洞

共计 **1** 个


### vue
**漏洞描述**：

- ReDoS vulnerability in vue package that is exploitable through inefficient regex evaluation in the parseHTML function
  - npm漏洞编号：`1100238`
  - 漏洞详细说明：https://github.com/advisories/GHSA-5j4c-8p2g-v4jx
  - 漏洞等级：低危
  - 受影响的版本：`>=2.0.0-alpha.1 <3.0.0-alpha.0`


**依赖关系**：


- `my-site` / `vuex` / `vue`

  
  

**漏洞包所在目录**：

- `node_modules/vue`


 



