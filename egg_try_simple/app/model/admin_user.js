'use strict';

const dayjs = require('dayjs');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const adminUser = app.model.define('adminUser', {
    id: {
      type: INTEGER, primaryKey: true, autoIncrement: true,
    },
    username: STRING(32),
    nickname: STRING(32),
    mobile: STRING(11),
    avatar: STRING(255),
    gender: INTEGER,
    email: STRING(128),
    password: STRING(128),
    last_login_ip: STRING(20),
    introduction: STRING(255),
    status: INTEGER,
    create_time: {
      type: DATE,
      get() {
        /* 获取器
        Sequelize 提供 getDataValue 方法
        避免直接读取 this.create_time 陷入死循环 */
        const time = this.getDataValue('create_time');
        return time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : null;
      },
    },
    update_time: {
      type: DATE,
      get() {
        const time = this.getDataValue('update_time');
        return time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : null;
      },
    },
    delete_time: DATE,
    last_login_time: {
      type: DATE,
      get() {
        const time = this.getDataValue('last_login_time');
        return time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : null;
      },
    },
  }, {
    freezeTableName: false,
    tableName: 'admin_user',
    underscored: false,
    paranoid: true,
    timestamps: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: 'delete_time',
  });

  adminUser.associate = () => {
    // 定义一对多关系，一个 adminUser 可以拥有多个 roles（AdminRoleUser）
    app.model.AdminUser.hasMany(app.model.AdminRoleUser, {
      as: 'roles', // 定义关联的别名
      foreignKey: 'user_id', // 关联外键字段名为 'user_id'
      sourceKey: 'id', // 源模型的关联字段名为 'id'
    });
  };

  return adminUser;
};
