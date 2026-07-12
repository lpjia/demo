/* 为了用组合式 */
import { ref, computed } from "vue";
import { getUserInfoApi, MenuRes } from "@/api/login";
import { oneToTree } from "@/utils/commonMethods";

// 在这用reactive定义的对象没有响应式, 需注意
const menus = ref<MenuRes[]>([])
// 和路由一一对应
const setMenus = (data: MenuRes[]) => {
  menus.value = data
}
// 记得写.value
const menusComputed = computed(() => oneToTree(menus.value, { pKey: 'parentId' }))

export {
  menus,
  setMenus,
  menusComputed
}