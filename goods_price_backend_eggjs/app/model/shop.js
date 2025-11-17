const dayjs = require('dayjs');

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  /* define方法, 一参是模型名称, 用小驼峰 */
  return app.model.define('shop', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    shopName: {
      type: STRING(20),
      field: 'name',
    },
    position: STRING(50),
    sortNum: STRING(10),
    isAlive: STRING(2),
    shopAlias: {
      type: STRING(20),
      field: 'alias',
    },
    positionAlias: STRING(50),
    createTime: {
      type: DATE,
      get() {
        const date = this.getDataValue('createTime');
        return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : date;
      },
    },
    updateTime: {
      type: DATE,
      get() {
        const date = this.getDataValue('updateTime');
        return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : date;
      },
    },
    deleteTime: DATE,
  }, {
    freezeTableName: false, // 给false, 是不用define方法一参的字符串
    tableName: 'shop', // 用下划线命名
    underscored: true,
    timestamps: true,
    paranoid: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: 'deleteTime',
  })
}