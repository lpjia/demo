/* const p = new Promise(() => {
  throw 123
}) */

const p = new Promise(() => {
  setTimeout(() => {
    throw 123
  }, 0);
})

console.log(
  p
)