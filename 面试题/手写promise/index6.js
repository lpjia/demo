const getUserInfo = () => new Promise((resolve, reject) => {
  resolve('this is userInfo')
})
const getArticles = (userInfo) => new Promise((resolve, reject) => {
  console.log('userInfo:', userInfo)
  resolve(['atc1', 'atc2', 'atc3'])
})
const getArticleDetail = (article) => new Promise((resolve, reject) => {
  resolve(`this is ${article} articleDetails`)
})

/* 还是回调地域 */
getUserInfo().then((userInfo) => {
  getArticles(userInfo).then((articles) => {
    Promise.all(articles.map((article) => getArticleDetail(article))).then((articleDetails) => {
      console.log(articleDetails)
    })
  })
})

/* 简化后 */
getUserInfo()
  .then(getArticles) // 这里 callback(this.#result) getArticles(getUserInfo的result就是userInfo)
  .then((articles) =>
    Promise.all(articles.map((article) => getArticleDetail(article)))
  )
  .then((articleDetails) => {
    console.log(articleDetails)
  })