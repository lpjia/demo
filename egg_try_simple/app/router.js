/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  /* 重定向 */
  router.redirect('/', '/api')

  router.get('/api', controller.home.index);

  /* crud
  resources方法, 一参是路由名, 可以任意写
  二参是匹配路径名, 也就是前端请求路径
  三参就是controller, 对应的是controller下的文件名 */
  router.resources('users', '/api/users', controller.user);
  /* 单个写是
  router.post('/api/users', controller.user.create) */


  router.get('/api/getDataByService', controller.home.getDataByService);


  // 新闻
  // router.get('/news3', controller.news.list)
  // router.get('/news2', controller.news.list2)
  // router.get('/news4', controller.news.list4)

  // router.get('/news', controller.news.list3)
  // router.get('/news/item/:id', controller.news.detail);
  // router.get('/news/user/:id', controller.news.user);

  router.get('/news_ejs', controller.news.ejs)


  router.post('/api/customer', controller.customer.create)
  /* 除了crud, 还可以单独再写接口来映射 */
  router.post('/api/customer_error', controller.customer.tryCatchError)


  router.get('/api/goods', controller.goods.index)
  router.get('/api/goodsByPage', controller.goods.listByPage)
  router.get('/api/goods/:id', controller.goods.show)
  router.post('/api/goods', controller.goods.create)
  router.put('/api/goods/:id', controller.goods.update)


  router.get('/cookie', controller.cookie.cookieView);
  router.post('/api/cookie', controller.cookie.create);
  router.get('/api/cookie', controller.cookie.show);
  router.put('/api/cookie', controller.cookie.update);
  router.del('/api/cookie', controller.cookie.destroy);

  router.get('/session', controller.session.sessionView);
  router.post('/api/session', controller.session.create);
  router.get('/api/session', controller.session.show);
  router.put('/api/session', controller.session.update);
  router.del('/api/session', controller.session.destroy);

  router.resources('class', '/api/class', controller.class);
  router.get('/api/classByPage', controller.class.listByPage)

  router.put('/api/account/:id', controller.account.update)
  router.put('/api/account2/:id', controller.account.update2)
  router.put('/api/account3/:id', controller.account.update3)

  router.get('/api/readCSV', controller.csv.readCSV)

  router.get('/api/getToken', controller.csv.getToken)


  // 实例化auth中间件
  const { auth, permissionLevel } = app.middleware;

  // 注册路由
  // router.get('/api/admin/menus/:id', auth('get@menus/:id'), controller.adminMenu.readMenu);

  // 登录
  router.post('/api/admin/users/login', controller.adminUser.login);
  // 用户管理
  router.get('/api/admin/users', auth('get@users'), controller.adminUser.userList);
  // router.get('/api/admin/users', auth(), controller.adminUser.userList);
  // router.get('/api/admin/users', controller.adminUser.userList);
  /* auth中间件, 首先拿到token进行验证, 也就是用户是否已登录, 不加(调)auth也意味着不验证token
  用token换userId, 然后auth不传参(公共接口), 意味着不需要权限即可放行 */

  /* 按新方案, 无权限的就不该显示出来供用户操作
  比如没有这个菜单项, 那么菜单就不渲染出来
  没有这个删除、新增功能权限, 相应的按钮就不要渲染
  有查的权限, 就显示出列表页 */
  router.post('/api/admin/users', auth('post@users'), controller.adminUser.createUser);
  // router.put('/api/admin/users/:id', auth('put@users/:id'), controller.adminUser.updateUser);
  router.put('/api/admin/users/:id', auth('put@users/:id'), permissionLevel(), controller.adminUser.updateUser);
  router.delete('/api/admin/users/:id', auth('delete@users/:id'), controller.adminUser.deleteUser);
  /* 直接查登录人的信息, by token */
  router.get('/api/admin/users/info', auth('get@users/info'), controller.adminUser.userInfo);
  /* 遇到个问题, 如果'/api/admin/users/:id'比'/api/admin/users/info'靠上先写
  路由在匹配时, 先匹配先写的
  请求'/info'会进入get('/api/admin/users/:id' 路由, 因为'info'也可以看作是':id'
  故 get('/api/admin/users/:id' 路由, 要靠下后写 */
  router.get('/api/admin/users/:id', auth('get@users/:id'), permissionLevel(), controller.adminUser.show);

  // 获取枚举 键值对
  router.get('/api/admin/enum/gender', auth(), controller.enum.getGenderMap)
  router.get('/api/admin/enum/userStatus', auth(), controller.enum.getUserStatusMap)
};
