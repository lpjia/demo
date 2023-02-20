<template>
  <div class="container">
    <div class="wrap">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobilePhone">
          <el-input v-model="ruleForm.mobilePhone" type="text" autocomplete="off" />
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
import { rules } from "./rules";
// import type { FormInstance } from 'element-plus'

const ruleForm = reactive({
  username: '',
  password: '',
  email: '',
  mobilePhone: '',
})

// const ruleFormRef = ref<FormInstance>()

const registerFn = () => {
  console.log('注册中')
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
