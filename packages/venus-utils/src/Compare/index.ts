/**
 * 版本号比较
 * @param preVersion
 * @param lastVersion
 * @returns 0/1/-1
 */
export const versionCompare = (
  preVersion: string = '',
  lastVersion: string = ''
) => {
  const sources = preVersion.split('.')
  const dests = lastVersion.split('.')
  const maxLength = Math.max(sources.length, dests.length)
  let result = 0
  for (let i = 0; i < maxLength; i++) {
    let preValue = sources.length > i ? sources[i] : '0'
    let preNum = isNaN(Number(preValue))
      ? preValue.charCodeAt(0)
      : Number(preValue)
    let lastValue = dests.length > i ? dests[i] : '0'
    let lastNum = isNaN(Number(lastValue))
      ? lastValue.charCodeAt(0)
      : Number(lastValue)
    if (preNum < lastNum) {
      result = -1
      break
    } else if (preNum > lastNum) {
      result = 1
      break
    }
  }
  return result
}

/**
 * @desc 日期比较
 * @param time1 时间
 * @param time2 时间
 * @param  sign 符号
 * @return 0/1/-1
 */
export function dateCompare(time1 = '0', time2 = '0', sign = '') {
  // const reg = `/\\${sign}/g`;
  const reg = new RegExp(`\\${sign}`, 'g')
  const t1 = new Date(time1.replace(reg, '/')).getTime()
  const t2 = new Date(time2.replace(reg, '/')).getTime()
  if (t1 > t2) {
    return 1
  }
  if (t1 < t2) {
    return -1
  }
  return 0
}
