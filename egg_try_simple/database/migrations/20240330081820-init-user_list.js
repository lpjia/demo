'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // 在执行数据库升级时调用的函数，创建 user_list 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('user_list', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      age: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 user_list 表
  down: async (queryInterface) => {
    await queryInterface.dropTable('user_list');
  },
};
