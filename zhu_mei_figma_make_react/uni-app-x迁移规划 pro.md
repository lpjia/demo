# React → uni-app x 迁移规划

> 源文件：`src/App.tsx`（单文件应用，约 2700 行）
> 目标：uni-app x（UTS + `.uvue`，编译为 Android / iOS / HarmonyOS 原生应用）

---

## 1. 概述

| 维度 | 源项目（React） | 目标（uni-app x） |
| --- | --- | --- |
| 技术栈 | Vite + React 19 + Tailwind CSS 4 | uni-app x（Vue 3 语法 + UTS） |
| 视图语法 | JSX | `<template>` 模板 + 指令 |
| 状态 | `useState` / `useReducer` | `ref` / `reactive` |
| 样式 | Tailwind class + 内联 `style` 对象 | `<style>` 中的 CSS（rpx） |
| 依赖 | `big.js`、`dayjs` | 原生 API / UTS 手写替代 |
| 路由 | `useState<Screen>` 状态切换 | `pages.json` + `uni.navigateTo` / 底部 tabBar |
| 运行形态 | 网页中 390×844 手机框模拟 | 真机全屏原生应用 |

这是一款「工地管理系统」：登录 + 施工管理（楼栋 → 楼层 → 工种 → 施工项目 → 详情）+ 进出帐（收支记录 → 详情）。

---

## 2. 页面清单（Screen 拆分）

原 `App.tsx` 中的 `Screen` 联合类型共 9 个界面，迁移后一一对应为一个 `.uvue` 页面：

| React Screen | 标题 | 对应 uni-app x 页面 | 说明 |
| --- | --- | --- | --- |
| `login` | 工地管理系统 / 登录 | `pages/login/login.uvue` | 手机号 + 密码 + 登录按钮 |
| `overview` | 登封智慧城（总览） | `pages/overview/overview.uvue` | 施工 tab 首页，进度卡片 + 统计 + 最近上报 |
| `buildings` | 楼栋单元 | `pages/buildings/buildings.uvue` | 楼栋列表 |
| `floors` | 楼层 | `pages/floors/floors.uvue` | 楼层网格（-1 ~ 32 层） |
| `workerType` | 工种 | `pages/worker-type/worker-type.uvue` | 泥工/木工/乳胶漆/小工 |
| `workItems` | 施工项目 | `pages/work-items/work-items.uvue` | 项目列表卡片 |
| `detail` | 详情 | `pages/detail/detail.uvue` | 项目详情 + 责任人增删改 + 进度上报 |
| `ledger` | 收支记录 | `pages/ledger/ledger.uvue` | 进出帐 tab 首页 + 新增收支弹层 |
| `ledgerDetail` | 收支详情 | `pages/ledger-detail/ledger-detail.uvue` | 明细 + 修改弹层 + 附件预览 |

其中 `inputForm`（输入工程信息）在源码中已被注释掉，按项目约束**不迁移、不删除注释**。

---

## 3. 目标项目结构

```
try_figma_make_react_2-uni/            # 新建独立 uni-app x 工程（HBuilderX 创建）
├── App.uvue                           # 应用生命周期
├── main.uts                           # 入口（uni-app x 使用 UTS 入口）
├── pages.json                         # 页面路由 + 底部 tabBar 配置
├── manifest.json                      # 应用配置
├── uni.scss                           # 全局样式变量（颜色 Token）
├── pages/
│   ├── login/login.uvue
│   ├── overview/overview.uvue
│   ├── buildings/buildings.uvue
│   ├── floors/floors.uvue
│   ├── worker-type/worker-type.uvue
│   ├── work-items/work-items.uvue
│   ├── detail/detail.uvue
│   ├── ledger/ledger.uvue
│   └── ledger-detail/ledger-detail.uvue
├── components/                        # 抽取的公共组件
│   ├── status-badge.uvue              # StatusBadge
│   ├── screen-header.uvue             # ScreenHeader + BackButton
│   └── ledger-form-sheet.uvue         # LedgerFormSheet
├── common/                            # 公共数据与工具
│   ├── types.uts                       # 类型定义（WorkItem / LedgerEntry 等）
│   ├── tokens.uts                      # 颜色 Token（原 T 对象）
│   ├── data.uts                        # BUILDINGS / FLOORS / INITIAL_ITEMS 等常量
│   └── utils.uts                       # 日期格式化 / 金额精度
└── static/                            # 图标图片资源（替代内联 SVG）
    └── icons/
```

---

## 4. 语法 / 概念映射表

