-- 删表
drop table if exists `unit`;


-- 建表
create table `unit` (
  `id` int unsigned not null auto_increment,
  `unit_name` varchar(10) not null default '' comment '计价单位',
  `sort_num` varchar(10) not null default '' comment '排序',
  `create_time` datetime default null, 
  `update_time` datetime default null on update current_timestamp,
  `delete_time` datetime default null,
 primary key (`id`)
) engine=innodb default charset=utf8mb4 collate=utf8mb4_general_ci;


-- 插入数据
begin;
insert into `unit` values (1, '元/kg', '',null, null, null);
insert into `unit` values (2, '元/斤', '',null, null, null);
insert into `unit` values (3, '元/g', '',null, null, null);
insert into `unit` values (4, '元/瓶', '',null, null, null);
insert into `unit` values (5, '元/个', '',null, null, null);
insert into `unit` values (6, '元/包', '',null, null, null);
insert into `unit` values (7, '元/条', '',null, null, null);
insert into `unit` values (8, '元/组', '',null, null, null);
insert into `unit` values (9, '元/箱', '',null, null, null);
insert into `unit` values (10, '元/提','', null, null, null);
commit;