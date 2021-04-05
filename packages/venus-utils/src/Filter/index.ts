export const filterPhone = (message: string) => {
  if (!message) return []

  // 手机号 /1[3-9](\d{9})/
  // 固定电话(区+号码+分机号) /((0\d{2,3})-?)(\d{7,8})(-(\d{3,}))?/
  // 电话5至11解析为电话，其他允许误杀
  const phoneNumArr = message.match(
    /(\d{5,})|(((0\d{2,3})-?)(\d{7,8})(-(\d{3,}))?)/g
  )

  if (phoneNumArr) {
    let strArray: string[] = []

    // 过滤大于11数字
    const newPhoneArr = phoneNumArr.filter(phoneNum => {
      return phoneNum.length <= 11
    })

    if (newPhoneArr.length === 0) {
      return [message]
    }

    newPhoneArr.forEach(phone => {
      let temMsgArr: string[] = message.split(phone)
      if (temMsgArr.length === 2) {
        message = temMsgArr[1]
        if (phoneNumArr.length > 1) {
          temMsgArr.pop()
        }
      }
      temMsgArr.splice(1, 0, phone)
      strArray = strArray.concat(temMsgArr)
      phoneNumArr.shift()
    })

    return strArray
  }
  return [message]
}
