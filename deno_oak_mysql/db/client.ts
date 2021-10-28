import { Client } from "https://deno.land/x/mysql@v2.10.0/mod.ts";

import { DATABASE, TABLE } from "./config.ts";

const client = await new Client();

client.connect({
  hostname: "127.0.0.1",
  username: "root",
  password: "",
  db: "",
});

const run = async () => {
  // 创建一个数据库(前提是之前没有创建过)
  await client.execute(`CREATE DATABASE IF NOT EXISTS ${DATABASE}`);
  // 选择我们的数据库
  await client.execute(`USE ${DATABASE}`);
  /*
  // 如果已经创建过名为 Todo 的数据表, 将其删除
  await client.execute(`DROP TABLE IF EXISTS ${TABLE.TODO}`);
  // 创建 Todo 数据表
  await client.execute(`
    CREATE TABLE ${TABLE.TODO} (
      id int(11) NOT NULL AUTO_INCREMENT,
      todo varchar(100) NOT NULL,
      isCompleted boolean NOT NULL default false,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8
  `);*/
};

run();

export default client;
