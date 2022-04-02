const form = document.querySelector('.registerForm')

form.onsubmit = () => {
  console.log('onsubmit()')

  if (form.username.value === '') {
    alert('用户名不能为空');
    return false;
  }

  if (form.password.value.length < 6) {
    alert('密码长度不能少于6位');
    return false;
  }

  if (!/^1[3|5|8][0-9]{9}$/.test(form.phoneNumber.value)) {
    alert('手机号码格式不正确');
    return false;
  }

  console.log('successful')
}