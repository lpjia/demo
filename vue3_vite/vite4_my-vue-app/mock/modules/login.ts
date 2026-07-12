import { MockMethod } from "vite-plugin-mock"

// 减少起名字, 复用文件也改的少, 方便
// 其实加名字, 对于全局搜索也有好处
const login: MockMethod = {
  url: '/api/getToken',
  method: 'post',
  response: () => {
    return {
      code: 200,
      msg: '操作成功',
      data: {
        'token|10': '@string',
        'tokenHead': 'Bearer'
      }
      // data: {}
    }
  }
}

export default login