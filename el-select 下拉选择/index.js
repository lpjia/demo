import { fetchGet } from '../util/fetchRequest.js'

const vm = new Vue({
  el: '#app',
  data: {
    foods: [],
    food: '',

    disabledValue: '',

    elSelectDisable: true,
    aArr: [],
    a2Arr: [],

    cities: [],
    city: '',

    groups: [],
    group: '',

    city2Arr: [],

    emptyVal: '',

    remoteVal: '',
    remoteArr: [],
    loading: false,
    loading2: false,
    list: [],
    actualOptions: [],
    actualOptions2: [],
  },
  computed: {
  },
  mounted() {
    this.getFoods()
    this.getCities()
    this.getGroups()
    this.getData()
  },
  methods: {
    // 获取下拉数据
    async getFoods() {
      this.foods = await fetchGet('mock/foods.json')
    },
    async getCities() {
      this.cities = await fetchGet('mock/cities.json')
    },
    async getGroups() {
      this.groups = await fetchGet('mock/groups.json')
    },


    // 远程搜索, 模拟数据库所有数据
    async getData() {
      const res = await fetchGet('mock/states.json')
      this.list = res.map(item => {
        return {
          value: `value: ${item}`,
          label: `label: ${item}`,
        }
      })
    },
    // 远程搜索方法
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        // 模拟从接口获取数据这一行为
        setTimeout(() => {
          this.loading = false;
          this.actualOptions = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.actualOptions = [];
      }
    },
    remoteMethod2(query) {
      if (query !== '') {
        this.loading2 = true;
        // 模拟从接口获取数据这一行为
        setTimeout(() => {
          this.loading2 = false;
          this.actualOptions2 = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.actualOptions2 = [];
      }
    },


    // 获取已勾选选项
    getCity2() {
      console.log('this.city2Arr: ', this.city2Arr)
    },


    // 手动触发 focus 方法
    emitFocus() {
      this.$refs.oneSelect.focus()
      console.log('emitFocus')
      console.log('---- 分割线 ----\n\n\n')
    },
    // 手动触发 blur 方法
    emitBlur() {
      this.$refs.oneSelect.blur()
      console.log('emitBlur')
      console.log('---- 分割线 ----\n\n\n')
    },

    /**
     * 以下事件方法的参都是默认参(如果有)
     */
    // change 事件只能手动触发, clear 事件也能触发 change 事件
    handleSingleSelectionChange(val) {
      console.log('handleSingleSelectionChange val: ', val)
      console.log('---- 分割线 ----\n\n\n')
    },
    // clear 事件只能手动触发
    handleSingleSelectionClear() {
      console.log('handleSingleSelectionClear')
      console.log('---- 分割线 ----\n\n\n')
    },
    // blur 事件只能手动触发, 是失去焦点
    handleSingleSelectionBlur(e) {
      console.log('handleSingleSelectionBlur e: ', e)
      console.log('---- 分割线 ----\n\n\n')
    },
    // focus 事件只能手动触发, 是获得焦点
    handleSingleSelectionFocus(e) {
      console.log('handleSingleSelectionFocus e: ', e)
      console.log('---- 分割线 ----\n\n\n')
    },
    // visible-change 事件只能手动触发, 下拉框出现/隐藏时触发
    // 出现则为 true，隐藏则为 false
    handleSingleSelectionVisibleChange(boo) {
      console.log('handleSingleSelectionVisibleChange boo: ', boo)
      console.log('---- 分割线 ----\n\n\n')
    },
    // remove-tag 事件只能手动触发, 多选模式下移除tag时触发, 移除的tag值
    handleSingleSelectionRemoveTag(val) {
      console.log('handleSingleSelectionRemoveTag val: ', val)
      console.log('---- 分割线 ----\n\n\n')
    },
  }
})