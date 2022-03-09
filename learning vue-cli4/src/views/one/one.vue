<template>
  <div>
    <h3 class="up_down">{{ pageName }}</h3>
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

    <button @click="changeDataList">测试响应式监听数据改变</button>
    <div class="treeSection">
      <JsonViewer :value="dataList" :expand-depth="10" />
      <!-- <JsonViewer :value="items" :expand-depth="10" /> -->
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

      // dataList: {
      //   id: 1,
      //   name: 'name',
      // },

      // items: ['a', 'b', 'c'],

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


    changeDataList() {
      // this.dataList[0] = 'x'
      this.$set(this.dataList, 0, 'x')
      // this.items[1] = 'x'
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
