/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  /* get /api/unit/:id 查一个 getUnit
  get /api/unitList 查一堆 getUnitList
  get /api/unitListByPage 分页查一堆 getUnitListByPage
  // get /api/enum/unitMap 枚举的数据 getUnitMap
  // get /api/unit/enum 枚举的数据 getUnitMap
  get /api/unitMap 枚举的数据 getUnitMap

  post /api/product 创建数据 addProduct
  put /api/product 修改数据 updProduct
  del /api/product 删除数据 delProduct
  占位 */


  /* unit表和shop表的数据目前已经录入完整 */
  // router.get('/api/unitMap', controller.unit.getUnitMap)
  router.get('/api/unitList', controller.unit.getUnitList)

  // router.get('/api/shopMap', controller.shop.getShopMap)
  router.get('/api/shopList', controller.shop.getShopList)

  // router.post('/api/product', controller.product.addProduct)
  router.post('/api/productPriceHistory', controller.product.addProductPriceHistory)
  router.get('/api/product/:id', controller.product.getProductById)
  router.get('/api/productList', controller.product.getProductList)
  router.get('/api/productListWithPriceByName/:productName', controller.product.getProductListWithPriceByName)
  // router.put('/api/product/:id', controller.product.updProduct)
  // router.del('/api/product/:id', controller.product.delProduct)

  router.get('/api/productByName', controller.product.getProductByName)
  router.get('/api/productPriceHistory/:productId', controller.product.getProductPriceHistoryById)

  router.post('/api/insertBuyTime', controller.product.insertBuyTime)

};
