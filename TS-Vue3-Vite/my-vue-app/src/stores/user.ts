import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { MenuRes } from "@/api/login";

// 组合式写法, 每一种写法都试试
export const useUserStore = defineStore('user', () => {
  // 在这用reactive定义的对象没有响应式, 需注意
  const menus = ref<MenuRes[]>([])
  // 和路由一一对应
  const setMenus = (data: MenuRes[]) => {
    menus.value = data
  }
  const menusComputed = computed(() => { })

  const userInfo = ref({})
  const setUserInfo = (data: Object) => {
    userInfo.value = data
  }

  return {
    menus, // 一定要暴露出这个state, pinia才会使用它
    userInfo,
    setMenus, setUserInfo
  }
}, {
  persist: true

  // persist: {
  //   afterRestore: (ctx) => {
  //     console.log(ctx)
  //     console.log(`刚刚恢复完 '${ctx.store.$id}'`)
  //   },
  // }
})