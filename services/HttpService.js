import axios from 'axios'

// 平台key
export const platformKey = '3LK0V/qWsjnMe935IUgNzw=='
// 请求地址前缀
export const prependUrl = 'http://tianxiang.qmuitest.com/qm'

// axios 配置
axios.defaults.timeout = 8000
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
  console.warn('错误的传参', error)
  // return Promise.reject(error)
})

// 返回 状态判断
axios.interceptors.response.use((response) => {
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

// 组件中请求
/**
 * 请求
 * @param type        请求类型 默认get
 * @param api         请求地址
 * @param formdata      请求参数
 * @param selfProxy   是否自己请求（不使用代理）
 * @returns {Promise<any>}
 */
export const axiosHttp = ({type, api, formdata, selfProxy}) => {
  formdata = Object.assign({}, formdata, {
    platformKey
  })
  api = selfProxy ? api : prependUrl + api
  type = type ? type.toLowerCase() : type
  if (type === 'post') {
    return axios.post(api, formdata)
      .then((res) => {
        return Promise.resolve(res ? res.data : {})
      })
  } else {
    formdata.timeStamp = new Date().getTime()
    return axios[type || 'get'](api, !selfProxy ? {params: formdata} : '')
      .then((res) => {
        return Promise.resolve(res ? res.data : {})
      })
  }
}
