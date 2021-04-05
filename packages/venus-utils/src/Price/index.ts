/**
 * 用于处理商品价格，分割整数和小数部分
 *
 * @param  {String || Float}  price          商品价格
 * @param  {Number}           decimalPlaces  要保留的小数位数
 *
 * @return {Object}  { whole: 完整价格, int: 整数部分, decimal: 小数部分 }
 *
 */
export const SetPrice = (price: any, decimalPlaces?: any) => {
  const fPrice = parseFloat(price)

  if (Number.isNaN(fPrice)) {
    return {
      whole: price,
      int: price,
      decimal: ''
    }
  }
  let decimaNum = 0

  if (typeof decimalPlaces === 'undefined') {
    decimaNum = 2
  }

  const sPrice = fPrice.toFixed(decimaNum)
  const aPrice = sPrice.split('.')

  return {
    whole: sPrice,
    int: aPrice[0],
    decimal: aPrice[1] || ''
  }
}

/**
 * 以.为分隔符，显示价格位置
 * @param {String} price 价格
 */
export const SplitPrice = price => {
  if (price) {
    if (typeof price === 'number') {
      price = price.toFixed(2)
    }
    const splitPrice = price.split('.')
    return {
      int: splitPrice[0],
      decimal: splitPrice[1] ? splitPrice[1].substr(0, 2) : '00',
      whole: price
    }
  }
  return { int: '0', decimal: '00', whole: '0.00' }
}
