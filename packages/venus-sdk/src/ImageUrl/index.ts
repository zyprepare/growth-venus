/* eslint-disable no-param-reassign */
import { getApp } from '@tarojs/taro'

let networkType
const webpSupport = Taro.getSystemInfoSync().platform === 'android' // 是否支持webp

/**
 * 验证图片有效性
 * @param {String} url
 */
export const validImgUrl = (url: string): string => {
  const imgReg = /^(http:|https:)?\/\//i
  if (url && imgReg.test(url)) {
    return url
  }
  return ''
}

export const imgHttpsAdd = (url: string): string => {
  if (url.match(/^((https|http)?:)?\/\//i)) {
    return url.replace(/^((https|http)?:)?\/\//i, 'https://')
  }
  return `https://${url}`
}
/**
 * 格式化图片
 * @param {String} url 图片地址
 * @param {String} width 图片宽
 * @param {Boolean} height 图片高，默认等于宽
 * @param {String} cut 居中裁剪参数 例如：200x200
 */
export const parseImgUrl = (
  url: string,
  width?: number,
  height?: number,
  cut?: string
) => {
  if (!url) return ''

  if (url.indexOf('data:image') === 0 && url.indexOf('base64') !== -1) {
    return url
  }

  // taro引入本地图片
  if (url.indexOf('/assets/') === 0) {
    return url
  }

  // 去除链接中空白字符
  url = url.replace(/\s+/g, '')

  // 统一协议头
  url = url.replace(/^(https?:)?\/\//i, 'https://')

  // 去除图片后缀的多余字符
  const rUrl = url.match(
    /(\S*(jpg|jpeg|png|webp|gif|JPG|JPEG|PNG|WEBP|GIF))\s*/g
  )
  if (!rUrl) {
    return url
  }
  // eslint-disable-next-line prefer-destructuring
  url = rUrl[0]

  // 拼接域名和业务名
  if (!/^https/i.test(url)) {
    if (/\/?sku\/\S*/i.test(url)) {
      url = `https://img10.360buyimg.com/${url}`
    } else {
      url = `https://img10.360buyimg.com/img/${url}`
    }
  }

  // Gif 图不做后续处理
  if (/\.gif/i.test(url)) return url

  // 是否JFS 图片
  const isJfsImg = /jfs\//.test(url)

  // 非JFS 或CDN 图片不处理
  if (
    !isJfsImg ||
    !/(m|img\d{1,2})\.360buyimg\.com/.test(url) ||
    !/\.(jpg|jpeg|png|webp)/.test(url)
  ) {
    return url
  }

  if (width && !height) {
    height = width
  }

  // 从本地存储读取webp 的支持情况
  if (webpSupport && /\.(jpg|jpeg|png)/.test(url) && !/\.webp/.test(url)) {
    url += '.webp'
  }

  // 设定宽高
  if (width) {
    url = url.replace(/(\/)(?:s\d+x\d+_)?(jfs\/)/, `$1s${width}x${height}_$2`)
  }

  // 质量压缩
  if (/\.(jpg|jpeg)/.test(url)) {
    try {
      if (!networkType) {
        networkType = getApp().networkType
      }
    } catch (error) {
      // console.log(error);
    }

    const level = { wifi: 80, '4g': 60, '3g': 40, '2g': 20 }[networkType]
    if (level) {
      url = url.replace(/(\.(jpg|jpeg))(!q\d{1,2})?/, `$1!q${level}`)
    }
  }
  // 图片裁剪
  if (cut) {
    url = `${url}!cc_${cut}`
  }
  // 分散域名
  const pool = [10, 11, 12, 13, 14, 20, 30] // 域名池
  const idx =
    (parseInt(url.substr(url.lastIndexOf('/') + 1, 8), 36) || 0) % pool.length
  url = url.replace(/(\/\/img)\d{1,2}(\.360buyimg\.com)/, `$1${pool[idx]}$2`)

  return url
}
