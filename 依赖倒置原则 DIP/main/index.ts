/* import { getUsers } from "../service";
getUsers() */
/* 上面是没有用依赖倒置原则的代码, 直接用localStorage方案 */


import { getUsers } from "../service";
// import { store } from "../storageStore";
import { store } from "../indexdbStore"; // 新增一种实现


getUsers(store)