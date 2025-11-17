'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const adminRoleUser = app.model.define('adminRoleUser', {
    id: {
      type: INTEGER, primaryKey: true, autoIncrement: true,
    },
    user_id: INTEGER,
    role_id: INTEGER,
  }, {
    freezeTableName: false,
    tableName: 'admin_role_user',
    underscored: false,
    timestamps: false,
  });

  adminRoleUser.associate = () => {
    app.model.AdminRoleUser.belongsTo(app.model.AdminRole, {
      as: 'role',
      foreignKey: 'role_id', // 关联外键字段名为 'user_id'
      targetKey: 'id', // 目标模型的关联字段名为 'id'
    });
  };

  return adminRoleUser
};
