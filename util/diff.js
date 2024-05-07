const ARRAY_TYPE = '[object Array]'
const OBJECT_TYPE = '[object Object]'
const FUNCTION_TYPE = '[object Function]'

export default function diff(current, pre) {
  const result = {}
  syncKeys(current, pre)
  _diff(current, pre, '', result)
  return result
}

function syncKeys(current, pre) {
  if (current === pre) return
  const rootCurrentType = type(current)
  const rootPreType = type(pre)
  if (rootCurrentType == OBJECT_TYPE && rootPreType == OBJECT_TYPE) {
    //if(Object.keys(current).length >= Object.keys(pre).length){
    for (let key in pre) {
      const currentValue = current[key]
      if (currentValue === undefined) {
        current[key] = null
      } else {
        syncKeys(currentValue, pre[key])
      }
    }
    //}
  } else if (rootCurrentType == ARRAY_TYPE && rootPreType == ARRAY_TYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index) => {
        syncKeys(current[index], item)
      })
    }
  }
}

function _diff(current, pre, path, result) {
  if (current === pre) return
  const rootCurrentType = type(current)
  const rootPreType = type(pre)
  if (rootCurrentType == OBJECT_TYPE) {
    if (rootPreType != OBJECT_TYPE || Object.keys(current).length < Object.keys(pre).length && path !== '') {
      setResult(result, path, current)
    } else {
      for (let key in current) {
        const currentValue = current[key]
        const preValue = pre[key]
        const currentType = type(currentValue)
        const preType = type(preValue)
        if (currentType != ARRAY_TYPE && currentType != OBJECT_TYPE) {
          if (currentValue !== pre[key]) {
            setResult(result, concatPathAndKey(path, key), currentValue)
          }
        } else if (currentType == ARRAY_TYPE) {
          if (preType != ARRAY_TYPE) {
            setResult(result, concatPathAndKey(path, key), currentValue)
          } else {
            if (currentValue.length < preValue.length) {
              setResult(result, concatPathAndKey(path, key), currentValue)
            } else {
              currentValue.forEach((item, index) => {
                _diff(item, preValue[index], concatPathAndKey(path, key) + '[' + index + ']', result)
              })
            }
          }
        } else if (currentType == OBJECT_TYPE) {
          if (preType != OBJECT_TYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(result, concatPathAndKey(path, key), currentValue)
          } else {
            for (let subKey in currentValue) {
              const realPath = concatPathAndKey(path, key) + (subKey.includes('.') ? `["${subKey}"]` : `.${subKey}`)
              _diff(currentValue[subKey], preValue[subKey], realPath, result)
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAY_TYPE) {
    if (rootPreType != ARRAY_TYPE) {
      setResult(result, path, current)
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current)
      } else {
        current.forEach((item, index) => {
          _diff(item, pre[index], path + '[' + index + ']', result)
        })
      }
    }
  } else {
    setResult(result, path, current)
  }
}

function concatPathAndKey(path, key) {
  return key.includes('.')
    ? path + `["${key}"]`
    : (path == '' ? '' : path + ".") + key
}

function setResult(result, k, v) {
  const t = type(v)
  if (t != FUNCTION_TYPE) {
    //if (t != OBJECT_TYPE && t != ARRAY_TYPE) {
    result[k] = v
    // } else {
    //     result[k] = JSON.parse(JSON.stringify(v))
    // }
  }
}

function type(obj) {
  return Object.prototype.toString.call(obj)
}
