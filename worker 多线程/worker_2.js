function compare() {
  for (let i = 0; i < 5000; i++) {
    if (a < b) {
      console.log(`${a}, ${b}`)
    }
  }
}
// compare()

onmessage = e => {
  console.log("🚀 ~ file: worker_2.js ~ line 11 ~ e", e);
}