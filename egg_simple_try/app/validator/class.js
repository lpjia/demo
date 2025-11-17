module.exports = {
  list: {
    headTeacher: { type: 'string', required: true }
  },
  listByPage: {
    page: { type: 'int', required: true },
    pageSize: { type: 'int', required: true },
  }
};
