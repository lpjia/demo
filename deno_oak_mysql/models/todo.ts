import client from "../db/client.ts";

// 加载配置文件
import { TABLE } from "../db/config.ts";

// 加载接口文件
import Todo from "../interfaces/Todo.ts";

export default {
  /**
   * 将会返回 todo 表中的所有内容
   * @returns 返回全部都是 todo 元素的数组
   */
  getAll: async () => {
    return await client.query(`SELECT * FROM ${TABLE.TODO}`);
  },

  /**
   * 通过解构的 id 参数值, 来检查相应的 todo 元素是否存在于数据表中
   * @param id
   * @returns 返回布尔值来代表是否存在
   */
  doesExistById: async ({ id }: Todo) => {
    const [result] = await client.query(
      `SELECT COUNT(*) count FROM ${TABLE.TODO} WHERE id = ? LIMIT 1`,
      [id],
    );
    return result.count > 0;
  },

  /**
   * 通过解构的 id 参数值, 来返回相应的 todo 元素
   * @param id
   * @returns 返回一个 todo 元素
   */
  getById: async ({ id }: Todo) => {
    return await client.query(
      `SELECT * FROM ${TABLE.TODO} WHERE id = ?`,
      [id],
    );
  },

  /**
   * 在 todo 表中增加一个新的 todo 元素
   * @param todo
   * @param isCompleted
   */
  add: async ({ todo, isCompleted }: Todo) => {
    return await client.query(
      `INSERT INTO ${TABLE.TODO}(todo, isCompleted) values(?,?)`,
      [todo, isCompleted],
    );
  },

  /**
   * 修改某个 todo 元素的内容
   * @param id
   * @param todo
   * @param isCompleted
   * @returns 返回一个数字(代表影响的行数)
   */
  updateById: async ({ id, todo, isCompleted }: Todo) => {
    const result = await client.query(
      `UPDATE ${TABLE.TODO} SET todo=?, isCompleted=? WHERE id=?`,
      [todo, isCompleted, id],
    );
    return result.affectedRows;
  },

  /**
   * 通过 id 来删除指定的元素
   * @param id
   * @returns 整数
   */
  deleteById: async ({ id }: Todo) => {
    const result = await client.query(
      `DELETE FROM ${TABLE.TODO} WHERE id=?`,
      [id],
    );
    return result.affectedRows;
  },
};
