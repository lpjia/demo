// 第一个文本
document.querySelector('#first').innerHTML = 'First'
// 第二个文本
// second 中的内容在线程中计算后返回
const second = document.querySelector('#second')
if (window.Worker) {
  second.innerHTML = '...'

  // 工作线程脚本
  const str = `
        onmessage = function(e) {
          const time = Math.random() * 3000
          // 模拟复杂计算
          setTimeout(() => {
            postMessage(\`Second \${time.toFixed(0)} ms, ID is \${e.data.uuid}\`);
          }, time);
        }
      `;
  const blob = new Blob([str]);
  const url = window.URL.createObjectURL(blob);
  // 加载 Worker 脚本
  this.worker = new Worker(url);

  // 替换成文件
  // const worker = new Worker('worker.js')

  // 发送消息
  worker.postMessage({
    uuid: new Date().getTime()
  });

  // 接收消息
  worker.onmessage = function (e) {
    second.innerHTML = e.data
  }

  // 错误事件
  worker.onerror = function (e) {
    second.innerHTML = 'Error occured!'
  }
} else {
  second.innerHTML = 'Not supprot Web Worker!'
}
// 第三个文本
document.querySelector('#third').innerHTML = 'Third'