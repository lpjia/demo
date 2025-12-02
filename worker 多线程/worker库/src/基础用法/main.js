// 主线程
import { Piscina } from 'piscina';

// 配置线程池（指定任务文件、最大线程数）
const pool = new Piscina({
  filename: new URL('./worker.js', import.meta.url).href,
});

// 提交任务（Promise 化返回结果）
const result = await pool.run({ data: '需要处理的数据' });
console.log('处理结果:', result);