// import { MockMethod } from 'vite-plugin-mock'
// MockMethod类型可以用在子模块中, 此模块自动推导

// 抽出来子模块
/* const mock: MockMethod[] = [
  {
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
      }
    }
  }
] */

/* 由于插件会引起报错, 所以不支持批量导入文件手写的mock文件 */
import login from './modules/login' // 单个接口配置
import user from './modules/user' // 多个接口配置

const mock = [
  login,
  ...user
]

export default mock