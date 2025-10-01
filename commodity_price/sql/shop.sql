-- 删表
drop table if exists `shop`;


-- 建表
create table `shop` (
  `id` int unsigned not null auto_increment,
  `shop_name` varchar(20) not null default '' comment '商店名',
  `position` varchar(50) not null default '' comment '位置',
  `sort_num` varchar(10) not null default '' comment '排序',
  -- `is_alive` tinyint unsigned not null default 1 comment '存活, 0 否, 1 是',
  `is_alive` varchar(2) not null default '' comment '存活, 0 否, 1 是',
  `shop_alias` varchar(20) not null default '' comment '商店别名',
  `position_alias` varchar(50) not null default '' comment '位置别名',
  `create_time` datetime default null,
  `update_time` datetime default null on update current_timestamp,
  `delete_time` datetime default null,
 primary key (`id`)
) engine=innodb default charset=utf8mb4 collate=utf8mb4_general_ci;


-- 插入数据
begin;
insert into `shop` values (1, '金麦田生鲜超市', '万和城D区东门对面','', 1, '', '', null, null, null);
insert into `shop` values (2, '京小盒生活超市', '万和城D区东门对面往南临大街','', 1, '', '', null, null, null);
insert into `shop` values (3, '永辉超市', '新悦荟广场负一楼','', 1, '', '', null, null, null);
insert into `shop` values (4, '丹尼斯全日鲜万和城店', '万和城C区北门十字路口西北角','', 1, '', '', null, null, null);
insert into `shop` values (5, '蔬便利万和城店', '万和城D区南门丁字路口往南路东','', 1, '', '', null, null, null);
insert into `shop` values (6, '北门馒头店东侧卖菜店', '万和城D区北门东侧','', 1, '', '', null, null, null);
insert into `shop` values (7, '北门馒头店西侧卖菜店', '万和城D区北门东侧','', 1, '', '', null, null, null);
insert into `shop` values (8, '金梧桐合欢店', '新芒果春天社区','', 1, '', '', null, null, null);
insert into `shop` values (9, '怡亩田乡超市', '万和城D区东门对面往南临大街','', 0, '', '', null, null, null);
insert into `shop` values (10, '金梧桐长椿店', '万和城D区东门对面','', 0, '', '', null, null, null);
commit;