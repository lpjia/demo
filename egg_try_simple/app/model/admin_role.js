'use strict';

const dayjs = require('dayjs');
const formatTime = time => {
  return time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : null;
};

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  return app.model.define('adminRole', {
    id: {
      type: INTEGER, primaryKey: true, autoIncrement: true,
    },
    name: STRING(128),
    remarks: STRING(255),
    level: STRING(128),
    create_time: {
      type: DATE,
      get() {
        return formatTime(this.getDataValue('create_time'));
      },
    },
    update_time: {
      type: DATE,
      get() {
        return formatTime(this.getDataValue('update_time'));
      },
    },
    delete_time: DATE,
  }, {
    freezeTableName: false,
    tableName: 'admin_role',
    underscored: false,
    paranoid: true,
    timestamps: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: 'delete_time',
  });
};
