module.exports = (app) => {
  const { validator } = app;

  validator.addRule('mobilePhone', (rule, value) => {
    /* rule参就是自定义校验规则的那个对象 { type: 'zdyRule', ... }
    value参是传的值
    返回的就是提示消息, 表示校验不通过
    想通过校验则跳过返回即可 */
    if (value && !/^1([3-9])\d{9}$/.test(value)) {
      return '手机号码无效';
    }
  })
};
