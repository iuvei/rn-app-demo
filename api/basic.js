import { fetch } from '../services/HttpService'

const {platformKey, prependUrl} = require('./../api.config')

// 登录和注册验证码
export const captcha = `${prependUrl}/user/captcha?platformKey=${platformKey}`

export const _getImageSetCookie = () => {
  let time = new Date().getTime()
  return fetch({
    type: 'get',
    api: '/user/captcha',
    params: {time}
  })
}

// 是否登录
export const getLoginUser = () => {
  return fetch({
    type: 'get',
    api: '/user/getLoginUser'
  })
}

// 登录
export const signIn = (params) => {
  return fetch({
    api: '/user/j_acegi_security_check',
    params
  })
}

// 退出
export const loginOut = () => {
  return fetch({
    api: '/user/j_acegi_logout',
    type: 'get'
  })
}

// 获取用户账户信息
export const getUserBalance = (data) => {
  return fetch({
    type: 'get',
    api: '/user/getUserBalance',
    params: data
  })
}

// 获取线路地址
export const lineDetection = () => {
  return fetch({
    api: '/user/lineDetection',
    type: 'get'
  })
}

// 客服地址
export const coustomerService = () => {
  return fetch({
    api: '/user/customerService',
    type: 'get'
  })
}

// 查询全部公告
export const getAllAdversize = (data) => {
  return fetch({
    api: '/user/notice/queryNoticeList',
    type: 'post',
    params: data
  })
  // return Promise.resolve({})
}

// 获取账户安全等级
export const getUserSecurityLevel = () => {
  return fetch({
    type: 'get',
    api: '/user/userSecurityLevel'
  })
}

// 获取用户密码配置信息
export const getPasswordRule = () => {
  return fetch({
    type: 'get',
    api: '/user/getPasswordRule'
  })
}

// 获取用户银行卡列表
export const getUserBankcards = (data) => {
  return fetch({
    type: 'get',
    api: '/user/getUserBankCards',
    params: data
  })
}

// 获取银行列表
export const getBankList = (data) => {
  return fetch({
    type: 'get',
    api: '/user/getBankList'
  })
}

// 获取解绑银行卡开关
export const delBankCardSwicth = () => {
  return fetch({
    type: 'get',
    api: '/user/getDelBankCardSwitch'
  })
}

// 验证用户消费量
export const getUserConsume = () => {
  return fetch({
    api: '/capital/capitalBase/isUserConsume',
    type: 'get'
  })
}

// 验证用户是否被限制取款
export const isAllowWithdraw = () => {
  return fetch({
    type: 'get',
    api: '/capital/capitalBase/isAllowWithdraw'
  })
}

// 获取用户消费量
export const getUserSumConsume = (data) => {
  return fetch({
    api: '/user/getUserSumConsume',
    type: 'get',
    params: data
  })
}

// 获取平台开通情况
export const getUserPlatformInfo = (data) => {
  return fetch({
    api: '/user/getUserPlatformInfo',
    type: 'get',
    params: data
  })
}

// 获取解绑GA开关和解绑银行卡姓名/资金密码开关
export const getUserSecurityConfig = () => {
  return fetch({
    type: 'get',
    api: '/user/getUserSercurityConfig'
  })
}

// 获取所有活动信息
export const getActivities = () => {
  return fetch({
    api: '/user/queryActivity',
    type: 'get'
  })
}

// 参与活动
export const joinActivity = (data) => {
  return fetch({
    api: '/user/attendActivityRecord',
    type: 'get',
    params: data
  })
}

// 是否参与活动
export const getUserActStatus = (data) => {
  return fetch({
    api: '/user/getActvityRecordStatus',
    type: 'get',
    params: data
  })
}

// 领取彩金
export const getCashBouns = (data) => {
  return fetch({
    api: '/user/cashingBouns',
    type: 'post',
    params: data
  })
}

// 注册
export const regist = (data) => {
  return fetch({
    type: 'post',
    api: '/user/registUser',
    params: data
  })
}

// 链接注册
export const urlRegist = (data) => {
  return fetch({
    type: 'post',
    api: '/user/signUp',
    params: data
  })
}

export const getAppdownload = () => {
  return fetch({
    api: '/user/appDownloadUrl',
    type: 'get'
  })
}

// 获取用户返点返水信息
export const getUserRebateInfo = (data) => {
  return fetch({
    api: '/user/getUserRebackInfo',
    type: 'get',
    params: data
  })
}

// 查询系统总奖金
export const getPlatformReward = () => {
  return fetch({
    api: '/user/reward/getPlatformReward',
    type: 'get'
  })
}

// 获取转线参数
export const getLineSwitchParam = () => {
  return fetch({
    api: '/user/getLineSwitchParam',
    type: 'get'
  })
}

// 换线操作,判断是否需要重新登录
export const checkLineSwitchParam = (data) => {
  return fetch({
    api: '/user/checkLineSwitchParam',
    type: 'post',
    params: data
  })
}

// 热更新
export const checkHotUpdate = () => {
  return fetch({
    api: '/system/hotupdate',
    type: 'get',
    params: {}
  })
}

// 获取所有app版本信息
export const getMoblieVersion = () => {
  return fetch({
    api: '/user/version/getMoblieVersion',
    type: 'get'
  })
}
