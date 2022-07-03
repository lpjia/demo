import Vue from 'vue'
import JsonView from '@/components/JsonView.vue'

// 注册全局组件
Vue.component('JsonView', JsonView)
/**
 * 当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 <my-component-name>。
 * 
 * 当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。
 * 也就是说 <my-component-name> 和 <MyComponentName> 都是可接受的。注意，尽管如此，直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的。
 * 
 * 所以推荐用大驼峰注册
 */