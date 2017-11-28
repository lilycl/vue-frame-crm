export function uuid (len, radix) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  let i
  radix = radix || chars.length
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    let r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

export function getQuery (name) {
  let result = window.location.search.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'))
  if (result == null || result.length < 1) {
    return ''
  }
  return result[1]
}

/**
 * 先将数组转化成有序数组
 * json格式转树状结构
 * @param   {json}      json数据
 * @param   {String}    id的字符串
 * @param   {String}    父id的字符串
 * @param   {String}    children的字符串
 * @return  {Array}     数组
 */
export function transData (original, idField, pidField, childrenField) {
  if (original && original.length) {
    original.sort((a, b) => {
      return a[idField] - b[idField]
    })
  }
  let result = []
  let hash = {}
  const id = idField
  const pid = pidField
  const children = childrenField
  let i = 0
  let j = 0
  let len = original.length
  /**
   * 第一层将对象数组转化成JSON数据
   */
  for (; i < len; i++) {
    if (!hash[original[i][id]]) {
      hash[original[i][id]] = original[i]
    }
  }
  for (; j < len; j++) {
    let aVal = original[j]
    let hashVP = hash[aVal[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(aVal)
    } else {
      result.push(aVal)
    }
  }
  result.sort((a, b) => {
    return a[idField] - b[idField]
  })
  return result
}
