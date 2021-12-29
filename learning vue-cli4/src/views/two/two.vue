<template>
  <div>
    <h3 class="up_down">{{ pageName }}</h3>
    <h4>注册</h4>
    <div class="formSection">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini" style="width:300px;">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="form.avatar"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="form.role"></el-input>
        </el-form-item>
        <button @click.prevent="sure">注册</button>
      </el-form>

    </div>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import { registerUser } from '@/api/two.js'

export default {
  name: 'two',
  components: {
  },
  props: {
  },
  data() {
    return {
      pageName: 'two.vue',
      msg: '',
      form: {
        username: '',
        password: '',
        nickname: '',
        avatar: '',
        email: '',
        role: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
      }
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
    async sure() {
      const params = {
        ...this.form
      }
      const res = await registerUser(params)
      this.msg = res
    },
  },
};
</script>

<style scoped lang="scss">
.formSection {
  display: flex;
  justify-content: center;
}

// label {
//   display: inline-block;
//   width: 100px;
//   text-align: right;
//   margin-right: 10px;
// }
// .register {
//   padding-right: 22px;
// }
</style>
