// 一般是取路径

// 获取最后一个斜杠后的内容
function getLastSlashLaterString(str) {
  const idx = str.lastIndexOf('/')
  return str.substring(idx + 1)
}

const str = 'https://cn.bing.com/search?q=Unicode&PC=U316&FORM=CHROMN'
console.log(
  getLastSlashLaterString(str)
)