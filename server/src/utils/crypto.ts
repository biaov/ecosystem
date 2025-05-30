import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse('key-ecosytem@biaov')
const iv = CryptoJS.enc.Utf8.parse('iv-ecosytem@biaov')

/**
 * AES 加密
 */
export const aesEncrypt = data => {
  if (!data) return data
  const enc = CryptoJS.AES.encrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return enc.toString()
}

/**
 * AES 解密
 */
export const aesDecrypt = data => {
  if (!data) return data
  const dec = CryptoJS.AES.decrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return dec.toString(CryptoJS.enc.Utf8)
}

/**
 * MD5 加密
 */
export const md5 = (str: string) => CryptoJS.MD5(str).toString()
