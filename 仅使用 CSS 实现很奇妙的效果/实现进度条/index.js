
let dom = document.querySelector('.g-progress')
let dom2 = document.querySelector('.g-progress-2')
let dom3 = document.querySelector('.g-progress-3')


/*
let dom8 = document.querySelector('.g-container-8')
let perc = 0
  , percDeg = 0 */



// 动态变化
setTimeout(() => {
  setInterval(() => {
    dom.style.width = '10%'

    dom2.style.setProperty("--progress-2", '90%');
    dom3.style.setProperty("--progress-3", '90%');

    // 加不了过渡动画, 这种还是用 echarts 来实现吧
    /*
    perc = 80
    percDeg = Math.floor(360 * perc / 100)
    console.log("--percentage", perc + '%')
    console.log("--percentage-deg", percDeg + 'deg')
    dom8.style.setProperty("--percentage", perc + '%');
    dom8.style.setProperty("--percentage-deg", percDeg + 'deg');*/


  }, 2000);
}, 1000)

setTimeout(() => {
  setInterval(() => {
    dom.style.width = '70%'

    dom2.style.setProperty("--progress-2", '10%');
    dom3.style.setProperty("--progress-3", '10%');
  }, 2000);
}, 2000)