function fn() {
  $.ajax({
    url: 'http://localhost:7010/api/student',
    type: 'POST', // 默认值'GET'
    // async: true, // 默认值true
    // contentType: 'application/json;charset=utf-8', // 默认值'application/x-www-form-urlencoded'
    data: { // data属性的值, 对象会被$ajax默认转成 查询字符串
      k1: 'v1',
      k2: 'v2',
    },


    /* contentType: 'application/json;charset=utf-8',
    data: JSON.stringify({ k1: 'v1', k2: 'v2', }), */

    /* 响应返回的原始数据 进行预处理 */
    dataFilter(...args) {
      console.log('dataFilter args:', args)
      return args[0]
    },
    dataType: 'json', // 预期服务器响应类型
    success(...args) {
      console.log('success args:', args)
    },
    error(...args) {
      console.log('error args:', args)
    },
    complete(...args) {
      console.log('complete args:', args)
    },
  })
}

// jQ语法
$(function () {

  fn()

})