'use strict';

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  /* define方法, 一参是数据库的表名 */
  const User = app.model.define('user_list', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  })

  return User
}