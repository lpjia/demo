const modal = document.querySelector('.modal')
const btn = document.querySelector('button')

btn.textContent = '打开声音'

// 第二种方案, 互动后出声
function play() {
  video.muted = true
  video.play()
  const ctx = new AudioContext() // 创建音频上下文, 然后通过音频能否播放
  const canAutoPlay = ctx.state === 'running'
  ctx.close()
  if (canAutoPlay) {
    video.muted = false
    modal.style.display = 'none'
    btn.removeEventListener('click', play)
  }
  else {
    modal.style.display = 'block';
    btn.addEventListener('click', play);
  }
}

play()