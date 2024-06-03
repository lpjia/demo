const { Controller } = require('egg')

class NewsController extends Controller {
  /* 数据写死 */
  async list() {
    const { ctx } = this
    const dataList = {
      list: [
        { id: 1, title: 'this is news 1', url: '/news/1' },
        { id: 2, title: 'this is news 2', url: '/news/2' },
      ],
    };
    await ctx.render('news/list.tpl', dataList);
  }

  /* 获取其他服务器上的数据 */
  async list2() {
    const { ctx } = this
    const page = ctx.query.page || 1;
    const newsList = await ctx.service.news.list(page);
    await ctx.render('news/list.tpl', { list: newsList });
  }

  /* 做一个完整的黑客新闻界面
  由于接口超时, 无法完成, 搁置 */
  async list3() {
    const { ctx, app, config } = this
    const pageSize = config.news.pageSize;
    const page = parseInt(ctx.query.page) || 1;

    const idList = await ctx.service.hackerNews.getTopStories(page);

    const newsList = await Promise.all(idList.map(id => ctx.service.hackerNews.getItem(id)));
    await ctx.render('news/list2.tpl', { list: newsList, page, pageSize });
  }
  async detail() {
    const { ctx } = this;
    const id = ctx.params.id;
    const newsInfo = await ctx.service.hackerNews.getItem(id);
    // get comment parallel
    const commentList = await Promise.all(newsInfo.kids.map(id => ctx.service.hackerNews.getItem(id)));
    await ctx.render('news/detail.tpl', { item: newsInfo, comments: commentList });
  }
  async user() {
    const { ctx } = this;
    const id = ctx.params.id;
    const userInfo = await ctx.service.hackerNews.getUser(id);
    await ctx.render('news/user.tpl', { user: userInfo });
  }

  /* 增加了时间处理和样式 */
  async list4() {
    const { ctx } = this
    const page = ctx.query.page || 1;
    const newsList = await ctx.service.news.list(page);
    await ctx.render('news/list3.tpl', { list: newsList });
  }

  /* 使用ejs模版引擎
  效果可以类似vue的模版文件
  也可以引入vue的cdn链接来实现页面逻辑, 非SFC */
  async ejs() {
    const { ctx } = this
    const newsList = await ctx.service.news.list(ctx.query.page)
    await ctx.render('news/index.ejs', {
      list: newsList,
      pageName: 'news',
    })
  }
}

module.exports = NewsController;