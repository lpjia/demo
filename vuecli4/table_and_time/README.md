## 单独的表格项目
用到了  
vue2  
element-ui  
vxe-table@3  
xe-utils@3  
dayjs


## 打包后的包
productionSourceMap: false,

dist1  
ElementUI全局引入  
import 'element-ui/lib/theme-chalk/index.css'; 样式文件需要单独引入

dist2  
ElementUI按需引入  
不用单独引入样式文件



## 引入 element-ui

全局引入
``` javascript
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
```

--------分隔线--------

按需引入

安装依赖包  
babel-plugin-component -D

``` javascript
// babel.config.js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 加配置项
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

如果是 .babelrc 配置文件
``` json
// .babelrc
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

怎么引入?

``` javascript
import { Button, Select } from 'element-ui';

Vue.use(Button)
Vue.use(Select)
```