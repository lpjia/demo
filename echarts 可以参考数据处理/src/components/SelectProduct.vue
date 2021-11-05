<template>
  <!--     @visible-change="visibleChange" 重置下拉列表数据  -->
  <el-select
    v-model="checkApp"
    size="small"
    filterable
    clearable
    multiple
    ref="select"
    placeholder="请选择产品"
    style="width:100%"
    v-el-select-loadmore="loadmore"
    :filter-method="filterVmModel"
    :multiple-limit="limit">
    <el-option v-for="(item, key) in options" :key="'app' + key"
               :label="item.appName+'('+item.packageName+')('+item.projectId+')'" :value="item.appKey">
      <!--       svg图标 显示对应的平台图标           -->
      <svg class="icon" aria-hidden="true" style="margin-right:5px">
        <use :xlink:href="platformIco[item.platform]"></use>
      </svg>
      <el-tag size="small" :type="elTagType[item.market]">{{ marketTxt[item.market] }}
      </el-tag>
      <span style="margin-left: 15px;">{{ item.appName }}</span>
      <span style="color: #877da6; font-size: 10px; margin-left: 15px;">{{ item.projectId }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px;">{{ item.packageName }}</span>
    </el-option>
  </el-select>
</template>
<script>
// 复杂类型去重
import uniqBy from 'lodash/uniqBy'
import debounce from 'lodash/debounce'
export default {
  name: 'SelectProduct',
  props: {
    value: [String, Array],
    appList: Array,
    limit: {
      type: [String, Number],
      default: 8
    }
  },
  directives: {
    // 计算是否滚动到最下面
    'el-select-loadmore': {
      bind(el, binding, vnode) {
        // 获取element-ui定义好的scroll盒子
        const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
        //  访问实例 vue
        // vnode.context.selectwrap_dom = SELECTWRAP_DOM
        SELECTWRAP_DOM.addEventListener('scroll', function () {
          /**
           * scrollHeight 获取元素内容高度(只读)
           * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
           * clientHeight 读取元素的可见高度(只读)
           * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
           */
          const condition = Math.round(this.scrollHeight - this.scrollTop) <= this.clientHeight;
          if (condition) binding.value();
        });
      }
    }
  },
  data() {
    // 平台图标
    this.platformIco = {
      1: '#icon-android',
      2: '#icon-ios',
      3: '#icon-H5yuan',
    }
    // 每个tag标签的颜色
    this.elTagType = {
      1: 'success',
      3: 'success',
      4: 'success',
      6: 'success',
      9: 'success',
      2: '',
      5: 'warning',
      7: 'warning',
      8: 'warning'
    }
    // 市场
    // 1 3 4 6 9 安卓
    // 2 ios
    // 5 7 8 h5
    this.marketTxt = {
      1: 'Google Play',
      3: 'Amazon',
      4: '华为',
      6: 'FB Cloud',
      9: 'TapTap',
      2: 'App Store',
      5: 'FB Instant',
      7: 'Self Web',
      8: 'FB Web',
    }
    return {
      selectwrap_dom: '',
      options: [], // 分页数据
      // 分页参数
      query: {
        page: 1,
        limit: 8
      },
      filterText: '' // 筛选文本
    }
  },
  watch: {
    appList: {
      handler(newVal) {
        this.loadmore(true)
      },
      immediate: true
    },
    value: {
      handler(newVal) {
        this.checkData()
      }
    }
  },
  computed: {
    // 父组件的数据
    checkApp: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    // 解决数据回显问题
    checkData() {
      let arr = this.appList.filter(item => this.checkApp.includes(item.appKey))
      this.options.push(...arr)
      // 复杂类型去重
      this.options = uniqBy(this.options, 'appKey')
    },
    // 下拉列表隐藏和显示时触发
    /* visibleChange(mark) {
       // 重置下拉列表数据
       if (!mark) {
         this.selectwrap_dom.scrollTop = 0
         this.query = {
           page: 1,
           limit: 8
         }
         this.filterVmModel()
       }
     },*/
    // 分页方法 详见 directives
    loadmore(firstTag) {
      // 筛选时下拉不触发分页
      if (!this.filterText) {
        if (!firstTag) {
          this.query.page++
        }
        // 前端分页简单版本
        // 分页开始坐标
        const begin = this.query.limit * (this.query.page - 1)
        // 分页结束坐标
        const end = (this.query.limit * (this.query.page - 1)) + this.query.limit
        // 这里使用slice 进行分页
        this.options.push(...this.appList.slice(begin, end))
      } else {
        // 当搜索框有值时触发
        this.query.page++
        this.filterData()
      }
      // 复杂类型去重
      this.options = uniqBy(this.options, 'appKey')
    },
    // 筛选方法 使用函数防抖等待用户输入完成在开始执行
    filterVmModel: debounce(function (query) {
      // 解决如果是空出现的报错
      query = query ? query.toLowerCase() : query
      this.filterText = query
      // 直接赋值会连续触发 loadmore 分页事件
      this.options = []
      // 筛选数据
      if (query) {
        // 延迟操作 不然会因为数据大卡死
        this.$nextTick(() => {
          this.filterData()
        })
      } else {
        // 直接赋值会连续触发 loadmore 分页事件
        this.$nextTick(() => {
          this.options = this.appList.slice(0, this.query.limit * this.query.page)
        })
      }
      // 重置下拉列表数据时使用
      /* this.$nextTick(()=>{
         this.checkData()
       })*/
    }, 300, {
  'leading': false,
  'trailing': true
}),
    filterData() {
      let query = this.filterText
      this.options = this.appList.filter((item) => {
        // 有些数据没有某些属性
        if (item.projectId && item.projectId.toLowerCase().includes(query)) {
          return true
        }
        if (item.packageName && item.packageName.toLowerCase().includes(query)) {
          return true
        }
        if (item.appName && item.appName.toLowerCase().includes(query)) {
          return true
        }
        return false
      }).slice(0, this.query.limit * this.query.page)
    }
  }
}
</script>
