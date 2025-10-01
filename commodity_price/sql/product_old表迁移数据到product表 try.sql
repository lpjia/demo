-- 删表
drop table if exists `product2`;


-- 建表
create table `product2` (
  `id` int unsigned not null auto_increment,
  `product_name` varchar(10) not null default '' comment '商品名',
  `product_alias` varchar(10) not null default '' comment '商品别名',
  `temp_shop_name` varchar(20) not null default '' comment '商店名',
  -- 用varchar(10)来和无符号自增id来=, 没匹配上id后赋值'', 而不是某些默认值(比如0等)来干扰
  `shop_id` varchar(10) not null default '' comment '商店id',
  `create_time` datetime default null,
  `update_time` datetime default null on update current_timestamp,
  `delete_time` datetime default null,
 primary key (`id`)
) engine=innodb default charset=utf8mb4 collate=utf8mb4_general_ci;


insert into product2 (product_name, temp_shop_name)  
select product_name, shop_name from product_old;


-- 子查询
select product2.id as product_id, shop.id as shop_id  
from product2
join shop on product2.temp_shop_name = shop.shop_name
	



-- 更新数据
update product2 p  
join (
    /* 子查询
    把shop_name字段一样的数据查出来作为新表subq */
    select product2.id as product_id, shop.id as shop_id  
    from product2 -- 主表
    -- 关联一个表
    join shop on product2.temp_shop_name = shop.shop_name
) as subq on p.id = subq.product_id  
set p.shop_id = subq.shop_id;