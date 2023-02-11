setTimeout(() => {
  console.log('first timeout')
  Promise.resolve().then(() => {
    console.log('first Promise')
  })
})
Promise.resolve().then(() => {
  console.log('second Promise')
  setTimeout(() => {
    console.log('second timeout')
  })
})
setTimeout(() => {
  console.log('Third timeout')
  Promise.resolve().then(() => {
    console.log('Third Promise')
  })
})
Promise.resolve().then(() => {
  console.log('Fourth Promise')
  setTimeout(() => {
    console.log('Fourth timeout')
  })
})
console.log('main')

// 这里还要再研究研究