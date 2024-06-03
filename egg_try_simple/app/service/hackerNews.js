const { Service } = require('egg')

class HackerNews extends Service {
  constructor(ctx) {
    super(ctx);
    this.config = this.ctx.app.config.news;
    this.serverUrl = this.config.serverUrl;
    this.pageSize = this.config.pageSize;
  }

  async request(api, opts) {
    const options = Object.assign({
      dataType: 'json',
      timeout: ['30s', '30s'],
    }, opts);

    const result = await this.ctx.curl(`${this.serverUrl}/${api}`, options);
    return result.data;
  }

  async getTopStories(page, pageSize) {
    page = page || 1;
    pageSize = pageSize || this.pageSize;

    const result = await this.request('topstories.json', {
      data: {
        orderBy: '"$key"',
        startAt: `"${pageSize * (page - 1)}"`,
        endAt: `"${pageSize * page - 1}"`,
      },
    });
    return Object.keys(result).map(key => result[key]);
  }

  async getItem(id) {
    return this.request(`item/${id}.json`);
  }

  async getUser(id) {
    return this.request(`user/${id}.json`);
  }
}

module.exports = HackerNews;