<template>
  <div class="container">
    <div class="wrap">
      <!-- @validate="dayin" 事件 -->
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" :placeholder="placeholderTxt.input" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" :placeholder="placeholderTxt.input" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" :placeholder="placeholderTxt.input" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobilePhone">
          <el-input v-model="ruleForm.mobilePhone" :placeholder="placeholderTxt.input" maxlength="11" type="text"
            autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="registerFn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue';
import type { FormItemProp } from 'element-plus'
import { rules } from "./rules";
import { placeholderTxt } from '@/utils/commonData'
import { login } from '@/api/login'

const ruleForm = reactive({
  username: '',
  password: '',
  email: '',
  mobilePhone: '',
})

// 调试事件
const dayin = (prop: FormItemProp, isValid: boolean, message: string) => {
  console.log(prop, isValid, message)
}

const ruleFormRef = ref()

const registerFn = () => {
  // // 回调写法
  // ruleFormRef.value.validate((isValid: boolean) => {
  //   console.log('isValid:', isValid)
  //   if (isValid) {
  //     console.log('通过校验')
  //   } else {
  //     console.log('没通过校验')
  //   }
  // })

  // promise写法, isValid?: boolean
  ruleFormRef.value.validate().then(() => {
    console.log('通过校验')

    const param = {
      username: 'admin',
      password: '123456'
    }
    login(param).then(res => {
      console.log('res:', res)
      if (res.code === 200) {
        console.log(res.data.token)
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
