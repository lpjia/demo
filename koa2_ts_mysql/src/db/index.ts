import path from "path";
import { Sequelize } from "sequelize-typescript";
import config from "../../config";
import { dbLogger } from "../logger";

const { name, host, port, user, pswd } = config.db

const sequelize = new Sequelize(name as string, user as string, pswd, {
  host,
  port: port as unknown as number,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  // 日志
  logging: msg => dbLogger.info(msg),
  define: {
    timestamps: false, // 关闭Sequelize的自动添加timestamp的功能
    /* 关闭后响应数据就不会添加以下两个麻瓜字段 */
    // createdAt: 'create_time',
    // updatedAt: 'update_time',
    freezeTableName: true, // 强制表名=模型名, 否则会自动复数化
  },
  // 方言选项, 也就是不同数据库各自的独有配置
  dialectOptions: {
    dateStrings: true // 时间格式化
  },
  // 找 model 文件
  models: [
    path.join(__dirname, '..', 'model/**/*.ts'), // 开发加载
    path.join(__dirname, '..', 'model/**/*.js'), // 编译后加载
  ]
});

export default async function db() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}