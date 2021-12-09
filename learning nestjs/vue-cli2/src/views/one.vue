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
  </div>
</template>

<script>
import {
  apiGetHello, apiCreate, apiGetUser,
  apiUpdateUser, apiUpdate, apiDelete,
  findAll, createPost
} from '@/api/one'

export default {
  name: 'one',
  components: {
  },
  props: {
  },
  data() {
    return {
      pageName: 'one.vue',
      msg: '',
      post: '',
      list: []
    };
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
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
      const params = { id: 'upd' }
      let res = await apiUpdate(params)
      this.msg = res
    },
    async deleteItem() {
      const params = { id: 'del' }
      let res = await apiDelete(params)
      this.msg = res
    },



    async getList() {
      let res = await findAll()
      this.list = res.list
    },
    async addPost() {
      const params = {
        title: 'dibage-title',
        author: '',
        content: 'diyige-content',
        thumb_url: 'diyige-thumb_url',
        type: 3,
        // create_time: '',
        // update_time: '',
      }
      let res = await createPost(params)
      this.post = res
    },
  },
};
</script>

<style scoped >
</style>
