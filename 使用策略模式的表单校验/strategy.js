export default {
  isNotEmpty(val, errMsg) {
    if (val === '') return errMsg

    // 为了测试 apply 的第一个参
    this.isMobile(val, errMsg)
  },

  minLength(val, leng, errMsg) {
    if (val.length < leng) return errMsg
  },

  isMobile(val, errMsg) {
    if (!/^1[3|5|8][0-9]{9}$/.test(val)) return errMsg
  }
}