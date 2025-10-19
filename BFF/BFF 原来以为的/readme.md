### BFF, backend-for-frontend


index.html 作为前端
http://127.0.0.1:5500/

请求↓

koa2 作为BFF
http://127.0.0.1:7010
axios.post()

再请求↓

egg 作为后端
http://127.0.0.1:7001
router.post('/api/admin/users/login')