let dhmsList = []
  , isInit = true

const doms = {
  d: document.querySelector('.days'),
  h: document.querySelector('.hours'),
  m: document.querySelector('.mins'),
  s: document.querySelector('.secs'),
}

function calcTime() {
  let targetTime = new Date('2024-1-1')
    , now = new Date()
    , oneDay = 24 * 60 * 60
    , oneHour = 60 * 60
    , oneMinute = 60

    , totalSecends = Math.round((targetTime - now) / 1000)
    , d = Math.floor(totalSecends / oneDay)
    , sOfDay = d * oneDay
    , h = Math.floor((totalSecends - sOfDay) / oneHour)
    , sOfHour = h * oneHour
    , m = Math.floor((totalSecends - sOfDay - sOfHour) / oneMinute)
    , sOfMinute = m * oneMinute
    , s = totalSecends - sOfDay - sOfHour - sOfMinute

  return [d, h, m, s]
}

function init(dom, i) {
  let txt = dhmsList[i]
  dom.querySelector('.card3').textContent = txt
  dom.querySelector('.card4').textContent = txt
}

function diff() {
  dhmsList.forEach((item, i) => {
    if (i === 3 && item === 0) {
      transform180(doms.m, 2)
    }
    else if (i === 2 && item === 0 && dhmsList[3] === 0) {
      transform180(doms.h, 1, false)
    }
    else if (i === 1 && item === 0 && dhmsList[3] === 0 && dhmsList[2] === 0) {
      transform180(doms.d, 0, false)
    }
  });
  transform180(doms.s, 3)
}

setInterval(() => {
  dhmsList = calcTime()
  // console.log('dhmsList:', dhmsList)
  if (isInit) {
    init(doms.d, 0)
    init(doms.h, 1)
    init(doms.m, 2)
    isInit = false
  }
  diff()
}, 1000);

/* 学习这种两个定时器结合来处理时间变化
先 setInterval 重复调处理函数
后处理函数内部再 setTimeout 较小时间, 然后 clearTimeout */
function transform180(dom, i, isSixty = true) {
  let txt = dhmsList[i]
    , timer = null
    , num = isSixty ? 59 : 23
    , card2 = dom.querySelector('.card2')
    , card3 = dom.querySelector('.card3')

  // 重置transition过渡和transform效果
  card2.style.transition = "0s";
  card3.style.transition = "0s";
  card2.classList.remove('active')
  card3.classList.remove('active')
  card3.textContent = txt
  dom.querySelector('.card4').textContent = txt
  dom.querySelector('.card1').textContent = txt ? txt - 1 : num
  card2.textContent = txt ? txt - 1 : num
  timer = setTimeout(() => {
    // 添加transform效果和transition过渡
    card2.style.transition = "all .5s";
    card3.style.transition = "all .5s";
    card2.classList.add('active')
    card3.classList.add('active')
    clearTimeout(timer);
  }, 100)
}