function log() {
  console.log('打印一些东西')
}


const doms = {
  header: document.querySelector('h1'),
  footer: document.querySelector('p'),
}
let rate = 1
doms.header.addEventListener('click', () => {
  rate += 0.5
  doms.footer.style.transform = `translateX(${rate * 100}px)`
})


/* 引入vue3 */
const { createApp, ref, reactive } = Vue
createApp({
  setup() {
    const message = ref('Hello Vue!')
    const arr = reactive(
      [
        { name: 'one', id: 1 },
        { name: 'two', id: 2 },
        { name: 'three', id: 3 },
      ]
    )
    const handle = () => {
      message.value = message.value.split('').reverse().join('')
    }
    const add = () => {
      arr.push({ name: 'ten', id: 10 })
      console.log(arr.length)
    }
    return {
      message,
      arr,
      handle,
      add,
    }
  }
}).mount('#app')