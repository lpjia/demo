-- 删表
drop table if exists `price_history`;


-- 建表
create table `price_history` (
  `id` int unsigned not null auto_increment,
  -- 用varchar(10)来和无符号自增id来=, 没匹配上id后赋值'', 而不是某些默认值(比如0等)来干扰
  `product_id` varchar(10) not null default '' comment '商品id',
  `price` decimal(8,2) unsigned not null default 0 comment '单价',
  `unit_id` varchar(10) not null default '' comment '计价单位id',
  -- `discount_price` decimal(8,2) unsigned not null default 0 comment '折扣价',
  -- `discount_rate` varchar(10) not null default '' comment '折扣',
  `spec` varchar(20) not null default '' comment '规格',
  `buy_time` datetime default null comment '购买时间',
  `note` varchar(100) not null default '' comment '备注',
  `create_time` datetime default null,
  `update_time` datetime default null on update current_timestamp,
  `delete_time` datetime default null,
 primary key (`id`)
) engine=innodb default charset=utf8mb4 collate=utf8mb4_general_ci;


-- 插入数据
begin;
insert into `price_history` values (null, 47, 8.4, 1, '散装', '2024-06-26 19:59', '', null, null, null);
commit;