/* self可以省略 */
onmessage = (e) => {
  setTimeout(() => {
    console.log('worker2.js e.data:', e.data)
    postMessage('从worker2.js返回的字符串信息')
  }, 2000);
}