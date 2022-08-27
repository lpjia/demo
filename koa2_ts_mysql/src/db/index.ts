import path from "path";
import { Sequelize } from "sequelize-typescript";
import config from "../../config";
import { dbLogger } from "../logger";

const { name, host, port, user, pawd } = config.db

const sequelize = new Sequelize(name as string, user as string, pawd, {
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
    // timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
    freezeTableName: true,
  },
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