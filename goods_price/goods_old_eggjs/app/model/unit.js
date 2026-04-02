const dayjs = require('dayjs');

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  /* define方法, 一参是模型名称, 用小驼峰 */
  return app.model.define('unit', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    unitName: {
      type: STRING(10),
      field: 'name', // 使用 field 属性将 unitName 映射到数据库中的 name 列
    },
    sortNum: STRING(10),
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
    tableName: 'unit', // 用下划线命名
    underscored: true,
    timestamps: true,
    paranoid: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: 'deleteTime',
  })
}