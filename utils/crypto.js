const CryptoJS = require('crypto-js')

// Aes加密的key，必须和服务端保持一致，由服务端进行提供
const AESKey = 'e1d626c5c932a41e'

/**
 * 加密（需要先加载lib/aes/aes.min.js文件）
 * @param word
 * @returns {*}
 */
function encrypt (word) {
  let key = CryptoJS.enc.Utf8.parse(AESKey)
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})
  return encrypted.toString()
}

/**
 * 解密fetch
 * @param word
 * @returns {*}
 */
// function decrypt (word) {
//   var key = CryptoJS.enc.Utf8.parse(AESKey)
//   var decrypt = CryptoJS.AES.decrypt(word, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})
//   return CryptoJS.enc.Utf8.stringify(decrypt).toString()
// }

export const toCrypto = (orderInfo) => {
  let orderInfoDetail = encrypt(JSON.stringify(orderInfo))
  return {orderInfoDetail}
}
