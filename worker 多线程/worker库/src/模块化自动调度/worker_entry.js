/* Worker 入口：统一分发任务 */

// 建立“任务类型 → 模块化函数”的映射表
const taskMap = {
  parse: () => import('./task/parse.js').then(m => m.parse), // 动态导入, 优化加载性能
  encrypt: () => import('./task/encrypt.js').then(m => m.encrypt),
  compute: () => import('./task/compute.js').then(m => m.compute)
};

// Piscina 会调用这个出口函数，自动分发任务
export default async (params) => {
  const { type, data, taskId } = params;

  // 1. 校验任务类型
  if (!taskMap[type]) {
    throw new Error(`未知任务类型：${type}（支持的类型：${Object.keys(taskMap).join(',')}）`);
  }

  // // 2. 模拟任务耗时（500ms），方便观察并行效果
  // Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 500);

  // 3. 调用对应模块化函数，执行任务
  const func = await taskMap[type]();
  const result = await func(data);

  // 4. 返回结果（带任务ID，方便主线程对应）
  return {
    taskId,
    type,
    result,
    threadPid: process.pid // Node.js 中标识线程（虽共享PID，但并行效果靠耗时验证）
  };
};