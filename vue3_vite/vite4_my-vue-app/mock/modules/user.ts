import { MockMethod } from "vite-plugin-mock"

export default [
  {
    url: '/api/getUserInfo',
    method: 'get',
    // timeout: 3000, // 配置响应时间
    response: () => {
      return {
        code: 200,
        msg: '操作成功',
        data2: null,
        data: {
          'username': 'amdin',
          'realname': '@cname',
          'avatar': '@url(https)',
          'roles': ['管理员'],
          // 'menus|3-10': [
          //   {
          //     'id|+1': 1,
          //     'parentId': 0,
          // 'name':'@string',
          //     'title': '@cword(4)',
          //     'icon': '@word',
          //   }
          // ],
          'menus': [
            {
              'id': 1,
              'parentId': 0,
              'title': '一级菜单1',
              'icon': 'icon_icon',
            },
            {
              'id': 2,
              'parentId': 1,
              'title': '二级菜单2',
              'icon': 'icon_icon',
              'path': '/login'
            },
            {
              'id': 3,
              'parentId': 0,
              'title': '一级菜单3',
              'icon': 'icon_icon',
            },
            {
              'id': 4,
              'parentId': 3,
              'title': '二级菜单4',
              'icon': 'icon_icon',
            },
            {
              'id': 5,
              'parentId': 3,
              'title': '二级菜单5',
              'icon': 'icon_icon',
            },
            {
              'id': 6,
              'parentId': 0,
              'title': '一级菜单6',
              'icon': 'icon_icon',
            },
          ],
        }
      }
    }
  }
] as MockMethod[]