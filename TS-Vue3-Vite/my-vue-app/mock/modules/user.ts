import { MockMethod } from "vite-plugin-mock"

export default [
  {
    url: '/api/getUserInfo',
    method: 'get',
    response: () => {
      return {
        code: 200,
        msg: '操作成功',
        data: {
          'username': 'amdin',
          'realname': '@cname',
          'avatar': '@url(https)',
          'roles': ['管理员'],
          'menus|5': [
            {
              'id|+1': 1,
              'parentId': 0,
              'name': '@cword(4)',
              'icon': '@word',
            }
          ],
        }
      }
    }
  }
] as MockMethod[]