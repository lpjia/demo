function log(i) {
  console.log(
    $('.form1 input').eq(i).prop('checked'),
    $('.form1 input').eq(i).attr('checked')
  )
}


/* 布尔状态（checked、disabled、selected） → 使用 .prop()
get set 会随交互变化而改变值
返回布尔类型的值, 符合人的常识

.attr('checked')
get 始终返回初始值 "checked"
set 无效
占位  */


$(function () {
  console.log(
    $('.logo').prop('src'),
    $('.logo').attr('src')
  )
})

/* HTML 特性（src、href、data-*、id、class） → 使用 .attr()
获取原始 HTML 路径, 写的啥 拿到的就是啥

.prop('src')
返回绝对路径, 不推荐用
占位 */

function changeImage() {
  $('.logo').attr('src', '../imgs/present.png')
}


/* 表单值（value） → 使用 .prop() 或 .val()（.val() 更简洁）
手动改页面上的input值
set 改变
get 跟随改变

.attr('value')
get set 无效

占位 */
function log2(i) {
  console.log('.prop()')
  console.log(
    $('.form2 input').eq(i).prop('value'),
    typeof $('.form2 input').eq(i).prop('value'),
    $('.form2 input').eq(i).val()
  )
  console.log('.attr()')
  console.log(
    $('.form2 input').eq(i).attr('value'),
    typeof $('.form2 input').eq(i).attr('value')
  )
}


/* .attr() 反映初始文档结构，.prop() 反映当前 DOM 状态 */