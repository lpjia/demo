const idx = async (ctx, next) => {
  let
    email = ctx.request.body.email || '',
    password = ctx.request.body.password || '';
  if (email === 'admin@example.com' && password === '123456') {
    console.log('signin ok!');
    ctx.render('signin-ok.html', {
      title: 'Sign In OK',
      name: 'Mr Node'
    });
  } else {
    console.log('signin failed!');
    ctx.render('signin-failed.html', {
      title: 'Sign In Failed'
    });
  }
}

module.exports = {
  'POST /signin': idx
}