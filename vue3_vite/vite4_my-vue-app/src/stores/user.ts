import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getUserInfoApi, MenuRes } from "@/api/login";
import { oneToTree } from "@/utils/commonMethods";
import * as R from 'ramda';
import { menus, setMenus, menusComputed } from './userMenus'

// 组合式写法, 每一种写法都试试
export const useUserStore = defineStore('user', () => {
  /* // 在这用reactive定义的对象没有响应式, 需注意
    const menus = ref<MenuRes[]>([])
    // 和路由一一对应
    const setMenus = (data: MenuRes[]) => {
      menus.value = data
    }
    // 记得写.value
    const menusComputed = computed(() => oneToTree(menus.value, { pKey: 'parentId' }))*/


  const userInfo = ref({})
  const setUserInfo = (data: Object) => {
    userInfo.value = data
  }

  // 重新封装获取用户信息
  const getUserInfo = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getUserInfoApi()
        if (res.code === 200) {
          // 有值
          if (!R.isNil(res.data) && !R.isEmpty(res.data)) {
            /* 这样解构方便赋default值, 后台一般查数据, 查不出来的字段可能就不返回给前端了, 前端还得判断有无此字段, 当字段多时, res.data.xxx可能就得写很多遍, 太繁琐 */
            const { username = '',
              realname = '',
              avatar = '',
              roles = [],
              menus = [] } = res.data
            setUserInfo({ username, realname, avatar, roles })
            setMenus(menus)
          } else {
            // 没值要提示
            ElMessage.error('用户信息为空')
          }
          // res.data 有没有值都要返回数据
          resolve(res.data)
        }
      } catch (error: any) {
        ElMessage.error(error)
      }
    })
  }

  return {
    menus, // 一定要暴露出这个state, pinia才会使用它
    userInfo, menusComputed,
    setMenus, setUserInfo, getUserInfo
  }
}, {
  // persist: true // 用户信息是不用存 localStorage

  // persist: {
  //   afterRestore: (ctx) => {
  //     console.log(ctx)
  //     console.log(`刚刚恢复完 '${ctx.store.$id}'`)
  //   },
  // }
})