import { ProductEntity } from "src/product/entities/product.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity("shop")
export class ShopEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({
    name: 'name',
    length: 20
  })
  shopName: string;

  @Column({ length: 50 })
  position: string;

  @Column({
    name: 'sort_num',
    length: 10
  })
  sortNum: string;

  @Column({
    name: 'is_alive',
    length: 2
  })
  isAlive: string;

  @Column({
    name: 'alias',
    length: 20
  })
  shopAlias: string;

  @Column({
    name: 'position_alias',
    length: 50
  })
  positionAlias: string;

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

  @OneToMany(
    () => ProductEntity,
    product => product.shopInfo
  )
  productList: ProductEntity[];
}
