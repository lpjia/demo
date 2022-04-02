import Validator from "./Validator.js"

const from_2 = document.querySelector('.registerform_2')

from_2.onsubmit = () => {
  console.log('onsubmit_2()')

  const validator = new Validator()
  validator.add(from_2.username, 'isNotEmpty', '用户名不能为空')
  validator.add(from_2.password, 'minLength:6', '密码长度不能少于6位')
  validator.add(from_2.phoneNumber, 'isMobile', '手机号码格式不正确')

  const errMsg = validator.start()
  if (errMsg) {
    alert(errMsg)
    return false
  }

  console.log('successful_2')
}