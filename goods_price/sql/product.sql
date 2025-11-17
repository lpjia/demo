-- 删表
drop table if exists `product`;


-- 建表
create table `product` (
  `id` int unsigned not null auto_increment,
  `product_name` varchar(10) not null default '' comment '商品名',
  `product_alias` varchar(10) not null default '' comment '商品别名',
  -- `shop_id` tinyint unsigned not null default 0 comment '商店id',
  `shop_id` varchar(10) not null default '' comment '商店id',
  `create_time` datetime default null,
  `update_time` datetime default null on update current_timestamp,
  `delete_time` datetime default null,
 primary key (`id`)
) engine=innodb default charset=utf8mb4 collate=utf8mb4_general_ci;


-- 插入数据
begin;
insert into `product` values (null, '', '', null, null, null);
commit;