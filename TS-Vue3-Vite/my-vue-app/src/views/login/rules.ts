import { reactive } from "vue";
import type { FormRules } from 'element-plus'
import { validEmail, validMobilePhone } from '@/utils/commonMethods.js'

// rule是此input校验规则
const validateEmail = (rule: unknown, value: string, callback: (err?: string | Error) => void) => {
  if (value === '') {
    callback(new Error('请输入邮箱'))
  } else if (!validEmail(value)) {
    // 回调这里有两种传参形式, 简单点就直接传string
    callback('请输入正确的邮箱')
  } else {
    callback()
  }
}
const validateMobilePhone = (rule: unknown, value: string, callback: (err?: string | Error) => void) => {
  if (value === '') {
    callback('请输入手机号')
  } else if (!validMobilePhone(value)) {
    callback('请输入正确的手机号')
  } else {
    callback()
  }
}

// 校验规则
export const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    // 可以写多种校验规则, 按从上到下开始校验
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码不少于6位', trigger: 'blur' },
    // 密码位数一般不能少于6位; 一般还要加(比如包含字母、符号等), 等用到再加;
  ],
  email: [
    { required: true, validator: validateEmail, trigger: 'blur' }
  ],
  mobilePhone: [
    { required: true, validator: validateMobilePhone, trigger: 'blur' },
    // 手机号位数一般是11位, 用maxlength限制输入长度, rule限制不了输入;
  ]
})