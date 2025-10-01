const dayjs = require('dayjs');

module.exports = (app) => {
  const { STRING, INTEGER, DATE, DECIMAL } = app.Sequelize

  /* define方法, 一参是模型名称, 用小驼峰 */
  const priceHistory = app.model.define('priceHistory', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    productId: STRING(10),
    price: DECIMAL(8, 2),
    unitId: STRING(10),
    spec: STRING(20),
    note: STRING(100),
    // buyTime: DATE,
    buyTime: { // 从数据库查到的时间, 给前端返回前, 就不用再处理了, 已转成常见格式
      type: DATE,
      get() {
        // this.getDataValue方法拿到原始查询数据, 也就是内部属性 dataValues 的值
        // 这里不能用get方法(会进入死循环)
        // 还有个setDataValue方法, set方法
        const date = this.getDataValue('buyTime');
        return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : date;
      },
    },
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
    tableName: 'price_history', // 用下划线命名
    underscored: true,
    timestamps: true,
    paranoid: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: 'deleteTime',
  })

  priceHistory.associate = () => {
    // 定义多对一关系, 命名+Info
    app.model.PriceHistory.belongsTo(app.model.Unit, {
      as: 'unitInfo', // 定义关联的别名, 不能省略, 后续用作字段
      foreignKey: 'unitId', // 关联外键字段名为 'user_id'
      sourceKey: 'id', // 源模型的关联字段名为 'id'
    });
  };

  return priceHistory;
}