export async function fetchGet(url, params) {
  const pinjie = !params ? '' : ('?' + params)
  const response = await fetch(url + pinjie);
  if (!response.ok) throw new Error('response failed')
  return response.json();
}


export async function fetchPost(url, params) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(params)
  });
  if (!response.ok) throw new Error('response failed')
  return response.json();
}