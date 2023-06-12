// 解析歌词字符串, 处理成对象
const parseLrc = () => {
  return lrc.split('\n').map((line) => {
    let parts = line.split(']')
    let timeStr = parts[0].substring(1)
    let words = parts[1]
    let times = timeStr.split(':')
    let allTimes = Number(times[0]) * 60 + Number(times[1])
    return {
      time: allTimes,
      words
    }
  });
}

const lrcList = parseLrc()

const doms = {
  audio: document.querySelector('audio'),
  ul: document.querySelector('.container ul'),
  container: document.querySelector('.container'),
}

// 找到当前播放的那行歌词索引
const findIndex = () => {
  let curTime = doms.audio.currentTime
  for (let index = 0; index < lrcList.length; index++) {
    if (curTime < lrcList[index].time) {
      return index - 1
    }
  }

  // 边界情况
  // 0s, 没有歌词与之对应, 返回-1
  // 最后时间, 应该对应最后一句歌词, 返回最后一个索引
  return lrcList.length - 1
}

const createLrcElements = () => {
  // 创建文档片段
  let frag = document.createDocumentFragment()

  for (const item of lrcList) {
    let li = document.createElement('li')
    li.classList.add('item')
    li.textContent = item.words
    frag.appendChild(li)
  }

  doms.ul.appendChild(frag)
}
createLrcElements()

let containerHeight = doms.container.clientHeight
let liHeight = doms.ul.children[0].clientHeight
let maxOffset = doms.ul.clientHeight - containerHeight

const setOffset = () => {
  let index = findIndex()
  let offset = (liHeight * index + liHeight / 2) - containerHeight / 2
  // 边界情况
  if (offset < 0) offset = 0
  if (offset > maxOffset) offset = maxOffset
  doms.ul.style.transform = `translateY(-${offset}px)`

  let activeLi = doms.ul.querySelector('li.active')
  if (activeLi) activeLi.classList.remove('active')
  let li = doms.ul.children[index]
  if (li) li.classList.add('active')
}

doms.audio.addEventListener('timeupdate', setOffset)



// // 这三个得总结
// let containerHeight = doms.container.clientHeight
// let containerHeight2 = doms.container.getBoundingClientRect().heigh1t
// let containerHeight3 = doms.container.offsetHeight
// console.log(containerHeight, containerHeight2, containerHeight3)