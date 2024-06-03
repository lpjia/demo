const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/users.test.js', () => {
  describe('GET /users', () => {
    it('should work', async () => {
      // 通过 factory-girl 快速创建用户对象到数据库中
      await app.factory.createMany('user_list', 3); // createMany方法, 一参是表名
      const res = await app.httpRequest().get('/api/users?limit=2');
      assert(res.status === 200);
      assert(res.body.length === 2);
      assert(res.body[0].name);
      assert(res.body[0].age);
    });
  });

  describe('GET /users/:id', () => {
    it('should work', async () => {
      const user = await app.factory.create('user_list'); // create方法, 一参是表名
      const res = await app.httpRequest().get(`/api/users/${user.id}`);
      assert(res.status === 200);
      assert(res.body.age === user.age);
    });
  });

  describe('POST /users', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/api/users').send({
        age: 10,
        name: 'name',
      });
      assert(res.status === 201);
      assert(res.body.id);

      res = await app.httpRequest().get(`/api/users/${res.body.id}`);
      assert(res.status === 200);
      assert(res.body.name === 'name');
    });
  });

  describe('DELETE /users/:id', () => {
    it('should work', async () => {
      const user = await app.factory.create('user_list');

      app.mockCsrf();
      const res = await app.httpRequest().delete(`/api/users/${user.id}`);
      assert(res.status === 200);
    });
  });
});