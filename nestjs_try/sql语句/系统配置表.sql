CREATE TABLE system_config (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  config_key VARCHAR(100) NOT NULL,
  config_value VARCHAR(255) NOT NULL,
  remark VARCHAR(255) NOT NULL COMMENT '备注',

  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `operate_update_time` DATETIME NULL DEFAULT NULL COMMENT '用户操作时间',
  `update_time` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_time` DATETIME NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_config_key` (`config_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- 插入一条初始数据
INSERT INTO system_config (config_key, config_value, remark) VALUES ('JWT_GLOBAL_VERSION', '1', 'JWT全局版本号');
