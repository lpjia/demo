function compare() {
  for (let i = 0; i < 5000; i++) {
    if (a < b) {
      console.log(`${a}, ${b}`)
    }
  }
}
// compare()

onmessage = e => {
  console.log("🚀 ~ e", e)
}