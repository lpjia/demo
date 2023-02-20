import { reactive } from "vue";
import type { FormRules } from 'element-plus'
import { validEmail } from '@/utils/commonMethods.js'

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

export const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    // 可以写多种校验规则, 按从上到下开始校验
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码不少于6位', trigger: 'blur' },
  ],
  email: [
    { required: true, validator: validateEmail, trigger: 'blur' }
  ],
  mobilePhone: [
    { required: true, trigger: 'blur' }
  ]
})


// 搞一个有正则校验的校验文件