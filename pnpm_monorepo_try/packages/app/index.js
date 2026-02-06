import { add, formatDate } from '@monorepo/utils'; // 引用本地子包

console.log('1+2=', add(1, 2));
console.log('当前时间:', formatDate(new Date()));