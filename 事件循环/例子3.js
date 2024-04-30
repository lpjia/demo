async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)
async1()
new Promise((resolve) => {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')


/* 
渲染主线程:全局 

微队列: 
交互队列: 
延时队列:  


打印
start
a1_start
a2
p1
end
a1_end
p2
t
*/





/* async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  new Promise(function (resolve) {
    console.log('promise1');
    resolve();
  }).then(function () {
    console.log('promise2');
  });
}
console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0)
async1();
new Promise(function (resolve) {
  console.log('promise3');
  resolve();
}).then(function () {
  console.log('promise4');
});
console.log('script end'); */


/* 打印
start
a1_start
p1
p3
end
p2
a1_end
p4
t */





/* async function async1() {
  console.log('async1 start');
  await async2();
  setTimeout(function () {
    console.log('setTimeout1')  // 这一部分代码会放入到 promise 的微任务队列中。
  }, 0)
}
async function async2() {
  setTimeout(function () {
    console.log('setTimeout2')
  }, 0)
}
console.log('script start');
setTimeout(function () {
  console.log('setTimeout3');
}, 0)
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end'); */


/* 打印
start
a1_start
p1
end
p2
t3
t2
t1 */