| 源（React / TSX） | 目标（uni-app x） |
| --- | --- |
| JSX 元素 `<div>` / `<button>` / `<span>` | `<view>` / `<button>` / `<text>` / `<image>` / `<input>` |
| `useState<T>(init)` | `const x = ref<T>(init)`（脚本内 `x.value`） |
| `setX(v)` / `setX(fn)` | `x.value = v` |
| 组件 props | `defineProps<{...}>()`（UTS 强类型） |
| 回调函数 prop（`navigate`、`onBack`） | 事件：`uni.$emit` / props 函数 / 页面导航 |
| `onClick` / `onChange` | `@click` / `@input`、`@change` |
| 内联 `style={{...}}` | `:style="{...}"` 或 class + CSS |
| Tailwind class（`flex`、`px-5`、`rounded-xl`…） | 手写 CSS 到 `<style>`，尺寸用 rpx |
| `className` 条件拼接 | `:class` 三元 / 数组 |
| `.map()` 渲染列表 | `v-for`（必须配 `:key`） |
| 条件渲染 `&&` / 三元 | `v-if` / `v-show` |
| 内联 `<svg>` 图标 | `<image>`（base64 或 static 资源）/ iconfont |
| `big.js` 金额 | 原生 `number` + `toFixed(2)`，或分（整数）为单位 |
| `dayjs().format()` | 原生 `Date` 手写 `formatDate` 工具 |
| `crypto.randomUUID()` | 时间戳 / 自增 id 替代 |
| `FileReader` + `<input type=file>` | `uni.chooseImage` 返回临时路径 |
| `<input type=date>` / `<select>` | `<picker mode="date">` / `<picker>` |
| 绝对定位遮罩弹层 | 页面内 `position: fixed` 遮罩 / `uni.showModal` |

---

## 5. 关键技术难点与方案

### 5.1 颜色 Token（原 `T` 对象）
迁移到 `uni.scss` 用 CSS 变量，或在 `tokens.uts` 导出常量对象。所有 `style={{ color: T.xxx }}` 改为 CSS 变量 `var(--xxx)` 或 `:style` 绑定。

### 5.2 金额精度（big.js）
UTS 环境不建议直接引 npm 的 `big.js`。方案：
- 用原生 `number`，格式化统一走 `toFixed(2)`；
- 若需严格避免浮点误差，金额以「分」（整数）存储，展示时除以 100。

### 5.3 日期（dayjs）
UTS 无 dayjs。方案：写 `formatDate(date, 'YYYY-MM-DD')` 等极简工具函数，覆盖源码中用到的 `getToday()`、`YYYY-MM-DD`、`MM-DD`、`YYYY年MM月DD日` 四种格式。

### 5.4 内联 SVG 图标
uni-app x 模板不支持内联 `<svg>`。方案：
- 将每个 `<path>` 导出为 base64 PNG，放入 `static/icons/`，用 `<image>` 渲染；
- 或用 iconfont 字体；颜色通过 CSS `color` / `tint-color` 控制。

### 5.5 附件上传与预览
- 上传：`uni.chooseImage`（支持多选），拿到临时路径直接作为 `<image src>`；
- 预览：`uni.previewImage`；
- 删除附件：从 `ref` 数组过滤。

### 5.6 弹层（责任新增/删除、新增收支）
Web 用绝对定位 + rgba 遮罩。方案：
- 简单确认（删除责任人）：用 `uni.showModal`；
- 复杂表单（新增/修改责任人、新增收支）：抽成 `popup` 组件或页面内 `position: fixed` 遮罩层，用 `v-if` 控制。

### 5.7 底部导航（施工 / 进出帐）
用 `pages.json` 的 `tabBar` 配置两页：`overview`、`ledger`。原「手机框 + 顶部状态栏 + 底部圆角」是网页演示外壳，真机下移除，由系统状态栏与原生 tabBar 替代。

### 5.8 页面间传参（对象类型）
`detail` 需要传 `item: WorkItem`、`ledgerDetail` 需要传 `entry: LedgerEntry` 等**对象**。URL query 只能传字符串。方案（二选一）：
- 对象 `JSON.stringify` 后放 query，接收方 `JSON.parse`；
- 用全局 store（`ref` 挂在公共模块）或 `uni.setStorageSync` 暂存当前选中项。

---

## 6. 迁移步骤（建议顺序）

1. **搭骨架**：HBuilderX 新建 uni-app x 工程；配 `pages.json`（9 页面 + tabBar）、`manifest.json`、`uni.scss` 颜色变量。
2. **公共层**：写 `common/types.uts`、`common/data.uts`、`common/tokens.uts`、`common/utils.uts`；抽 `status-badge.uvue`、`screen-header.uvue`。
3. **按页面逐个迁移**（从依赖最少的开始）：
   - `login` → `buildings` → `floors` → `worker-type` → `work-items` → `overview` → `detail`（含弹层）。
4. **进出帐链路**：`ledger`（含 `ledger-form-sheet`）→ `ledger-detail`。
5. **图标与样式收尾**：内联 SVG 全部替换、Tailwind class 全部落成 CSS、rpx 适配。
6. **自测**（不代执行编译，由用户手动验证）。

---

## 7. 迁移需遵守的项目约束（AGENTS.md）

1. 被注释掉的代码（如 `InputFormScreen`、多处 `{/* ... */}`）**不迁移、不删除、不改动**。
2. 改动已有逻辑时先注释原代码再新增（迁移重写为 `.uvue`，属新文件，不受影响，但需保留原文语义对照）。
3. 新增代码顶部用注释说明「为什么要这么改」。
4. 不执行编译/验证命令；不执行 `pnpm/npm install`，均由用户手动执行。

---

## 8. 待确认事项

1. 目标工程是**新建独立 uni-app x 工程**，还是在现有目录内新建子目录？建议新建独立工程。
2. 图标方案：base64 PNG / iconfont / 自行找替代图标，需用户确认倾向。
3. 金额精度：用 `toFixed(2)` 还是「分」为单位的整数存储？
4. 页面间对象传参：JSON 序列化还是全局 store？
