function updateValue(e) {
  // console.log('e:', e)
  // console.log('this:', this)

  if (e.target.id === 'kuan') {
    gao.disabled = true
    which = 'width'
  }
  else {
    kuan.disabled = true
    which = 'height'
  }

  if (e.target.value === '') {
    kuan.disabled = false
    gao.disabled = false

    which = null
  }

  domDiv.textContent = e.target.value; // 推荐
}

function confirm() {
  if (!which) return false

  domDiv.style.aspectRatio = domSelect.value.split(':').join('/')
  domDiv.style[which] = domDiv.innerHTML + 'px'
}

function reset() {
  kuan.value = ''
  gao.value = ''
  kuan.removeAttribute('disabled')
  gao.removeAttribute('disabled')
  // domSelect.value = '16:9'
}


let kuan = document.querySelector('#kuan')
  , gao = document.getElementById('gao')
  , domDiv = document.querySelector('.example_4')
  , domSelect = document.getElementsByName('select_1')[0]
  , which = null

// kuan.addEventListener('input', updateValue);
// gao.addEventListener('input', updateValue);