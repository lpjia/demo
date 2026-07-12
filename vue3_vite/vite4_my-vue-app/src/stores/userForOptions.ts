import { defineStore } from "pinia";
import { MenuRes } from "@/api/login";

// 选项式写法
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      menus: [] as MenuRes[],
      userInfo: {}
    }
  },
  actions: {
    setMenus(data: MenuRes[]) {
      this.menus = data
    },
    setUserInfo(data: Object) {
      this.userInfo = data
    },
  }
})