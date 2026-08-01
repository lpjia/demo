## 单独的表格项目
用到了  
vue2  
vxe-table@3  
vxe-pc-ui@3  
xe-utils@3


## vxe-table

v3版本适合vue2  
v4版本适合vue3


小版本之间有破坏性更新, 使用~, 不升级小版本  
"vxe-table": "~3.20.13"


vxe-table-one.vue 使用了 vxe-table: 3.7.5_vue@2.7.14 的API  
API有破坏性更新, 仅限参考, 跑不起来
可以看table_and_time项目, 能跑


vxe-table-two.vue 使用了  
  vxe-table:  
    specifier: ^3.20.13  
    version: 3.20.13(vue@2.7.16)


## 引入 vxe-table

"vxe-pc-ui": "3",  
"vxe-table": "~3.20.13",  
"xe-utils": "3"


全局引入
``` javascript
import 'xe-utils'
import VxeUIBase from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VxeUIBase)
Vue.use(VXETable)
```

--------分隔线--------

按需引入  
不推荐, 很麻烦, 还得装sass-lader(vue脚手架已内置)、sass等  
最关键的是vxe-toolbar组件内有很多vxe的基础组件, 一个个导入维护太麻烦

安装依赖包  
babel-plugin-import -D



``` javascript
// babel.config.js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 加配置项
  "plugins": [
    ['import', { libraryName: 'vxe-pc-ui', style: true }, 'vxe-pc-ui'],
    ['import', { libraryName: 'vxe-table', style: true }, 'vxe-table']
  ]
}
```


怎么引入?

``` javascript
import 'xe-utils'
import { VxeUI, VxeButton } from 'vxe-pc-ui'
import { VxeTable, VxeColumn, VxeToolbar } from 'vxe-table'

// 导入主题变量，也可以重写主题变量
import 'vxe-pc-ui/styles/cssvar.scss'
import 'vxe-table/styles/cssvar.scss'

// 导入默认的语言
import zhCN from 'vxe-pc-ui/lib/language/zh-CN'

VxeUI.setI18n('zh-CN', zhCN)
VxeUI.setLanguage('zh-CN')

Vue.use(VxeButton)
Vue.use(VxeTable)
Vue.use(VxeColumn)
Vue.use(VxeToolbar)

```