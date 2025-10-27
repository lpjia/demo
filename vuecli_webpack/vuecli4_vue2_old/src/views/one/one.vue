<template>
  <div>
    <h3 class="up_down">{{ pageName }}</h3>
    <button @click="backToPrevPage">返回上一个路由页面</button>
    <hr class="up_down">
    <button @click="goNextPage">跳转页面</button>
    <hr class="up_down">
    <p>{{ msg }}</p>
    <hr class="up_down">
    <button @click="getHello">@Get('list')</button>
    <button @click="create">@Post('list')</button>
    <button @click="getUser">@Get('user_*')</button>
    <button @click="updateUser">@Put('list/user')</button>
    <button @click="update">@Put('list/:id')</button>
    <button @click="deleteItem">@Delete('list/:id')</button>
    <hr class="up_down">
    <ul>
      <li v-for="item in list" :key="item.id">{{ item }}</li>
    </ul>
    <p>{{ post }}</p>
    <hr class="up_down">
    <button @click="getList">@Get('list')</button>
    <button @click="addPost">@Post('post')</button>
    <hr class="up_down">

    <h3>测试响应式监听数据改变</h3>
    <button @click="handleObj">增/删对象的属性</button>
    <div class="treeSection">
      <JsonViewer :value="obj" :expand-depth="10" />
    </div>
    <button @click="handleArr">操作数组</button>
    <div class="treeSection">
      <JsonViewer :value="dataList" :expand-depth="10" />
    </div>

    <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->

  </div>
</template>

<script>
import {
  apiGetHello, apiCreate, apiGetUser,
  apiUpdateUser, apiUpdate, apiDelete,
  findAll, createPost
} from '@/api/one.js'
// import Form from './components/form.vue'
import JsonViewer from 'vue-json-viewer'


let obj = {
  name: 'xj',
  age: 28,
  sex: 'man'
}


export default {
  name: 'one',
  components: {
    // Form
    JsonViewer,
  },
  props: {
  },
  data() {
    return {
      obj,
      pageName: 'one.vue',
      msg: '',
      post: '',
      list: [],
      dataList: [
        {
          id: 1,
          name: 'name',
        },
        {
          id: 11,
          name: 'name2',
        },
        {
          id: 111,
          name: 'name3',
        },
      ],

    };
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
    console.log('这是来自 vuex 的值: ', this.$store.state.count)
    console.log('这是来自 vuex 的值: ', this.$store.state['moduleA'].varA)

    setTimeout(() => {
      this.$store.dispatch('moduleA/setToken', 'AA')
      console.log('dispatch: ', this.$store.state['moduleA'].varA)
    }, 1000)
  },
  methods: {
    async getHello() {
      let res = await apiGetHello()
      this.msg = res
    },
    async create() {
      let res = await apiCreate()
      this.msg = res
    },
    async getUser() {
      let res = await apiGetUser()
      this.msg = res
    },
    async updateUser() {
      let res = await apiUpdateUser()
      this.msg = res
    },
    async update() {
      const params = {
        id: 'upd'
      }
      let res = await apiUpdate(params)
      this.msg = res
    },
    async deleteItem() {
      const params = {
        id: 'del'
      }
      let res = await apiDelete(params)
      this.msg = res
    },



    async getList() {
      let res = await findAll()
      this.list = res.data.list
    },
    async addPost() {
      const idx = 4
      const params = {
        title: 'title-' + idx,
        author: 'author-' + idx,
        content: 'content-' + idx,
        thumb_url: 'thumb_url-' + idx,
        type: 3,
        // create_time: '',
        // update_time: '',
      }
      let res = await createPost(params)
      this.post = res
    },


    handleObj() {
      console.log('handleObj()')

      // delete this.obj['sex'] // 属性已删除, 但非响应式
      // delete obj['sex'] // 属性已删除, 但非响应式
      this.$delete(obj, 'sex') // 正常可以删除, 响应式
      this.$set(this.obj, 'country', 'china') // obj 和 this.obj 是一个对象地址

      console.log('this.obj:', this.obj)
      console.log('obj:', obj)
    },

    handleArr() {
      console.log('handleArr()')
      /**
       * Vue 不能检测以下数组的变动：
       * 当你利用索引直接设置一个数组项时
       * 当你修改数组的长度时
       */

      // this.dataList[0] = 'x' // 非响应式
      // this.dataList.length = 2 // 非响应式
      this.dataList.splice(0, 1, 'x') // 响应式
      this.dataList.splice(2, 1) // 响应式

      // this.$set(this.dataList, 0, 'x') // 响应式
      console.log('this.dataList:', this.dataList)
    },
    backToPrevPage() {
      this.$router.go(-1)
    },

    goNextPage() {
      // this.$router.push({
      //   path: 'five',
      //   query: {
      //     id: 110
      //   },
      //   // name: 'five',
      //   // params: {
      //   //   page: 'fivePage'
      //   // }
      // })
      this.$router.push({
        path: 'five/lpjia'
      })
    },
  },
};
</script>

<style scoped lang="scss">
button {
  margin: 0 4px;
}

.treeSection {
  text-align: left;
  display: flex;
  justify-content: center;
}
</style>
