import greet from "../src/main";
// 导入 node_modules 中的第三方模块
import { chunk, camelCase } from 'lodash-es';

// 业务代码
const arr = [1, 2, 3, 4, 5];
console.log('分块：', chunk(arr, 2));
console.log('驼峰：', camelCase('hello-world'));


greet()