const formidable = require('formidable')

function getName(req, res) {
  /* req.query
  req.params
  req.body 需要手动加载(注册)中间件 */

  console.log('req.query:', req.query)
  console.log('req.params:', req.params)
  console.log('req.body:', req.body)

  // const form = new formidable.IncomingForm()
  // form.parse(req, (err, fields) => {
  //   if (err) return res.status(500).send('表单解析失败');
  //   console.log('接收到的表单数据:', fields);
  //   res.json(fields);
  // });

  // res.send('Hello World!')

  res.json({
    code: 200,
    msg: '',
    data: req.body
  })
}

/* function home(req, res) {
  console.log(req.cookies, 222)

  res.json({
    code: 200,
    msg: '',
    data: req.body
  })
} */

module.exports = {
  getName,
  /* home, */
}