<template>
  <div class="container">
    <div class="wrap">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" :placeholder="placeholderTxt.input" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" :placeholder="placeholderTxt.input" type="password" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item label="验证码" prop="verificationCode">
          <el-input v-model="ruleForm.verificationCode" type="text" autocomplete="off" />
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="loginFn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue';
import Cookies from 'js-cookie';
import { rules } from "./rules";
import { placeholderTxt } from '@/utils/commonData'
import { login, getUserInfo } from '@/api/login'
import { useRouter } from 'vue-router';

const ruleForm = reactive({
  username: 'admin',
  password: '123456',
  // verificationCode: '',
})

const ruleFormRef = ref()
const router = useRouter()

const loginFn = () => {
  ruleFormRef.value.validate().then(() => {
    console.log('通过校验')

    const apiParams = {
      username: ruleForm.username,
      password: ruleForm.password
    }
    login(apiParams).then(res => {
      if (res.code === 200) {
        Cookies.set('token', `${res.data.tokenHead} ${res.data.token}`, { expires: 7 })

        getUserInfo().then(res => {
          console.log(res.data)
          router.push('/home')
        })
      }
    })
  })
    .catch(() => {
      console.log('没通过校验')
    })
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  margin-top: 20px;

  >.wrap {
    margin: 0 auto;
    width: 500px;
  }
}
</style>
