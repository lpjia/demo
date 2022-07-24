function defaultTask(cb) {
  console.log('测试输出')
  cb();
}


function task_1(cb) {
  console.log('测试输出 task_1')
  cb();
}


exports.task_1 = task_1
exports.default = defaultTask