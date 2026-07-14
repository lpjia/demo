const data = {
  "createTime": "2026-05-30 03:33",
  "operateUpdateTime": {},
  "id": 2,
  "title": "首席00应用程序制作人",
  "author": "岑梓诚",
  "content": "格带活议观十金转打。做西速力题海么片影位。往把象完比二直信难去。",
  "coverUrl": "",
  "type": 3,
  "summary": "44",
  "readCount": 5,
  "likeCount": 0,
  "isRecommend": 0,
  "status": 0,
  "kind": null,
  "tagList": [],
  "publishTime": null,
  "isMyLike": false
}


/* Object.entries 把obj转成二维数组, k是第一项, v是第二项
Object.fromEntries 逆操作 */


const er_wei = Object.entries(data)
console.log(er_wei)
const yuan = Object.fromEntries(er_wei)
console.log(yuan)