const dayjs = require('dayjs');

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  /* define方法, 一参是模型名称, 用小驼峰 */
  const product = app.model.define('product', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    productName: {
      type: STRING(10),
      field: 'name',
    },
    productAlias: {
      type: STRING(10),
      field: 'alias',
    },
    shopId: STRING(10),
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
    tableName: 'product', // 用下划线命名
    underscored: true, // true是字段自动转为下划线命名来查询等, 然后代码中所有字段都写小驼峰
    timestamps: true,
    paranoid: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: 'deleteTime',
  })

  product.associate = () => {
    // 定义一对多关系，一个 adminUser 可以拥有多个 roles（AdminRoleUser）
    // app.model.AdminUser.hasMany(app.model.AdminRoleUser, {

    // 定义多对一关系, 命名+Info
    app.model.Product.belongsTo(app.model.Shop, {
      as: 'shopInfo', // 定义关联的别名, 不能省略, 后续用作字段
      foreignKey: 'shopId', // 关联外键字段名为 'user_id'
      sourceKey: 'id', // 源模型的关联字段名为 'id'
    });

    // 定义一对多关系, 一个商品有多条历史记录, 命名+s或+List
    app.model.Product.hasMany(app.model.PriceHistory, {
      as: 'priceHistoryList',
      // 感觉product_id应该写到PriceHistory模型里
      foreignKey: 'productId',
      sourceKey: 'id',
    })
  };

  return product;
}