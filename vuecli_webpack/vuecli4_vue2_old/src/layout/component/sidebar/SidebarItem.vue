<template>
  <div v-if="!item.hidden">
    <template v-if="showOnlyOneMenu(item.children,item)">
      <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <Item :icon="showIcon(item)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </AppLink>
    </template>

    <!-- 子菜单 -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <Item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <SidebarItem v-for="child in item.children" :key="child.path" :is-nest="true" :item="child"
        :base-path="resolvePath(child.path)" class="nest-menu" />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item.vue'
import AppLink from './Link.vue'

export default {
  name: 'SidebarItem',
  components: {
    Item,
    AppLink,
  },
  props: {
    // 是否有子
    isNest: {
      type: Boolean,
      default: false
    },
    // 路由对象
    item: {
      type: Object,
      required: true
    },
    // 路径
    basePath: {
      type: String,
      default: ''
    },
  },
  data() {
    this.onlyOneChild = null
    return {};
  },
  computed: {
    showOnlyOneMenu() {
      // return (children, item) => {
      //   return this.hasOneShowingChild(children, item) && !this.onlyOneChild.children
      // }

      return (children, item) => this.hasOneShowingChild(children, item) &&
        // (!this.onlyOneChild.children || this.onlyOneChild.noShowingChildren) &&
        (!this.onlyOneChild.children) &&
        !item.alwaysShow
    },
    showIcon() {
      // return item => {
      //   return this.onlyOneChild.meta.icon || (item.meta && item.meta.icon)
      // }

      return item => this.onlyOneChild.meta.icon || (item.meta && item.meta.icon)
    },
  },
  methods: {
    // 解析路径
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
    // 是否有一个需要显示的路由
    hasOneShowingChild(children = [], parent) {
      // 获取子路由数组
      const showingChildren = children.filter(item => {
        // 有 hidden 则不显示(不放入)
        if (item.hidden) {
          return false
        } else {
          // 只有一个子路由
          this.onlyOneChild = item
          return true
        }
      })

      // 只有一个子路由时，默认显示子路由
      if (showingChildren.length === 1) return true

      // 如果没有要显示的子路由，则显示父路由
      if (showingChildren.length === 0) {
        // this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        this.onlyOneChild = { ...parent, path: '' }
        return true
      }

      return false
    },
  },
};
</script>

<style scoped lang="scss">
</style>
