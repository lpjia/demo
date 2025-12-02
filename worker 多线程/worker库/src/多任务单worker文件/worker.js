export default (params) => {
  const { taskId, type, data } = params;
  // 模拟任务耗时（0.5 秒），方便观察并行效果
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 500);

  // 按类型处理任务（1 个文件实现多类型逻辑）
  let result = null;
  if (type === 'parse') {
    result = JSON.parse(data).num * 10;
  }
  else if (type === 'compute') {
    result = data.reduce((a, b) => a + b, 0);
  }

  // PID 相同是 Node.js Worker 线程的特性，核心看 “耗时”—— 如果是单线程，总耗时会是 5 秒，并行后仅 1 秒左右，证明多线程生效
  return `任务${taskId}[${type}]：${result} | 处理线程PID：${process.pid}`;
}