'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  return app.model.define('adminRoleMenu', {
    id: {
      type: INTEGER, primaryKey: true, autoIncrement: true,
    },
    menu_id: INTEGER,
    role_id: INTEGER,
  }, {
    freezeTableName: false,
    tableName: 'admin_role_menu',
    underscored: false,
    timestamps: false,
  });
};
