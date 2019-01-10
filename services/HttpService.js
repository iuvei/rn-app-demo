import axios from 'axios'
// import {NoticeTips} from 'util/pop-tool'
const {prependUrl, platformKey} = require('./../api.config')
// axios 配置
axios.defaults.timeout = 30000
axios.defaults.retry = 2
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.baseURL = apiConfig.proxyUrl

// 请求 post传参序列化
axios.interceptors.request.use((config) => {
  // console.log('请求 config：', config)
  if (config.method === 'post') {
    // 适用 老米台子
    // config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  console.warn('错误的传参')
  return Promise.reject(error)
})

// 返回 状态判断
axios.interceptors.response.use((response) => {
  // 对响应数据做些事
  // -200004, "请求参数有误！！！"
  // -200001, "平台信息不能为空！"
  // -200002, "平台信息不存在！"
  // -200014, "Cookie中不存在认证信息！！！"
  // -200013, "用户已登录!"
  // -200012, "用户没有登录，请先登录！"
  // -200011, "用户登录超时，需重新登录！"
  // -200010, "用户认证失败，需重新登录！"
  // -20000   "用户已经失效，请重新登录"

  // switch (response.data.code) {
  //   case -20000:
  //   case -200010:
  //   case -200011:
  //   case -200012:
  //   case -200014:
  //     // NoticeTips({
  //     //   content: response.data.message
  //     // })
  //     if (window.location.href.indexOf('login') === -1 &&
  //       window.location.href.indexOf('linespeed') === -1 &&
  //       window.location.href.indexOf('regist') &&
  //       window.location.href.indexOf('loading')) {
  //       window.location.href = window.location.protocol + '//' + window.location.host + '/' + 'login'
  //     }
  //     break
  // }
  if (response.status === 200 && response.data.code !== 0) {
    console.log('接口 = ' + response.config.url + ', code = ' + response.data.code, ', message = ' + response.data.message)
  }
  return response
}, (err) => {
  // NoticeTips({
  //   content: '网络不稳定，请稍后重试'
  // })
  console.log('接口报错了', err)
  var config = err.config
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err)
  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0
  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    // return Promise.reject(err)
    console.log('already tried ' + config.__retryCount + ' times')
    return
  }
  // Increase the retry count
  config.__retryCount += 1
  // Create new promise to handle exponential backoff
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve()
    }, config.retryDelay || 3000)
  })
  // Return the promise in which recalls axios to retry the request
  return backoff.then(function () {
    return axios(config)
  })
})

/**
 * 请求
 * @param api         请求地址
 * @param params      请求参数
 * @param type        请求类型 默认post
 * @param selfProxy   是否自己请求（不使用代理）
 * @returns {Promise<any>}
 */
export const fetch = ({api, params, type, selfProxy, hasKey}) => {
  return new Promise((resolve, reject) => {
    type = type ? type.toLowerCase() : 'post'
    if (!hasKey) {
      params = Object.assign({}, params, {
        platformKey
      })
    }
    api = selfProxy ? api : prependUrl + api
    if (type !== 'post') {
      params.timeStamp = new Date().getTime()
      axios[type](api, !selfProxy ? {params} : '').then(response => {
        if (response) {
          resolve(response.data)
        }
      }, err => {
        resolve(err)
      }).catch((error) => {
        reject(error)
      })
    } else {
      axios.post(api, params).then(response => {
        if (response) {
          resolve(response.data)
        }
      }, err => {
        resolve(err)
      }).catch((error) => {
        reject(error)
      })
    }
  })
}
