
// 设置平台 false测试区，true正式区
const __PROD = true

// 以下一律不能动
let host = ''
let prependUrl = ''

if (__PROD) {
  host = 'http://www.hae17.com'
  prependUrl = 'http://www.hae17.com'
} else {
  // 测试区请求地址前缀
  host = 'http://huangjinhaian.qmuitest.com'
  prependUrl = 'http://huangjinhaian.qmuitest.com'
}

module.exports = {
  // ERR_OK: 0,
  // 端口号
  // port: 9302,

  // proxy urlhttp://150.109.183.26:8031/

  PROD: __PROD,

  host,
  prependUrl,

  // 平台key
  platformKey: '3LK0V/qWsjnMe935IUgNzw=='

}
