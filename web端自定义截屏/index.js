/**
 * 文档 https://gitee.com/likai119/js-screen-shot
 * 参数说明
 * https://gitee.com/likai119/js-screen-shot#%E5%8F%82%E6%95%B0%E8%AF%B4%E6%98%8E
 * https://github.com/likaia/js-screen-shot#%E5%8F%82%E6%95%B0%E8%AF%B4%E6%98%8E
 */

let objInstance = null
// 截图确认按钮回调函数
const callback = (base64) => {
  console.log(base64);
}
// 截图取消时的回调函数
const closeFn = () => {
  console.log("截图窗口关闭");
}
const startScreenshot = () => {
  objInstance = new screenShotPlugin({
    enableWebRtc: false,
    completeCallback: callback,
    closeCallback: closeFn
  });
}