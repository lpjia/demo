let timer = null;

function myDebounce() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    fn()
  }, 500);
}

function fn() {
  console.log('执行myDebounce')
}

window.onresize = myDebounce