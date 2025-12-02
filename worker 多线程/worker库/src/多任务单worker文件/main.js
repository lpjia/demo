import { Piscina } from 'piscina';
import { resolve as pathResolve, dirname as pathDirname } from 'node:path'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = pathDirname(__filename);

const pool = new Piscina({
  // filename: new URL('./worker.js', import.meta.url).href, // file协议地址
  filename: pathResolve(__dirname, './worker.js'), // 常见的绝对路径
  maxThreads: 4, // 4 个线程 = 4 个并行处理的“worker 实例”
});

console.log(new URL('./worker.js', import.meta.url).href)
console.log(pathResolve(__dirname, './worker.js'))

const tasks = Array.from({ length: 10 }, (_, i) => {
  // 任务类型随机选：解析 / 计算
  const type = i % 2 === 0 ? 'parse' : 'compute';
  const data = type === 'parse' ? `{"num":${i}}` : [i, i * 2];
  return pool.run({ type, data, taskId: i }); // 每个任务带唯一 ID
});

const results = await Promise.all(tasks);
results.forEach(res => console.log(res));

// 任务完成后关闭线程池（避免 Node.js 进程挂起）
await pool.destroy();