import loadingUrl from '@/assets/loading.gif'

function getLoadingImg(el) {
  return el.querySelector('img[data-role=loading]')
}
function createLoadingImg() {
  const img = document.createElement('img')
  img.dataset.role = 'loading'
  img.src = loadingUrl
  // img.classList.add('loading')
  img.className = 'loading'
  return img
}

export default function loading(el, binding) {
  const currImg = getLoadingImg(el)
  // 根据binding.value来创建/删除img元素
  if (binding.value) {
    // 没有img, 就创建
    if (!currImg) {
      const img = createLoadingImg()
      el.appendChild(img)
    }
  }
  else {
    // 有img, 就删除
    if (currImg) {
      currImg.remove()
    }
  }
}