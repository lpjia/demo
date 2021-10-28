let type
if (type === 1 || type === 2 || type === 3) {
  // ...
}

const condition = [1, 2, 3]
if (condition.includes(type)) {
  // ...
}



const deps = {
  '采购部': [1, 2, 3],
  '人事部': [5, 8, 12],
  '行政部': [5, 14, 79],
  '运输部': [3, 64, 105],
}
let member = [...new Set(Object.values(deps).flat(Infinity))]
member




let user = {}
// console.log(user.address?.street)
console.log(user.address.street)