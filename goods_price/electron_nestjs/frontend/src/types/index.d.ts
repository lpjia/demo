export interface Unit {
  id: number;
  unitName: string;
  sortNum: string;
}

export interface Shop {
  id: number;
  shopName: string;
  position: string;
  sortNum: string;
}

export interface Product {
  id: number;
  productName: string;
  shopId: string;
}

interface ShopInfo {
  id: number;
  shopName: string;
  position: string;
  isAlive: string;
}

export type ProductTp = Product & {
  shopInfo: ShopInfo;
}
type ProductTpShow = ShowMe<ProductTp>

export interface PriceHistory {
  buyTime: string;
  id: number;
  productId: string;
  price: string;
  unitId: string;
  spec: string;
  pricePer: string;
  note: string;
  unitName: string;
}


export interface ProductListWithPrice {
  createTime?: any;
  updateTime?: any;
  id: number;
  productName: string;
  productAlias: string;
  shopId: string;
  shopInfo: {
    createTime?: any;
    updateTime: string;
    id: number;
    shopName: string;
    position: string;
    sortNum: string;
    isAlive: string;
    shopAlias: string;
    positionAlias: string;
  };
  priceHistoryList: PriceHistoryList[];
}

interface PriceHistoryList {
  buyTime: string;
  createTime?: any;
  updateTime?: (null | string)[];
  id: number;
  productId: string;
  price: string;
  unitId: string;
  spec: string;
  pricePer: string;
  note: string;
  unitInfo: {
    createTime?: any;
    updateTime?: any;
    id: number;
    unitName: string;
    sortNum: string;
  };
}