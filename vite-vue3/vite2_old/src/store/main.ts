export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    name: '用户名'
  }),

  getters: {
    nameLength: state => state.name.length,
    doubleCountPlusOne(): number {
      // 自动完成
      return this.name.length * 2
    },
  },

  actions: {
    updateUser(data: string) {
      console.log(data)
      // actions中使用this修改state数据
      this.name = data
    }
  }
})