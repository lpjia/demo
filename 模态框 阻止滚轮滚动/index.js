document.addEventListener('DOMContentLoaded', () => {
  const doms = {
    openBtn: document.querySelector('.openBtn'),
    closeBtn: document.querySelector('.closeBtn'),
    dialog: document.querySelector('.dialog'),
    openChildBtn: document.querySelector('.openChildBtn'),
    childDialog: document.querySelector('.childDialog'),
    closeChildBtn: document.querySelector('.closeChildBtn'),
  }

  /* 先点击按钮打开模态框
  注册滚轮事件, 调用preventDefault(), 滚轮行为应该无效
  关闭模态框
  移除滚轮事件 */

  function openHandler(e) {
    doms.dialog.showModal()
    /* passive为 true(默认值)时，表示 listener 永远不会调用 preventDefault()。也就是阻止默认行为        
    这时候浏览器会根据自己的默认行为来优化滚动渲染
    想调用 preventDefault() 时, 一定要要加 { passive: false } */
    window.addEventListener('wheel', wheelHandler, { passive: false })

    // // 一般会写成这样
    // window.addEventListener('wheel', wheelHandler)
  }
  doms.openBtn.addEventListener('click', openHandler)
  function wheelHandler(e) {
    e.preventDefault() // 调用 preventDefault()
  }

  doms.closeBtn.addEventListener('click', closeHandler)
  function closeHandler(e) {
    doms.dialog.close()
    window.removeEventListener('wheel', wheelHandler)
  }

  doms.openChildBtn.addEventListener('click', openChildHandler)
  function openChildHandler(e) {
    doms.childDialog.showModal()
  }

  doms.closeChildBtn.addEventListener('click', closeChildHandler)
  function closeChildHandler(e) {
    doms.childDialog.close()
  }
});