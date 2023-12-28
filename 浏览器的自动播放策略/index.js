const modal = document.querySelector('.modal')
const btn = document.querySelector('button')
// 第一种方案, 互动后播放
// 引导用户去与页面交互实现播放
async function play() {
  try {
    // 尝试自动播放
    await video.play();
    // 使用await的原因是因为video.play()方法返回的是一个Promise,所以在这里我们可以对他进行一些处理
    modal.style.display = 'none';
    btn.removeEventListener('click', play);
    // 如果他自动播放了就隐藏按钮，消除点击事件
  } catch (err) {
    modal.style.display = 'block';
    btn.addEventListener('click', play);
    // 如果Promise返回的是error就引导用户点击按钮，在调用play方法
  }
}

play()