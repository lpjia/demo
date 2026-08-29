# React → uni-app x 迁移详细方案

> 源文件：`src/App.tsx`（单文件应用，2708 行）
> 目标：uni-app x（UTS + `.uvue`，编译为 Android / iOS / HarmonyOS 原生应用）
> 本文是 `uni-app-x迁移规划 pro.md` 的细化版，补充每个页面/组件/数据层的具体迁移规格。

---

## 0. 前置决策（在动工前需先确认）

| 决策点 | 选项 | 建议 | 影响范围 |
| --- | --- | --- | --- |
| 目标工程位置 | 新建独立工程 / 现有目录子目录 | **新建独立工程** `try_figma_make_react_2-uni/` | 全局 |
| 图标方案 | base64 PNG / iconfont / 自找素材 | 建议 **base64 PNG 放 static/icons/**，颜色固定、改动小 | 全部内联 SVG |
| 金额精度 | `toFixed(2)` / 分为单位整数 | 建议 **`number` + `toFixed(2)`**（数据量小、展示优先） | ledger、detail |
| 页面间对象传参 | JSON 序列化 / 全局 store | 建议 **全局 store**（`ledgerEntries` 本身就需要全局共享） | detail、ledgerDetail |
| 弹层实现 | 页面内 `position: fixed` 遮罩 / 独立 popup 组件 | 建议 **页面内 fixed 遮罩**（与源码结构一致，改动最小） | detail、ledger |

> 除以上外，本文默认按「建议」列推进。若用户选择不同方案，仅需调整对应小节。

---

## 1. 数据层设计（`common/`）

### 1.1 `common/types.uts` —— 类型定义

| 源类型 | UTS 定义 | 字段 |
| --- | --- | --- |
| `ResponsiblePerson` | `type ResponsiblePerson = { name: string; unitPrice: number }` | name、unitPrice |
| `WorkItem` | `type WorkItem = { type: string; area: string; sqm: number; status: string; cost: number; responsiblePeople: ResponsiblePerson[] }` | 注意 `status` 是字符串字面量联合 `"已完工"\|"施工中"\|"待施工"`，UTS 建议直接用 `string` 或枚举 |
| `LedgerType` | `type LedgerType = "income" \| "expense"` | 收入/支出 |
| `LedgerAttachment` | `type LedgerAttachment = { id: string; name: string; url: string }` | id、name、url |
| `LedgerEntry` | `type LedgerEntry = { id: number; type: LedgerType; label: string; name?: string; amount: number; date: string; note: string; channel?: string; purpose?: string; attachments?: LedgerAttachment[] }` | 可选字段在 UTS 需写成 `name: string | null` 或带默认值 |
| `LedgerFormState` | `type LedgerFormState = { date: string; type: LedgerType; amount: string; channel: string; purpose: string; name: string; attachments: LedgerAttachment[] }` | 表单态（amount 是字符串） |

> **UTS 注意**：可选属性（`name?`、`channel?`、`purpose?`、`attachments?`）在 UTS 中不可用 `?` 简写（严格模式），需显式声明为 `string | null` / `LedgerAttachment[] | null`，或在初始化时全部给默认值（`name: ""`、`channel: ""`、`purpose: ""`、`attachments: []`）。

### 1.2 `common/data.uts` —— 常量

| 源常量 | 内容 | UTS 形态 |
| --- | --- | --- |
| `BUILDINGS` | 5 栋：`["1号楼一单元","1号楼二单元","2号楼一单元","2号楼二单元","3号楼一单元"]` | `export const BUILDINGS: string[] = [...]` |
| `FLOORS` | 34 层：`["-1层","1层",..."32层"]` | `export const FLOORS: string[] = [...]` |
| `WORKER_TYPE` | 4 工种：`["泥工","木工","乳胶漆","小工"]` | `export const WORKER_TYPE: string[] = [...]` |
| `INITIAL_ITEMS` | 3 条初始施工项目 | `export const INITIAL_ITEMS: WorkItem[] = [...]` |
| `RECENT_RECORDS` | 3 条最近上报（含 `building/floor/type/status/time`） | 定义内联匿名结构或单独 `type RecentRecord` |
| `TRANSFER_CHANNELS` | 3 渠道：微信/支付宝/银行卡转账 | `export const TRANSFER_CHANNELS: string[] = [...]` |
| `EXPENSE_PURPOSES` | 4 用途：工资支出/物料采购/加油/其它 | `export const EXPENSE_PURPOSES: string[] = [...]` |
| `LEDGER_ENTRIES` | 6 条初始收支 | `export const LEDGER_ENTRIES: LedgerEntry[] = [...]` |

> **约束**：`INITIAL_ITEMS` 第 3 条 `踢脚线` 中有一行被注释掉的 `// { name: "张三", unitPrice: 300 }`，迁移时保留「空数组」语义（`responsiblePeople: []`），不复制该注释行内容。

### 1.3 `common/tokens.uts` —— 颜色 Token

源 `T` 对象共 24 个色值，按语义分组导出：

| 组 | 变量 | 值 |
| --- | --- | --- |
| 基础 | `bg` / `surface` / `surfaceAlt` / `border` / `borderStrong` | `#FFFFFF` / `#F8F9FB` / `#F0F2F5` / `#E8EBF0` / `#D1D5DB` |
| 文字 | `text` / `textSecondary` / `textTertiary` | `#111827` / `#6B7280` / `#9CA3AF` |
| 橙(施工) | `orange` / `orangeLight` / `orangeBorder` | `#F97316` / `#FFF7ED` / `#FED7AA` |
| 绿(收入) | `green` / `greenLight` / `greenBorder` | `#16A34A` / `#F0FDF4` / `#BBF7D0` |
| 红(删除) | `danger` / `dangerLight` / `dangerBorder` | `#DC2626` / `#FEF2F2` / `#FECACA` |
| 黄(施工中) | `amber` / `amberLight` / `amberBorder` | `#D97706` / `#FFFBEB` / `#FDE68A` |
| 灰(待施工) | `slate` / `slateLight` / `slateBorder` | `#64748B` / `#F8FAFC` / `#E2E8F0` |

> **建议**：两套并置 —— `tokens.uts` 导出 `const` 供 `<script>` 内 `:style` 绑定使用；`uni.scss` 用 `$color-*` SCSS 变量供 `<style>` 内直接引用。避免重复硬编码。
>
> **额外注意**：源码中还有 3 处**未进 T 对象**的硬编码色值，需在 tokens 中一并登记：
> - `#E11D48`（支出红色）、`#FFF1F2`（支出浅红）、`#FECDD3`（支出红边框）—— 建议补 `expense` / `expenseLight` / `expenseBorder`。
> - `#5bc0de`（「添加责任人」按钮的青色背景）。
> - `#6d6d6d`（负楼层 `-1层` 的深灰背景）。

### 1.4 `common/utils.uts` —— 工具函数

| 源实现 | 需求 | UTS 实现 |
| --- | --- | --- |
| `dayjs().format('YYYY-MM-DD')` | `getToday()` | `formatDate(new Date(), 'YYYY-MM-DD')` |
| `dayjs(e.date).format("MM-DD")` | 列表短日期 | `formatDate(date, 'MM-DD')` |
| `dayjs(entry.date).format("YYYY年MM月DD日")` | 详情长日期 | `formatDate(date, 'YYYY年MM月DD日')` |
| `new Big(x).toFixed(2)` | 金额精度 | `toMoney(n: number): string` → `n.toFixed(2)` |
| `crypto.randomUUID()` | 附件唯一 id | `Date.now() + 自增计数` 组合 |
| `Number(new Big(...).toFixed(2))` | 金额解析 | `Number(x.toFixed(2))` 或 `Math.round(x*100)/100` |

> `formatDate` 只需支持三种格式字符串 + 一个参数即可覆盖全部调用点（见上表 3 处）。

### 1.5 全局 store（`common/store.uts`）

由于 `ledgerEntries` 在 React 中挂在 `App` 根组件、通过 props 层层下传（`LedgerScreen` / `LedgerDetailScreen` 的 `setEntries`），迁移后改为全局响应式状态，避免跨页面传函数：

```text
export const ledgerEntries = ref<LedgerEntry[]>(LEDGER_ENTRIES)
```

- `ledger` 页与 `ledger-detail` 页直接 `import { ledgerEntries }` 读写，替代 props 下传 `setEntries`。
- 「当前选中项」传参：`detail` 页的 `item: WorkItem`、`ledgerDetail` 页的 `entry: LedgerEntry` 为对象。**方案二选一**（见第 8 节）：推荐 `JSON.stringify` 放 query + `onLoad` 里 `JSON.parse`，简单直接；若担心长 URL，可在 store 加 `currentItem` / `currentEntry` 暂存。

---

## 2. 公共组件设计（`components/`）

### 2.1 `status-badge.uvue`（源 `StatusBadge`）

- **Props**：`status: string`。
- **逻辑**：查表 `已完工→绿 / 施工中→黄 / 待施工→灰`，`?? 待施工` 兜底。
- **模板**：`<view class="badge">`，`:style` 绑定 `background/color/border` 三色。
- **样式**：`px: 20rpx; py: 4rpx; border-radius: 999rpx; font-size: 24rpx; font-weight: 500`。

### 2.2 `screen-header.uvue`（源 `ScreenHeader` + `BackButton`）

- **Props**：`title: string`、`subtitle?: string`、`showBack: boolean`（原 `onBack?` 改为布尔 + `$emit`）。
- **事件**：`@back`（点击返回）。
- **模板**：
  - `showBack` 为真时，顶部渲染返回区：左箭头 `<image>` + 文字「返回」，点击 `$emit('back')`。
  - `title`（`font-size: 36rpx; font-weight: 600`）。
  - `subtitle` 可选（`font-size: 24rpx; color: textTertiary`）。
- **返回箭头 SVG**：源 `M11 4L6 9L11 14`，导出为 base64 PNG（或 iconfont）。

### 2.3 `ledger-form-sheet.uvue`（源 `LedgerFormSheet`）

这是最复杂的公共组件，承载新增/修改收支两种模式。迁移规格：

- **Props**：`mode: "create" | "edit"`、`initialEntry: LedgerEntry | null`。
- **事件**：`@close`、`@save`（`$emit('save', entry: LedgerEntry)`）。
- **内部状态**：`ledgerForm: ref<LedgerFormState>`（初始化走 `createLedgerForm(initialEntry)`，逻辑照搬到组件内）。
- **表单字段**（对应 `common/data.uts` 常量）：
  1. 日期：`<picker mode="date">`（源 `<input type=date>`），默认 `getToday()`。
  2. 类别：支出/收入 两段式切换（`<view>` 分段控件），源中点击切换时若切到收入要清空 `purpose`。
  3. 金额：`<input type="digit">` + 正则 `/^\d*(\.\d{0,2})?$/` 限制两位小数，失焦时 `toFixed(2)`。
  4. 转账渠道：`<picker :range="TRANSFER_CHANNELS">`（源 `<select>`）。
  5. 支出用途：仅 `type==="expense"` 时 `v-if` 显示，`<picker :range="EXPENSE_PURPOSES">`。
  6. 名称：`<input>` 选填。
  7. 附件：多图宫格（见 §2.3.1）。
- **保存校验 `canSaveLedger`**（源逻辑逐条对应）：
  - `date` 非空 && `amount` 为有限正数 && `channel` 非空 && （收入 或 `purpose` 非空） && （有附件 或 `mode==="edit"`）。
- **保存 `saveLedger`**：组装 `LedgerEntry`（`label` 取 `name` 或 `purpose` 或「收入入账」；`note` 按收入/支出拼接 `channel`/`purpose·channel`）。
- **底部按钮**：取消 / 保存，保存按钮 `disabled=!canSaveLedger`，背景色按支出 `#E11D48` / 收入 `green`。

#### 2.3.1 附件子逻辑

- 添加：`uni.chooseImage({ count: 9 })`，返回 `tempFilePaths`，逐张映射为 `LedgerAttachment`（`id` 用时间戳+计数，`name` 取文件名，`url` 取临时路径）。
- 删除：从 `attachments` 数组 `filter` 掉对应 id。
- 预览：详情页用 `uni.previewImage`（见 §7.2）。

### 2.4 `ledger-detail-row.uvue`（源 `LedgerDetailRow`）

- **Props**：`label: string`、`value: string`、`valueColor?: string`（默认 `T.text`）。
- **模板**：左 label（`textTertiary` 小字）、右 value（右对齐、`valueColor`）。

---

## 3. 页面逐页迁移规格

> 每个页面按「状态 → 模板结构 → 事件 → 传参 → 样式要点」五段描述。

### 3.1 `pages/login/login.uvue`（源 `LoginScreen`）

- **状态**：`phone: ref("")`、`password: ref("")`、`showPwd: ref(false)`。
- **模板**：
  1. 顶部装饰区（渐变 `#FFF7ED→#FFFFFF`）：房子图标 + 「工地管理系统」+「登录您的账户以继续」。
  2. 手机号输入：`<input type="number" maxlength="11">`，左侧手机图标，聚焦描边变橙。
  3. 密码输入：`<input :password="!showPwd">`，左侧锁图标，右侧眼睛切换 `showPwd`。
  4. 登录按钮：橙色大按钮 → `uni.switchTab` 或 `uni.navigateTo` 到 `overview`。
- **事件**：登录按钮点击 → 跳转总览（源码未做真实校验，直接跳）。
- **被注释项（不迁移）**：「忘记密码？」、「服务条款/隐私政策」。
- **样式要点**：`pt-14` 大留白对应顶部安全区（用 `padding-top: calc(安全区 + 112rpx)`），渐变用 `linear-gradient`。

### 3.2 `pages/overview/overview.uvue`（源 `OverviewScreen`）

- **状态**：无（纯展示，读 `RECENT_RECORDS` 常量）。
- **模板**：
  1. 顶栏：「工地管理」小字（橙色大写）+「登封智慧城」大标题；右侧头像占位（**被注释，不迁移**）。
  2. 进度卡片（整体 `@click` 跳 `buildings`）：左侧「总体施工进度 + 5% + 点击查看楼栋详情 →」，右侧环形进度图（**SVG 圆形 strokeDasharray**，需用 canvas 或静态图片替代，见 §7.3）。
  3. 统计三宫格：已完工 1 / 施工中 2 / 待施工 30（绿/黄/灰）。
  4. 最近上报记录列表：3 条卡片（`RECENT_RECORDS`），含 `building·floor`、`type`、`StatusBadge`、`time`。
- **事件**：进度卡片 → `navigateTo buildings`。
- **被注释项**：顶部头像、「查看更多 →」。
- **样式要点**：环形进度是最大难点（§7.3）。

### 3.3 `pages/buildings/buildings.uvue`（源 `BuildingsScreen`）

- **状态**：无。
- **模板**：`ScreenHeader`（title「楼栋单元」+ 返回）+ 5 张楼栋卡片（`v-for BUILDINGS`）。
  - 卡片：序号块（`i+1`）+ 楼栋名 + 「共 {10 + i*2} 层，已完工 0 层」+ 右箭头。
- **事件**：卡片点击 → `navigateTo floors?building=<name>`。
- **传参**：`building: string`（字符串，直接 URL query）。
- **样式要点**：序号块背景 `surfaceAlt`（源码中被注释的第一栋高亮样式不迁移）。

### 3.4 `pages/floors/floors.uvue`（源 `FloorsScreen`）

- **状态**：无。
- **模板**：`ScreenHeader`（title=`building`、subtitle「楼层」+ 返回）+ 三列网格（`v-for FLOORS`）。
  - 每格：`f.startsWith("-")` 为负楼层 → 深灰底白字；否则白底黑字。
- **事件**：楼层点击 → `navigateTo worker-type?building=&floor=`（源码中跳 `workItems` 的那行**被注释**，实际跳 `workerType`，迁移跟随实际生效逻辑）。
- **传参**：`building`、`floor` 均为字符串。
- **样式要点**：`grid-cols-3` → CSS grid 或 flex wrap，格子 `py-3.5`。

### 3.5 `pages/worker-type/worker-type.uvue`（源 `WorkerTypeScreen`）

- **状态**：无。
- **模板**：`ScreenHeader`（title=`building · floor`、subtitle「工种」+ 返回）+ 4 张工种卡片（`v-for WORKER_TYPE`）。
  - 卡片：序号 + 工种名 + `{100 - i*20}%` 进度 + `StatusBadge`（100%→已完工，否则施工中）+ 右箭头。
- **事件**：卡片点击 → `navigateTo work-items?building=&floor=`（源中跳 `floors` 的行**被注释**）。
- **传参**：`building`、`floor`。

### 3.6 `pages/work-items/work-items.uvue`（源 `WorkItemsScreen`）

- **状态**：`items: ref<WorkItem[]>(INITIAL_ITEMS)`（源码只用 `useState` 不更新）。
- **模板**：
  1. `ScreenHeader`（title=`building · floor`、subtitle「施工项目」+ 返回）。
  2. 项目卡片列表（`v-for items`），每张卡片：
     - 第一行：序号 + `type` + `·` + `area` + `StatusBadge` + 右箭头；整行 `@click` → `detail`。
     - 分割线。
     - 第二行三列指标：平方（`sqm m²`）/ 费用（`¥cost`）/ 责任人（空则「无」，否则第一个名字）。
- **事件**：卡片首行点击 → `navigateTo detail?building=&floor=&item=<JSON>`。
- **传参**：`item: WorkItem` 为**对象**，需 JSON 序列化（§8）。
- **被注释项**：「新增工程项目」按钮。

### 3.7 `pages/detail/detail.uvue`（源 `DetailScreen`）—— 最复杂页面

- **状态**（对应源 `useState`）：
  | 状态 | 初始 | 说明 |
  | --- | --- | --- |
  | `status` | `item.status` | 当前状态（仅展示，源里没被 set 更新） |
  | `progress` | `null` | `30/50/80/100/null` |
  | `responsiblePeople` | `item.responsiblePeople.map({...})` | 深拷贝 |
  | `personFormMode` | `null` | `{type:"add"} \| {type:"edit",personIndex} \| null` |
  | `personForm` | `{name:"",unitPrice:""}` | 表单 |
  | `deletePersonIndex` | `null` | `number \| null` |
- **派生**：`personToDelete`（`deletePersonIndex===null ? null : responsiblePeople[i]`）、`parsedUnitPrice = Number(personForm.unitPrice)`、`canSavePerson`（name 非空 && unitPrice 非空 && 有限数 && ≥0）。
- **模板**：
  1. `ScreenHeader`（title=`building · floor`、subtitle「详情」+ 返回）。
  2. 信息卡（2×2 网格）：工种 / 区域 / 平米数 / 当前状态（`StatusBadge`）。
  3. 「添加责任人」青色按钮（`#5bc0de`）→ `openAddPerson`。
  4. 责任人列表（`v-for responsiblePeople`），每张卡：
     - 姓名 + 「修改」「删除」按钮（改/删图标 SVG）。
     - 单价 `unitPrice 元/平方米` + 工价 `unitPrice * item.sqm 元`。
  5. 「已产生造价」横幅：`item.cost 元`。
  6. 「上报施工进度」卡：4 个进度按钮（30/50/80/100，选中高亮橙）+「确认上报」按钮（`disabled=progress===null`，点击返回 work-items）。
  7. 弹层一：`personFormMode` 非空时显示遮罩 + 表单（责任人 + 单价，取消/保存，保存 `disabled=!canSavePerson`）。
  8. 弹层二：`personToDelete` 非空时显示遮罩 + 删除确认（取消/确认删除）。
- **事件/方法**（照搬源函数，`useState` setter 改 `ref.value`）：
  - `openAddPerson` / `openEditPerson(i)` / `closePersonForm` / `savePerson`（add 时 push `{...values, workDays:1}`，edit 时 map 替换）/ `confirmDeletePerson`（filter 掉）。
  - 进度按钮 `setProgress(value)`。
- **传参**：`onLoad` 收 `building`、`floor`、`item(JSON)`。
- **被注释项**：信息卡上方的旧 `ScreenHeader` 标题版本、「责任人列表旧样式」「师傅工价」「小工工价」「物料花费」「提交施工进度」「该区域完工」整段。
- **弹层实现**：`position: fixed; inset 0; background rgba(17,24,39,0.38)`，表单从底部弹起；删除确认居中。`v-if` 控制。

### 3.8 `pages/ledger/ledger.uvue`（源 `LedgerScreen`）

- **状态**：`tab: ref<"all"|"income"|"expense">("all")`、`showLedgerForm: ref(false)`。
- **派生**：`totalIncome` / `totalExpense`（filter+reduce）、`filtered`（按 tab 过滤）。
- **模板**：
  1. 顶栏：「进出帐」小字 +「收支记录」大标题 + 右侧「新增」绿色按钮 → `showLedgerForm=true`。
  2. 汇总两宫格：总收入（绿）/ 总支出（红 `#E11D48`），各 `toFixed(2)`。
  3. 过滤 tab：全部/收入/支出 三段。
  4. 收支列表（`v-for filtered`）：图标（收入↑/支出↓）+ `label` + `channel · MM-DD` + `+/-¥amount` + 查看详情按钮。
  5. 弹层：`showLedgerForm` 为真时渲染 `LedgerFormSheet mode="create"`。
- **事件**：
  - 新增 → 开弹层。
  - `saveLedger(entry)`：`entries.unshift({...entry, id: maxId+1})` 后关弹层（源用 `Math.max(0,...ids)+1`）。
  - 列表项详情按钮 → `navigateTo ledger-detail?entry=<JSON>`。
- **被注释项**：「净收入」卡。
- **数据来源**：`import { ledgerEntries } from "@/common/store.uts"`。

### 3.9 `pages/ledger-detail/ledger-detail.uvue`（源 `LedgerDetailScreen`）

- **状态**：`previewAttachment: ref<LedgerAttachment|null>(null)`、`showEditForm: ref(false)`。
- **派生**：`isExpense`、`accent`（`#E11D48`/`green`）、`accentLight`、`accentBorder`、`attachments = entry.attachments ?? []`。
- **模板**：
  1. 顶栏：`BackButton` + 「收支记录」小字 + 「收支详情」大标题 + 「修改」按钮（accent 色）→ `showEditForm=true`。
  2. 金额横幅（accentLight 底）：图标 + `label` + `+/-¥amount`。
  3. 明细区（`LedgerDetailRow` 列表）：日期（`YYYY年MM月DD日`）/ 类别 / 金额 / 转账渠道 / 支出用途（仅支出）/ 名称。
  4. 附件区：3 列宫格；无附件显示「未上传附件」虚线框；点击附件 → `previewAttachment=attachment`。
  5. 附件预览遮罩：`uni.previewImage`（源用自定义遮罩，见 §7.2）。
  6. 修改弹层：`showEditForm` 时渲染 `LedgerFormSheet mode="edit" :initialEntry="entry"`。
- **事件**：
  - 修改保存 → `setEntries(map 替换同 id)` 后关弹层并刷新当前 `entry`（源 `navigate({id:"ledgerDetail", entry: updatedEntry})`，迁移为更新 store 后本地刷新）。
  - 返回 → `navigateBack`。
- **传参**：`entry` 对象（JSON）。

---

## 4. 路由与 tabBar（`pages.json`）

```text
pages（首个为启动页）:
  pages/login/login            # 启动页
  pages/overview/overview
  pages/ledger/ledger
  pages/buildings/buildings
  pages/floors/floors
  pages/worker-type/worker-type
  pages/work-items/work-items
  pages/detail/detail
  pages/ledger-detail/ledger-detail

tabBar（list 2 项）:
  - 施工 → pages/overview/overview（橙色图标 + 文字「施工」）
  - 进出帐 → pages/ledger/ledger（绿色图标 + 文字「进出帐」）
```

- **tabBar 图标**：源 `mainTabs` 两个 SVG（房子、货币符号），导出 base64 PNG 作 `iconPath` / `selectedIconPath`（激活态橙/绿，非激活 `textTertiary` 灰）。
- **登录页隐藏 tabBar**：`login` 不进 tabBar 页面（用 `uni.reLaunch` 或登录成功后 `uni.switchTab` 到 `overview`；登录页本身无 tabBar）。
- **底部 tabBar 高亮条**（源中 tab 顶部的 `w-8 h-0.5` 指示条）由原生 tabBar 的选中态替代，不单独实现。
- **移除网页外壳**：源 Root 里的「390×844 手机框 + 圆角 + 阴影 + 顶部状态栏（9:41、信号/电量）」全部删除，由真机系统状态栏替代。

---

## 5. 样式迁移细则

### 5.1 Tailwind class → CSS 映射（高频项）

| Tailwind | 说明 | rpx/CSS |
| --- | --- | --- |
| `flex` / `flex-col` / `items-center` / `justify-between` / `gap-*` | 布局 | `display:flex; flex-direction; align-items; justify-content; gap` |
| `p-4` / `px-5` / `py-3` / `pt-4` / `pb-3` | 内边距 | `padding: 32rpx`（`1rem=32rpx` 近似，实际按 750 设计稿换算） |
| `rounded-xl` / `rounded-2xl` / `rounded-full` | 圆角 | `border-radius: 24rpx / 32rpx / 999rpx` |
| `text-xs` / `text-sm` / `text-base` / `text-lg` / `text-xl` / `text-2xl` / `text-5xl` | 字号 | `24/28/32/36/40/48/80 rpx` |
| `font-semibold` / `font-bold` / `font-medium` / `font-mono` | 字重 | `font-weight: 600/700/500`（`font-mono` 用等宽数字字体，UTS 可忽略或用系统等宽） |
| `grid grid-cols-2/3/4 gap-*` | 网格 | CSS `display:grid; grid-template-columns: repeat(n,1fr); gap` |
| `truncate` / `min-w-0` / `shrink-0` / `flex-1` | 截断/伸缩 | `text-overflow:ellipsis; overflow:hidden; white-space:nowrap` / `flex-shrink:0` / `flex:1` |
| `active:scale-[0.98]` / `active:opacity-60` | 按压反馈 | `:active { transform: scale(0.98) }`（或 `<button>` 自带） |
| `shadow` 系列 | 阴影 | `box-shadow` |
| `scrollbar-hide` | 隐藏滚动条 | `::-webkit-scrollbar{display:none}` 或 `<scroll-view>` |

> **rpx 换算基准**：源以 390px 宽设计（`px-5=20px`）。uni-app x 以 750rpx 为屏宽，换算系数约 `1px ≈ 2rpx`（750/375）。建议统一按此换算，个别依赖像素值处微调。

### 5.2 内联 `style={{...}}` → `:style` 绑定

- 凡依赖状态/循环变量的动态色（如 `status` 查表、`active` 高亮、`isNeg` 负楼层），保留 `:style` 绑定。
- 静态样式全部下沉到 `<style>`，避免模板里堆 `:style` 对象。
- 源码里直接写死色值的 3 处（`#E11D48`/`#FFF1F2`/`#FECDD3`、`#5bc0de`、`#6d6d6d`）登记到 tokens（§1.3）。

---

## 6. 图标（内联 SVG → 静态资源）清单

源码内联 SVG 共约 **20 处**，按复用度分类：

| 图标 | 出现位置 | 处理 |
| --- | --- | --- |
| 右箭头 `M6 3L11 8L6 13` | buildings / workerType / workItems / ledger 详情按钮 | 1 个，复用 |
| 返回箭头 `M11 4L6 9L11 14` | BackButton | 1 个 |
| 加号 `M7 2v10M2 7h10`（14/16/12 尺寸） | 新增按钮、添加工时 | 1 个，按需缩放 |
| 房子 `M3 9l9-7...` | overview 进度卡、login 顶部 | 1 个 |
| 编辑铅笔 | detail 修改、ledgerDetail 修改 | 1 个 |
| 删除垃圾桶 | detail 删除、确认删除 | 1 个 |
| 关闭 `M6 6l12 12...` | 各弹层关闭 | 1 个 |
| 收入↑ / 支出↓ 箭头 | ledger 列表、表单类别、ledgerDetail | 2 个 |
| 手机 / 锁 / 眼睛(开/闭) | login | 4 个 |
| 环形进度图（canvas 特殊） | overview | 见 §7.3 |

> 方案：将每个 SVG 的 `path` 用固定颜色（当前用到的颜色已知）渲染成 base64 PNG 存 `static/icons/`，`<image>` 引用。或改用 iconfont（推荐，颜色可用 `color` 控制、体积小）。**具体倾向待用户确认（待确认事项 #2）**。

---

## 7. 关键技术难点细案（在 pro.md 基础上深化）

### 7.1 金额精度（big.js → number）

- 展示：统一 `toMoney(n) = Number(n).toFixed(2)`。
- 计算：汇总 `totalIncome/totalExpense` 用 `reduce` 累加 number，浮点误差在 6 条数据量下可忽略，展示时 `toFixed(2)` 修正。
- 输入：`amount` 存字符串，正则 `/^\d*(\.\d{0,2})?$/` 拦截非法输入，失焦 `toFixed(2)`。
- 若后续要严格无误差，改「分」为整数存储（`amount` 存 `Math.round(x*100)`），展示 `(cents/100).toFixed(2)`——**作为可选项留给用户（待确认 #3）**。

### 7.2 附件上传与预览

- 上传：`uni.chooseImage({ count: 9, sizeType:['compressed'], sourceType:['album','camera'] })`，`tempFilePaths` 逐个 `push` 成 `LedgerAttachment`。
- 预览：
  - 表单宫格删除：`filter`。
  - 详情页预览：用 `uni.previewImage({ urls, current })` 替代源自定义黑色遮罩（体验更佳、代码更少）。
- **注意**：源用 `FileReader.readAsDataURL` 得到 base64 存内存；uni 用临时路径 `tempFilePath` 更省内存，但**临时路径在 app 重启后失效**。若需持久化，后续接 `uni.saveFile` / 上传服务器（本期按临时路径实现即可，属演示数据）。

### 7.3 环形进度图（overview 的 5% 环）

源用两个 `<circle>` + `strokeDasharray` 画环。uni-app x 模板不支持 SVG：

- **方案 A（推荐，简单）**：预渲染一张「5% 橙色环」base64 PNG 静态图放 `static/`，`<image>` 直接展示（进度固定 5%，无需动态）。
- **方案 B（动态）**：用 `canvas`（uni-app x 支持 `<canvas>` + 绘制 API）画弧；仅当进度需要动态变化时才值得。
- **方案 C**：conic-gradient CSS 圆环（`background: conic-gradient(orange 5%, gray 0)` 盖中心圆）。需确认 uni-app x 对 conic-gradient 的支持。

> 因 overview 进度为硬编码 `5%`，推荐 **方案 A**。

### 7.4 页面间对象传参

- **detail**：`onLoad(query)` 收 `building`、`floor`、`item`（`JSON.stringify(item)`），`JSON.parse(query.item)` 还原。
- **ledgerDetail**：同理传 `entry`（`JSON.stringify(entry)`）。
- **替代**：store 中加 `currentItem`/`currentEntry`，跳转前 `store.currentItem = item`，目标页 `onShow` 读取。
- **推荐 JSON 序列化**（对象小、无循环引用、代码直观）。若 entry 含附件数组（url 临时路径）整体 JSON 也安全。

### 7.5 弹层（遮罩 + 底部弹出）

- detail 的「新增/修改责任人」与「删除确认」、ledger 的「新增/修改收支」，统一用页面根节点内 `<view class="mask">`：
  ```text
  <view v-if="personFormMode" class="mask">
    <view class="sheet"> ... </view>
  </view>
  .mask { position: fixed; inset: 0; background: rgba(17,24,39,0.38); z-index: 50; }
  ```
- 删除确认用 `uni.showModal` 可替代，但源中有自定义样式（红图标标题），若保留视觉一致则沿用自定义遮罩；若接受系统样式则用 `uni.showModal` 简化。

### 7.6 登录跳转与 tabBar

- 源 `login → overview` 是纯 state 切换；迁移后 login 不进 tabBar，登录成功后 `uni.switchTab({ url: '/pages/overview/overview' })`。
- 需要处理「已登录」状态持久化（可选，非本期必需）。

---

## 8. 迁移步骤（细化后的执行顺序）

| 阶段 | 内容 | 产出 | 校验点 |
| --- | --- | --- | --- |
| 0 | 建工程骨架 | HBuilderX 新建 uni-app x 工程；`pages.json`（9 页 + tabBar）、`manifest.json`、`uni.scss` | 页面可注册、tabBar 可见 |
| 1 | 数据与工具层 | `types.uts`、`data.uts`、`tokens.uts`、`utils.uts`、`store.uts` | 类型/常量/工具齐全 |
| 2 | 公共组件 | `status-badge`、`screen-header`、`ledger-detail-row`、`ledger-form-sheet` | 组件可复用 |
| 3 | 施工链路页面 | login → buildings → floors → worker-type → work-items → detail | 逐页可跳转、传参正确 |
| 4 | 进出帐链路 | ledger（含表单弹层）→ ledger-detail（含预览/修改） | 增删改查闭环 |
| 5 | 图标与样式收尾 | SVG 全部替换、Tailwind 落 CSS、rpx 适配、环形图 | 视觉与源一致 |
| 6 | 用户自测 | （不代执行编译/验证） | 用户手动验证 |

> 依赖关系：阶段 1、2 是 3、4 的前置；3 与 4 可并行（依赖各自数据层）。

---

## 9. 迁移需遵守的项目约束（AGENTS.md）

1. **被注释掉的代码**（`InputFormScreen`、`{/* ... */}` 多处、`// navigate(...)` 旧跳转等）**一律不迁移、不删除、不改动**。
2. 改动已有逻辑先注释原代码再新增；本迁移是「新建 `.uvue` 文件」不触碰源 `App.tsx`，但需**保留原文语义对照**（关键逻辑处注释说明对应源码行）。
3. 新增代码顶部用注释说明「为什么这么改」。
4. **不执行编译/验证命令，不执行 `pnpm/npm install`**，均由用户手动执行。

---

## 10. 待确认事项（动工前必须答复）

1. 目标工程位置：**新建独立 uni-app x 工程** 还是现有目录内子目录？（建议独立工程）
2. 图标方案：base64 PNG / iconfont / 自找替代素材？
3. 金额精度：`toFixed(2)` 还是「分」为单位的整数存储？
4. 页面间对象传参：JSON 序列化 还是 全局 store 暂存？
5. 弹层：保留自定义遮罩样式 还是 部分改用 `uni.showModal`？
6. 环形进度图：静态 base64 PNG（推荐，因固定 5%）还是 canvas 动态绘制？
