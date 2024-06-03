const { Service } = require('egg')

class NewsService extends Service {
  async list(page = 1) {
    const { app, ctx, config } = this
    // read config
    const { serverUrl, pageSize } = config.news;

    // use build-in http client to GET hacker-news api
    const { data: idList } = await ctx.curl(
      `${serverUrl}/topstories.json`,
      {
        data: {
          orderBy: '"$key"',
          startAt: `"${pageSize * (page - 1)}"`,
          endAt: `"${pageSize * page - 1}"`,
        },
        dataType: 'json',
      }
    );

    // parallel GET detail
    const newsList = await Promise.all(
      Object.keys(idList).map((key) => {
        const url = `${serverUrl}/item/${idList[key]}.json`;
        return ctx.curl(url, { dataType: 'json' });
      })
    );
    return newsList.map((res) => res.data);
  }
}

module.exports = NewsService;