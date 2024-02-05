onmessage = (e) => {
  /* self可以省略 */

  setTimeout(() => {
    postMessage('从worker2.js返回的字符串信息')
  }, 2000);
}