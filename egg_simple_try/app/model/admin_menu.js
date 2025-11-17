'use strict';

const dayjs = require('dayjs');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  return app.model.define('adminMenu', {
    id: {
      type: INTEGER, primaryKey: true, autoIncrement: true,
    },
    parent_id: INTEGER,
    type: INTEGER,
    route_name: STRING(128),
    api_route_name: STRING(128),
    title: STRING(128),
    icon: STRING(128),
    cache: INTEGER,
    affix: INTEGER,
    breadcrumb: INTEGER,
    hidden: INTEGER,
    remarks: STRING(255),
    sort: INTEGER,
    create_time: {
      type: DATE,
      get () {
        const date = this.getDataValue('create_time');
        return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : date;
      },
    },
    update_time: {
      type: DATE,
      get () {
        const date = this.getDataValue('update_time');
        return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : date;
      },
    },
    delete_time: DATE,
  }, {
    freezeTableName: false,
    tableName: 'admin_menu',
    underscored: false,
    timestamps: true,
    paranoid: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: 'delete_time',
  });
};
