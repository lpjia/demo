let a = 0
  , b = 0
// console.log('a:', a)
// console.log('b:', b)

function add() {
  for (let i = 0; i < 5000; i++) {
    a++
    b++
  }
}

function compare() {
  for (let i = 0; i < 5000; i++) {
    if (a < b) {
      console.log(`${a}, ${b}`)
    }
  }
}
add()
compare()