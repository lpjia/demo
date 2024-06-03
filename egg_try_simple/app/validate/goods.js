module.exports = {
  create: {
    name: { type: 'string', required: true },
    age: { type: 'int', required: true },
  },
  update: {
    id: { type: 'int', required: true },
    name: { type: 'string', required: false },
    age: { type: 'int', required: false },
  },
  listByPage: {
    page: { type: 'int', required: true },
    pageSize: { type: 'int', required: true },
  }
};
