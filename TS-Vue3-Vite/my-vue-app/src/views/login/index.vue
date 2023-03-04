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

      <ul>
        <li v-for="menu, i in menus">{{ menu.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue';
import Cookies from 'js-cookie';
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';
// import { isEmpty, isNil } from 'ramda';
import * as R from 'ramda';
import { rules } from "./rules";
import { placeholderTxt } from '@/utils/commonData'
import { login, getUserInfo } from '@/api/login'
import { useUserStore } from '@/stores/user';
// import { useUserStore } from '@/stores/userForOptions';

const ruleForm = reactive({
  username: 'admin',
  password: '123456',
  // verificationCode: '',
})
const ruleFormRef = ref()

const router = useRouter() // 实例化router

const userStore = useUserStore() // 实例化某store
const { menus } = storeToRefs(userStore) // 需要解构时, 使用store的state和getters需要解包, actions则不需要解包
const { setMenus } = userStore // 需要解构时, 直接解构

const loginFn = () => {
  ruleFormRef.value.validate().then(() => {
    console.log('通过校验')

    const apiParams = {
      username: ruleForm.username,
      password: ruleForm.password
    }
    login(apiParams).then(res => {
      // 只要接口走到then里面, 就一定有 code msg data 这几个属性
      if (res.code === 200) {
        // 有值
        if (!R.isNil(res.data) && !R.isEmpty(res.data)) {
          // 组装好的token存到cookie
          Cookies.set('token', `${res.data.tokenHead} ${res.data.token}`, { expires: 7 })

          getUserInfo().then(res => { // 嵌套太多还是容易晕, 用异步标记
            if (res.code === 200) {
              // 有值
              if (!R.isNil(res.data) && !R.isEmpty(res.data)) {
                /* 这样解构方便赋default值, 后台一般查数据, 查不出来的字段可能就不返回给前端了, 前端还得判断有无此字段, 当字段多时, res.data.xxx可能就得写很多遍, 太繁琐 */
                const { username = '',
                  realname = '',
                  avatar = '',
                  roles = [],
                  menus = [] } = res.data
                userStore.setUserInfo({ username, realname, avatar, roles })
                setMenus(menus)
                router.push('/home')
                // ElMessage.success('模拟跳转')
              }
            }

          })
        } else {
          // 没值
          ElMessage.error('没值')
        }
      } else {
        // code 不为200, 可以统一在响应拦截器那处理, 单独也可以处理, 以后再写处理逻辑
      }
    })
      .catch(err => {
        ElMessage.error(err)
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
