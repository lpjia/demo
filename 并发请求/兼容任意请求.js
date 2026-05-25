/**
 * 并发请求
 * @param {(string|RequestConfig)[]} requests - URL 字符串或请求配置对象
 * @param {number} maxNum - 最大并发数
 * @returns {Promise<Response[]>}
 *
 * @example
 * // GET 请求（简写）
 * concurrencyRequest(['/api/1', '/api/2'], 3)
 *
 * @example
 * // 混合请求
 * concurrencyRequest([
 *   '/api/1',
 *   { url: '/api/post', method: 'POST', body: JSON.stringify({a:1}), headers: {'Content-Type': 'application/json'} },
 *   { url: '/api/put', method: 'PUT' },
 *   { url: '/api/delete', method: 'DELETE' },
 * ], 3)
 */
function concurrencyRequest(requests, maxNum) {
  if (requests.length === 0) {
    return Promise.resolve([])
  }
  return new Promise((resolve) => {
    const result = []
    let nextIndex = 0
    let finishCount = 0

    function normalizeRequest(req) {
      if (typeof req === 'string') {
        return {
          url: req,
          method: 'GET'
        }
      }
      return {
        method: 'GET',
        ...req
      }
    }

    async function _request() {
      if (nextIndex >= requests.length) {
        return;
      }

      const i = nextIndex
      const req = normalizeRequest(requests[nextIndex++])
      const { url, method, body, headers, ...rest } = req
      const resp = await fetch(url, { method, body, headers, ...rest })
      result[i] = resp
      finishCount++
      if (finishCount === requests.length) {
        resolve(result)
        return;
      }
      _request()
    }

    const num = Math.min(maxNum, requests.length)
    for (let i = 0; i < num; i++) {
      _request()
    }
  })
}
