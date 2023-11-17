function fn() {
  $.ajax({
    url: 'http://localhost:7010/api/student',
    type: 'GET',
    async: true,
    /* data属性赋值了obj结构, 会被默认转换成查询字符串 */
    data: {
      k1: 'v1',
      k2: 'v2',
    },
    /* 给Ajax返回的原始数据的进行预处理 */
    dataFilter(data, type) {
      console.log(
        '返回的原始数据:',
        data,
        typeof data, // 这个原始数据竟然是json字符串
        type,
      )

      let obj = JSON.parse(data)
      obj.data = '处理原始数据后新赋值'
      console.log(
        obj
      )

      // return data
      return JSON.stringify(obj)
    },
    dataType: 'json', // 服务器返回的数据类型
    success(res) {
      console.log('res:', res)
    },
    error(xhr, textStatus, errorThrown) {
      console.log(
        xhr,
        textStatus,
        errorThrown,
      )
    },
    complete(xhr, textStatus) {
      console.log(
        xhr,
        textStatus,
      )
    }
  })
}

function fn2() {
  $.ajax({
    url: 'http://localhost:7010/api/student',
    type: 'POST',
    async: true,
    contentType: 'application/json;charset=utf-8',
    /* 传json字符串, 用JSON.stringify转 */
    data: JSON.stringify({
      k11: 'v11',
      k22: 'v22',
    }),
    /* POST请求, data属性不能直接赋值obj结构 */
    // data: {
    //   k11: 'v11',
    //   k22: 'v22',
    // },
    success(res) {
      console.log('res:', res)
    },
    error(xhr, textStatus, errorThrown) {
      console.log(
        xhr,
        textStatus,
        errorThrown,
      )
    },
    complete(xhr, textStatus) {
      console.log(
        xhr,
        textStatus,
      )
    }
  })
}

// jQ语法
$(function () {

  fn2()

})