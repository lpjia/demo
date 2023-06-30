let user = {
  name: '熊大',
  birth: '2002-5-7',
}

observe(user)

function changeName(e) {
  if (e.target.value === '') return;
  user.name = e.target.value
}
function changeBirth(e) {
  if (e.target.value === '') return;
  user.birth = e.target.value
}


function showFirstName() {
  document.querySelector('#firstName').textContent = '姓: ' + user.name[0];
}
function showLastName() {
  document.querySelector('#lastName').textContent = '名: ' + user.name.slice(1);
}
function showAge() {
  let birthday = new Date(user.birth)
  console.log(birthday)
  let today = new Date()
  console.log(today)
  // new Date(年, 月, 日) 月的数字比实际月小1是正确传值, getMonth返回就减1了
  let thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate())
  console.log(thisYearBirthday)
  let todayZero = today.setHours(0, 0, 0)
  console.log(new Date(todayZero))
  let age = today.getFullYear() - birthday.getFullYear()
  if (todayZero < thisYearBirthday) {
    age--
  }
  console.log(age)
  document.querySelector('#age').textContent = '年龄: ' + age;
}

// showFirstName()
// showLastName()
// showAge()

// // 换成
// window.__func = showFirstName
// showFirstName()
// window.__func = null

// window.__func = showLastName
// showLastName()
// window.__func = null

// window.__func = showAge
// showAge()
// window.__func = null

// 换成
autoRun(showFirstName)
autoRun(showLastName)
autoRun(showAge)



// let internalName = user.name
// Object.defineProperty(user, 'name', {
//   get() {
//     console.log('读取 name')
//     return internalName
//   },
//   set(val) {
//     console.log('给 name 赋值')
//     internalName = val
//   }
// })




// user.name = '韦蝠王'
// // 希望自动调用依赖该属性的函数
// showFirstName()
// showLastName()

// user.birth = '1980-1-1'
// // 希望自动调用依赖该属性的函数
// showAge()