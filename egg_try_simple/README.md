
### 推荐用这个模版
// 2024-03-30 14:00 星期六


### 修改记录
1. UserController 尝试egg-sequelize和model来操作数据库
1. NewsController 尝试view模版引擎
1. CustomerController 尝试egg-mysql, 抛出错误, 框架捕获, 自定义报错, 提示信息
1. Controller基类 来实现响应统一格式, 之前的控制器就不再改了
1. GoodsController 尝试把响应统一格式, 完善Service操作数据库逻辑
1. 中间件notFoundHandler, 实现自定义404页面
1. GoodsController 参数校验, 封装到单独文件,
对象解构, 忽略某属性后重新组成新对象
1. cookie 和 session, 获取config的配置信息
1. GoodsController 分页查询, 组装分页的结构(在控制层组装), 封装page到offset的转换
1. GoodsService 更新数据, 考虑重名后不能改成功
1. ClassService 类型转换、分页的数据处理放到Service层, 与GoodsController区分开
1. ClassService 表字段, 下划线与小驼峰互转
1. 中间件underlineToCamel, 把响应的下划线字段全转为小驼峰
1. AccountController 事务, 手动控制, 成功与否, 自动控制
1. AccountService 直接执行sql语句, 拼接来自前端传的数据, 防止sql注入
1. 在test目录下放一些本地开发用来测试的文件, 比如csv文件数据等
这样做的好处是使测试资源与代码文件分离，便于管理和维护。同时，在开发和测试过程中，也能更方便地使用这些测试资源。
1. utils文件夹放一些工具函数, 如果模板需要, 那么在helper.js中导入工具函数后再导出即可使用
1. CsvController 解析csv文件数据, 封装了parseCSV方法作为工具函数, 支持await
1. jwt, 增加了很多admin_开头的文件, 增加 BaseService基类
1. AdminUserService getUserList方法 主模型和关联模型, 一对多的关系
还有查询条件, 好像很复杂, 还没研究, 包括分页的处理
响应返回的分页字段有 total page perPageSize list, 前端传page limit, 后续最好是统一
1. AdminUserService Model.create方法, await解析成功则插入成功
1. AdminUserService Model.save方法, 有问题那, 得参考GoodsService的update实现
username和mobile不能重复(2个唯一索引字段), 增加查询判断逻辑, 确保无重复值
1. AdminUserController userInfo方法, 获取登录用户信息, by token
由于ctx.request.header.authorization的值为"Bearer "+token
根据authMiddleware其中的一段解析逻辑, 封装个工具函数解析出token
1. AdminUserService getUserInfo方法, 原始查询Model.query方法, 占位符
user模型实例给查询结果增加键来组装数据, user.roles = roles; user.menus = menu;
1. AdminUserController 查单个用户id的信息, 查出来的数据想去掉password字段
delete user.dataValues.password, 不能省略dataValues
增加手机号脱敏, user.mobile = maskPhoneNumber(user.mobile)
1. 增加性别、账号状态的枚举值
1. 搞清楚auth中间件的作用
1. EnumController 定枚举数据的接口, 方便前端获取
1. AdminUserService getUserList方法, 关联查询, as 别名, 其实作为键挂载到模型实例上
多级关联查询, include配置项, 推荐写别名, 也是作为键挂载, 如果还想单独操作实例数据, 那么自己遍历数据处理, 需要注意dataValues
1. 增加 commonFieldHandlerMiddleware 中间件, 统一处理某些字段
比如password status gender mobile, 不用在不同接口的服务层一个个处理了
1. 为了方便在不同中间件传值, 加了ctx.middlewareData, 用完即删, 用之前先判断
1. 增加 isEmpty 工具方法, 这里空指 null、undefined、NaN、''、[]、{}
有个处理复杂条件判断和复杂逻辑处理, 值得学习
1. auth 中间件增加传递数据
permissionLevel 中间件来处理权限等级, 类似于数据权限
router 查用户, 用来测试权限等级功能
1. 权限等级功能
原则:
低等级账号不能编辑(可以编辑自己)、删除(不能删除自己)比自己高的账户等级
设计权限等级 level 字段, 角色表 (举例 0101 一家公司有99种角色权限应该够用了, 0201 另一家公司)
  varchar数据类型
  先把字符串转成数字(把前面的0去掉), 再转字符串, 比较位数
    0001和0002, 前两位代表公司, 后两位代表职位
    0003和0104
    0005和1006
    0107和0213
    0304和1205
    1101和1120
  再比较大小, 越小的权限等级越高
  有多个角色的, 权限按最大的来




需要解决几个问题

1. 还差个刷新token
1. 复杂的查询, 怎么写orm
或者用sql?
1. 用位运算实现权限组合, 看怎么和菜单等权限结合一下?
前端页面怎么搞?
前端路由控制和菜单权限结合怎么结合?
1. 用户表怎么设计
第三方登录又怎么设计
权限设计
权限继承?
1. base64, 如果是很小的图片, 转换后的字符串也巨长, 存到数据库不适用
存到文件服务器, 图片服务器
本地开发就存到一个单独的文件夹来模拟文件服务器, 获取到绝对地址再存到mysql
1. 部署
1. 日志
1. 页面级权限 组件级权限, 一般SPA前端控制, 接口后端这还要验证, 双重控制
页面权限 操作权限
1. 使用EJS实现一键自动化生成代码模版
https://juejin.cn/post/7096124894169006087




### Development

```bash
npm i
npm run dev
open http://localhost:7001/
```

### Deploy

```bash
npm start
npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.