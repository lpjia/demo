import { ShopEntity } from "src/shop/entities/shop.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { PriceHistoryEntity } from "./priceHistory.entity";

@Entity("product")
export class ProductEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({
    name: 'name',
    length: 20
  })
  productName: string;

  @Column({
    name: 'alias',
    length: 20
  })
  productAlias: string;

  /* @Column({
    name: 'shop_id',
    length: 10
  })
  shopId: string; */

  @Column({
    name: 'shop_id',
    type: 'int',
    unsigned: true
  })
  shopId: number;

  @CreateDateColumn({
    name: 'create_time',
    type: 'datetime',
    nullable: true,
  })
  createTime: string;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'datetime',
    nullable: true,
  })
  updateTime: string;

  @DeleteDateColumn({
    name: 'delete_time',
    type: 'timestamp',
    nullable: true,
    select: false
  })
  deleteTime: Date;

  // 多对一关联（一个店铺有多个产品）
  @ManyToOne(
    () => ShopEntity,
    shop => shop.productList,
    {
      eager: false, // 关闭 “自动关联加载”
      onDelete: 'SET NULL',
    }
  )
  @JoinColumn({ name: 'shop_id' }) // 外键字段
  shopInfo: ShopEntity;

  // 一对多关联（一个产品有多个历史价格）
  @OneToMany(
    () => PriceHistoryEntity,
    priceHistory => priceHistory.product,
    {
      eager: false,
    }
  )
  priceHistoryList: PriceHistoryEntity[];
}
