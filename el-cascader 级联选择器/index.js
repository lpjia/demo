import { fetchGet } from '../util/fetchRequest.js'

const vm = new Vue({
  el: '#app',
  data: {
    elBasicValArr: [],
    elBasicValArr2: [],
    documentContents: [],

    elBasicValArr3: [],
    documentContents2: [],
    propsObj: {
      // 改 hover 触发
      expandTrigger: 'hover',
      // 变字段
      value: 'id',
      label: 'name',
      children: 'child',
      // 多选
      multiple: true,
      // 禁用
      disabled: 'isDisabled',
    },

    elBasicValArr4: [],
    elBasicValArr5: [],
  },
  computed: {
  },
  mounted() {
    this.getDocumentContents()
    this.getDocumentContents2()
  },
  methods: {
    // 获取下拉数据
    async getDocumentContents() {
      this.documentContents = await fetchGet('mock/documentContents.json')
    },
    async getDocumentContents2() {
      this.documentContents2 = await fetchGet('mock/documentContents2.json')
    },
  }
})