/**
 * 随机字母
 * @param { number } 字母长度
 * @returns { string } 数字
 */
export const randomLetter = (length = 5) => {
  let code = ''
  for (let i = 0; i < length; i++) {
    const num = Math.random() * (122 + 1 - 97) + 97
    code += String.fromCharCode(num)
  }

  return code
}
