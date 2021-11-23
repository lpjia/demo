let getDataByGet = async () => {
  let url = "http://rap2api.taobao.org/app/mock/288967/api/random"
  let response = await fetch(url);

  if (!response.ok) throw new Error('response failed')
  let res = await response.json();
  console.log('res: ', res)
}
getDataByGet()


let getDataByPost = async () => {
  let response = await fetch('http://rap2api.taobao.org/app/mock/270234/api/Alarm/Query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    // body: JSON.stringify(user)
  });
  let result = await response.json();
  console.log('result: ', result)
}
getDataByPost()