-- 删表
drop table if exists `product`;


-- 建表
create table `product` (
  `id` int unsigned not null auto_increment,
  `product_name` varchar(10) not null default '' comment '商品名',
  `product_alias` varchar(10) not null default '' comment '商品别名',
  `temp_shop_name` varchar(20) not null default '' comment '商店名',
  `shop_id` varchar(10) not null default '' comment '商店id',
  `create_time` datetime default null,
  `update_time` datetime default null on update current_timestamp,
  `delete_time` datetime default null,
 primary key (`id`)
) engine=innodb default charset=utf8mb4 collate=utf8mb4_general_ci;

-- 依次把每条product_old表的数据插入到product表, 仅仅某些字段
insert into product (product_name, temp_shop_name)  
select product_name, shop_name from product_old;


-- 更新数据
update product p  
join (
    /* 子查询
    把shop_name字段一样的数据查出来作为新表subq */
    select product.id as product_id, shop.id as shop_id  
    from product -- 主表
    -- 关联一个表
    join shop on product.temp_shop_name = shop.shop_name  
) as subq on p.id = subq.product_id  
set p.shop_id = subq.shop_id;


-- 删除临时字段
alter table product drop column temp_shop_name;