/* 主线程：发任务，不关心线程 */
import { Piscina } from 'piscina';
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// 配置线程池：1个 Worker 入口 + 4个线程（自动调度）
const pool = new Piscina({
  filename: resolve(__dirname, './worker_entry.js'), // 常见的绝对路径
  maxThreads: 4, // 4 个线程 = 4 个并行处理的“worker 实例”
});

// 批量提交不同类型的任务（验证模块化 + 自动调度）
const tasks = [
  { type: 'parse', data: '{"num":10}' }, // 解析任务
  { type: 'compute', data: [1, 2, 3, 4, 5] }, // 计算任务
  { type: 'encrypt', data: { name: 'test', value: 100 } }, // 加密任务
  { type: 'parse', data: '{"num":20}' }, // 解析任务
  { type: 'compute', data: [6, 7, 8, 9, 10] }, // 计算任务
  { type: 'encrypt', data: { name: 'demo', value: 200 } }, // 加密任务
];

// 给每个任务加唯一ID（方便对应结果）
const tasksWithId = tasks.map((task, index) => ({ ...task, taskId: index }));

tasksWithId.push({ type: 'encrypt', data: { name: '紧急数据', value: 999 }, taskId: 99 })

// 提交所有任务，等待结果（Piscina 自动分配空闲线程）
const results = await Promise.all(tasksWithId.map((task) => {
  const taskStartTime = Date.now(); // 任务提交时的时间戳（毫秒）
  const option = task.taskId === 99 ? { priority: 0 } : {}; // priority 越小优先级越高
  return pool.run(task, option).then((res) => {
    const taskEndTime = Date.now();
    const costTime = taskEndTime - taskStartTime; // 任务执行耗时（毫秒）
    // 补充时间信息到结果中
    return {
      ...res,
      startTime: taskStartTime,
      endTime: taskEndTime,
      costTime: costTime
    };
  })
}));

// 打印结果（验证模块化功能和并行效果）
console.log('所有任务结果：');
results
  .sort((a, b) => a.endTime - b.endTime) // 按完成时间升序排列（先完成的在前）
  .forEach(res => {
    console.log(`\n任务${res.taskId} [${res.type}]：`);
    console.log(`  🕒 开始时间：${new Date(res.startTime).toLocaleTimeString()}.${res.startTime % 1000}`);
    console.log(`  🕒 完成时间：${new Date(res.endTime).toLocaleTimeString()}.${res.endTime % 1000}`);
    console.log(`  ⏳ 耗时：${res.costTime}ms`);
    console.log(`  结果：`, res.result);
    console.log(`  处理线程PID：`, res.threadPid);
  });

// 任务完成后关闭线程池（避免 Node.js 进程挂起）
await pool.destroy();