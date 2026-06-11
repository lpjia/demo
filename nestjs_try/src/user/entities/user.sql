CREATE TABLE `user` (
  `ulid` VARCHAR(26) NOT NULL COMMENT '主键ULID',
  `auto_id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `username` VARCHAR(50) NOT NULL COMMENT '用户名',
  `nickname` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '昵称',
  `password` VARCHAR(255) NOT NULL COMMENT '密码',
  `avatar` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '头像',
  `email` VARCHAR(100) NOT NULL COMMENT '邮箱地址',
  `role` TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '角色(1=root, 2=author, 3=visitor)',
  
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `operate_update_time` DATETIME NULL DEFAULT NULL COMMENT '用户操作时间',
  `update_time` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_time` DATETIME NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`ulid`),
  UNIQUE KEY `uk_auto_id` (`auto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- MySQL 中只能存在一个 AUTO_INCREMENT 列，且该列必须被定义为某个键（通常是主键或唯一键）
-- UNIQUE KEY `uk_auto_id` (`auto_id`) 只在当前表具有唯一性, UNIQUE KEY `命名可以简单点`
