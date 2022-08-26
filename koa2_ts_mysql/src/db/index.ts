import path from "path";
import { Sequelize } from "sequelize-typescript";
import config from "../../config";

const { name, host, port, user, pawd } = config.db

const sequelize = new Sequelize(name as string, user as string, pawd, {
  host: host,
  port: port as unknown as number,
  dialect: 'mysql',
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