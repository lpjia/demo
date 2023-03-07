import axios from 'axios'
import Cookies from 'js-cookie'
import router from '@/router'

// const router = useRouter()

const axiosInstance = axios.create({
  // baseURL: 'http://rap2api.taobao.org/app/mock/288967/api',
  // baseURL: '/api',
  // baseURL: 'localhost:5173',
  // baseURL: '',
  timeout: 10_000
})

axiosInstance.interceptors.request.use(config => {
  const token = Cookies.get('token')
  if (token) {
    config.headers.Token = token
  }

  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器要处理一些公共的
axiosInstance.interceptors.response.use(result => {
  // console.log(result)
  // code报错, 比如401权限不对
  // 接口这判断还是比较复杂的, 有时间再说
  switch (result.data.code) { // (result.data.code.toString())[0] === '4' '5'
    case 401:
      // // 提示并清空cookie, 跳转到登录页
      // // 这里还有一个白名单跳转问题, 如果当前页是登录页, 调登录接口报错, 或者当前页是公共可访问的页面(比如注册 须知 关于页面等)
      // ElMessage.error(result.data.msg)
      // Cookies.remove('token')
      // // router.push('/login')
      // // router. // 应该清除路由历史记录, 防止页面回退
      break;
    case 500:
      break;
    default:
      break;
  }

  return result.data
}, err => {
  // http报错, 比如404 (Not Found)
  ElMessage.error(err)
  return Promise.reject(err)
})

export default axiosInstance