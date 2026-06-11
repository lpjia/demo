CREATE TABLE `article` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `title` VARCHAR(50) NOT NULL COMMENT '文章标题',
  `author` varchar(20) NOT NULL COMMENT '作者',
  `content` TEXT NOT NULL COMMENT '文章内容',
  `cover_url` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '封面URL',
  `type` TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '文章类型(1=未知, 2=原创, 3=转载)',
  -- `create_time` DATETIME NULL DEFAULT NULL COMMENT '创建时间', ORM配置没有数据库配置的优先级高, 导致插入记录时没值
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  -- `update_time` DATETIME NULL DEFAULT NULL COMMENT '更新时间',
  `update_time` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_time` DATETIME NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
  -- UNIQUE KEY `uk_title` (`title`) 不能加唯一约束, 数据库容易报错, 在后台程序限制唯一
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- 清爽版
-- 时间字段不要动
-- 上面的不再变动, 下面的增加了好几个字段


CREATE TABLE `article` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `title` VARCHAR(50) NOT NULL COMMENT '文章标题',
  `author` varchar(20) NOT NULL COMMENT '作者',
  `content` TEXT NOT NULL COMMENT '文章内容',
  `cover_url` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '封面URL',
  `type` TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '文章类型(1=未知, 2=原创, 3=转载)',
  `summary` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '摘要',
  `read_count` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '阅读量',
  `like_count` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '点赞量',
  `is_recommend` TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否推荐(1=推荐, 2=不推荐)',
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '文章状态(1=draft, 2=publish)',
  `kind_id` VARCHAR(10) NOT NULL DEFAULT '' COMMENT '分类id',

  `publish_time` DATETIME NULL DEFAULT NULL COMMENT '发布时间',

  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `operate_update_time` DATETIME NULL DEFAULT NULL COMMENT '用户操作时间',
  `update_time` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_time` DATETIME NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



-- ALTER TABLE user_like ADD COLUMN `operate_update_time` DATETIME NULL DEFAULT NULL COMMENT '用户操作时间';

-- ALTER TABLE article MODIFY COLUMN `update_time` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',