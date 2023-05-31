const domInput1 = document.querySelector('.input1');
const domInput2 = document.querySelector('.input2');
const domBall1 = document.querySelector('.ball1')
const domBall2 = document.querySelector('.ball2')

const cal = () => {
  console.log(domInput1.value);
  const val = Number(domInput1.value)
  // chrome会把-1s动画位置闪烁到0s处
  // domBall.style.setProperty('--delay', `-${val}s`)
  domBall1.style.setProperty('--delay', `-${val === 1 ? val - 0.01 : val}s`)
}

const cal2 = () => {
  console.log(domInput2.value);
  let val = Number(domInput2.value)
  val = val >= .58 ? .58 : val
  /* 58%→0
  input: 0→1
  >.58就不会变了 */
  domBall2.style.setProperty('--clip', `${58 - val * 100}%`)
}

domInput1.oninput = cal
domInput2.oninput = cal2
cal()
cal2()