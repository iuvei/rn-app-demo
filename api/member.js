import {fetch} from '../services/HttpService'

const {prependUrl, platformKey} = require('./../api.config')
// 抢红包
export const grabRedEnvelope = params => {
  return fetch({
    api: '/user/envelope/grabRedEnvelope',
    type: 'post',
    params
  })
}
// 红包倒计时
export const getRedEnvelopeTimeConfig = params => {
  return fetch({
    api: '/user/envelope/getRedEnvelopeTimeConfig',
    type: 'post',
    params
  })
}
// 锦绣风云榜
export const getRewardRankList = params => {
  return fetch({
    api: '/user/reward/getRewardRankList',
    type: 'get',
    params
  })
}

export const getTableList = ({apitype, api, formData}) => {
  return fetch({
    type: apitype,
    api: api,
    params: formData
  })
}

// 找回密码--检测用户绑定信息
export const checkUserBind = (data = {}) => {
  return fetch({
    api: '/user/checkUserInfo',
    type: 'post',
    params: data
  })
}

// 找回密码
export const retrieveLoginPwd = (data = {}) => {
  return fetch({
    api: '/user/retrieveUserPwd',
    type: 'post',
    params: data
  })
}

// 新增银行卡
export const addUserBank = (data) => {
  return fetch({
    api: '/user/addUserBankCard',
    type: 'post',
    params: data
  })
}

// 解绑银行卡
export const delBankCard = (data) => {
  return fetch({
    api: '/user/deleteUserBankCard',
    type: 'post',
    params: data
  })
}

// 修改银行卡信息
export const updateUserBankCard = (data) => {
  return fetch({
    api: '/user/updateUserBankCard',
    type: 'post',
    params: data
  })
}

// 查看下单成功后的订单详细信息
export const queryOrderDetails = (data) => {
  return fetch({
    type: 'post',
    api: '/order/queryOrderDetails',
    params: data
  })
}

// 修改登录密码
export const updateLoginPwd = (data) => {
  return fetch({
    type: 'post',
    api: '/user/setLoginPwd',
    params: data
  })
}

// 绑定资金密码
export const savePayPwd = (data) => {
  return fetch({
    type: 'post',
    api: '/user/savePayPwd',
    params: data
  })
}

// 修改资金密码
export const modifyPayPwd = (data) => {
  return fetch({
    type: 'post',
    api: '/user/setPayPwd',
    params: data
  })
}

// 解绑银行卡姓名
export const unBindBankName = (data) => {
  return fetch({
    type: 'post',
    api: '/user/unUserBankName',
    params: data
  })
}

// 清除资金密码
export const unBindPayPwd = (data) => {
  return fetch({
    type: 'post',
    api: '/user/unPayPwd',
    params: data
  })
}

// 清除密保
export const unBindMiBao = (data) => {
  return fetch({
    type: 'post',
    api: '/user/unProblem',
    params: data
  })
}

// 解绑谷歌验证
export const unBindGa = (data) => {
  return fetch({
    type: 'post',
    api: '/user/unBindGa',
    params: data
  })
}

// 绑定银行卡姓名
export const bindBankName = (data) => {
  return fetch({
    type: 'post',
    api: '/user/saveUserBankName',
    params: data
  })
}

// 绑定密保
export const bindSecurity = (data) => {
  return fetch({
    type: 'post',
    api: '/user/saveQuestion',
    params: data
  })
}

// 绑定谷歌验证
export const bindGoogleAuto = (data) => {
  return fetch({
    type: 'post',
    api: '/user/bindGa',
    params: data
  })
}

export const googleAuthImg = `${prependUrl}/user/generateGaImage?platformKey=${platformKey}`

// 获取谷歌验证密钥
export const getGaKey = () => {
  return fetch({
    type: 'get',
    api: '/user/getGAKey'
  })
}

// 修改昵称
export const modifyNickName = (data) => {
  return fetch({
    api: '/user/setNickName',
    type: 'post',
    params: data
  })
}

// 配置下级用户配额
export const updateQuato = (data) => {
  return fetch({
    api: '/user/updateQuato',
    type: 'post',
    params: data
  })
}

// 获取配额表及下级返点配额信息
export const getUserQuotaList = (data) => {
  return fetch({
    type: 'get',
    api: '/user/getUserQuotaList',
    params: data
  })
}

// 为下级充值
export const downRecharge = (data) => {
  return fetch({
    api: '/capital/transfer/downRecharge',
    type: 'post',
    params: data
  })
}

// 为下级升点
export const setRebate = (data) => {
  return fetch({
    api: '/user/updateRebate',
    type: 'post',
    params: data
  })
}

// 获取彩票前台升点最大值
export const getMaxUserUpdateRebate = () => {
  return fetch({
    type: 'get',
    api: '/user/maxUserUpdateRebate'
  })
}

// 百家乐用户返点修改
export const updateBaijlRebate = (data = {}) => {
  return fetch({
    api: '/user/updateBaijlRebate',
    type: 'post',
    params: data
  })
}

// 获取当前用户分红契约
export const getUserContract = (data) => {
  return fetch({
    api: '/user/userContract/getUserContract',
    type: 'post',
    params: data
  })
}

// 撤销工资契约
export const revokedSalaryContract = (data) => {
  return fetch({
    api: '/user/dailywages/revokedContract',
    type: 'post',
    params: data
  })
}

// 签订工资契约
export const addSalaryContract = (data) => {
  return fetch({
    api: '/user/dailywages/signControact',
    type: 'post',
    params: data
  })
}
// 更新契约工资内容
export const updateSalaryContract = (data) => {
  return fetch({
    api: '/user/dailywages/updateContract',
    type: 'post',
    params: data
  })
}

// 撤销契约
export const revokedContract = data => {
  return fetch({
    api: '/user/userContract/revokedContract',
    type: 'post',
    params: data
  })
}
// 与下级签订分红契约
export const addContract = data => {
  return fetch({
    api: '/user/userContract/addContractForUser',
    type: 'post',
    params: data
  })
}
// 百家乐用户返点修改
export const updateBaijlWater = (data = {}) => {
  return fetch({
    api: '/user/updateBaijlWater',
    type: 'post',
    params: data
  })
}
// 获取当前用户工资契约
export const getUserSalaryContract = (data) => {
  return fetch({
    api: '/user/dailywages/queryControact',
    type: 'post',
    params: data
  })
}
// 更新契约分红内容
export const updateContract = (data) => {
  return fetch({
    api: '/user/userContract/updateContract',
    type: 'post',
    params: data
  })
}
// 是否可以给下级签订契约
export const canSignContract = data => {
  return fetch({
    type: 'post',
    api: '/user/contract/IsSignContract',
    params: data
  })
}
// 领取分红
export const reviewBonusDetail = (data) => {
  return fetch({
    api: '/user/BonusDetail/contractDistributeBonus',
    type: 'post',
    params: data
  })
}
// 派发工资分红
export const distributeBonus = (data) => {
  return fetch({
    api: '/user/BonusDetail/distributeBonus',
    type: 'post',
    params: data
  })
}
// 确认签订契约工资内容
export const bindSalaryContract = (data) => {
  return fetch({
    api: '/user/dailywages/contractConfirm',
    type: 'post',
    params: data
  })
}
// 用户确认契约
export const bindContract = data => {
  return fetch({
    api: '/user/userContract/contractConfirm',
    type: 'post',
    params: data
  })
}

// 普通开户
export const addDown = ({type, formData}) => {
  return fetch({
    type,
    api: '/user/addDown',
    params: formData
  }).then((res) => {
    return Promise.resolve(res)
  })
}
// 新增用户开户链接
export const addSignup = (data) => {
  return fetch({
    type: 'post',
    api: '/user/addSignup',
    params: data
  })
}
// 删除开户链接
export const delSignup = (data) => {
  return fetch({
    type: 'post',
    api: '/user/delSignup',
    params: data
  })
}

/**
 * start 充值/提现/转账 相关接口
 * @author wade
 */
// 获取充值渠道列表
export const getRechargeChannels = () => {
  return fetch({
    type: 'get',
    api: '/capital/capitalBase/rechargeChannels'
  })
}
// 提现渠道列表
export const getWithdrawChannels = () => {
  return fetch({
    type: 'get',
    api: '/capital/capitalBase/withdrawChannels'
  })
}
// 提现
export const commitWithdrawal = (data) => {
  return fetch({
    type: 'post',
    api: '/capital/withdraw/requestWithdraw',
    params: data
  })
}
// 返点转主账户
export const commissionTransfer = () => {
  return fetch({
    type: 'get',
    api: '/capital/transfer/commissionTransfer'
  })
}
// 分红转主账户
export const dividentTransfer = () => {
  return fetch({
    type: 'get',
    api: '/capital/transfer/dividentTransfer'
  })
}

// 活动钱转主账户
export const envelopeTransfer = () => {
  return fetch({
    type: 'get',
    api: '/capital/transfer/envelopeTransfer'
  })
}
// 红包钱转主账户
export const activityTransfer = () => {
  return fetch({
    type: 'get',
    api: '/capital/transfer/activityTransfer'
  })
}
// 充值
export const commitRecharge = (data) => {
  return fetch({
    type: 'post',
    api: '/capital/recharge/requestRecharge',
    params: data
  })
}

/** end **/

// 获取收件箱信息
export const searchInBox = (params) => {
  return fetch({
    type: 'get',
    api: '/user/message/searchMessage',
    params
  })
}

// 获取收件箱信息
export const searchUnread = () => {
  return fetch({
    type: 'get',
    api: '/user/message/newMessageTotal'
  })
}

// 获取发件箱信息列表
export const searchOutBox = (params) => {
  return fetch({
    type: 'get',
    api: '/user/message/sendInboxMessage',
    params
  })
}

// 发送消息
export const sendMessage = (params) => {
  return fetch({
    type: 'post',
    api: '/user/message/sendMessage',
    params
  })
}

// 删除消息
export const delMessage = (params) => {
  return fetch({
    type: 'post',
    api: '/user/message/delMessage',
    params
  })
}

export const chatDetail = (params) => {
  return fetch({
    type: 'post',
    params,
    api: '/user/message/lookOverReplyMessage'
  })
}

// 回复信息接口
export const replyMessage = (params) => {
  return fetch({
    type: 'post',
    params,
    api: '/user/message/replyMessage'
  })
}

// 获取下级用户列表
export const downUser = (data) => {
  return fetch({
    type: 'get',
    params: data,
    api: '/user/message/getSubUser'
  })
}

// 百家乐转账
export const bacTransfer = (data) => {
  return fetch({
    api: '/capital/bac/transfer',
    type: 'post',
    params: data
  })
}

// 进入百家乐
export const toLiveGame = (params) => {
  return fetch({
    api: '/user/bjl/bjlTransferGame',
    type: 'post',
    params
  })
}

// 获取平台开通情况
export const getUserPlatformInfo = (params) => {
  return fetch({
    api: '/user/getUserPlatformInfo',
    type: 'get',
    params
  })
}

// 团队图形化接口
export const teamEcharts = (data) => {
  return fetch({
    type: 'post',
    api: '/user/teamEcharts',
    params: data
  })
}

// 获取团队人数，及余额
export const getTeamNumInfo = (formData) => {
  return fetch({
    type: 'get',
    api: '/user/getTeamNumInfo',
    params: formData
  })
}
// 团队图形化数字接口
export const getTeamStatistics = (data) => {
  return fetch({
    type: 'post',
    api: '/user/teamStatistics',
    params: data
  })
}

// 百家乐图形接口
export const getBjlTeamEchart = (data) => {
  return fetch({
    type: 'post',
    api: '/user/getBjlTeamEchart',
    params: data
  })
}

// 百家乐数字接口
export const getBjlTeamStatis = (data) => {
  return fetch({
    type: 'post',
    api: '/user/getBjlTeamStatis',
    params: data
  })
}

// 快乐彩图形接口
export const getHapppyTeamEchart = (data) => {
  return fetch({
    type: 'post',
    api: '/user/teamEchartsHappy',
    params: data
  })
}

// 快乐彩数字接口
export const getHappyTeamStatis = (data) => {
  return fetch({
    type: 'post',
    api: '/user/teamStatisticsHappy',
    params: data
  })
}
// 绑定支付宝姓名
export const bindAliName = (data) => {
  return fetch({
    type: 'post',
    api: '/user/setAlipayAccount',
    params: data
  })
}

// 解绑支付宝姓名
export const unbindAliName = (data) => {
  return fetch({
    type: 'post',
    api: '/user/unAlipayAccount',
    params: data
  })
}

// 查询用户推送消息
export const searchMessage = (data) => {
  return fetch({
    type: 'get',
    api: '/user/userMessage/getUserMessage',
    params: data
  })
}

export const updateMessage = (data) => {
  return fetch({
    type: 'get',
    api: '/user/userMessage/updateMessageStatus',
    params: data
  })
}

// 下属会会员列表
export const getOnlineMember = (data) => {
  return fetch({
    type: 'post',
    api: '/user/memberList',
    params: data
  })
}

// 团队报表总计
export const getTeamCount = (data) => {
  return fetch({
    type: 'post',
    api: '/report/system/teamCount',
    params: data
  })
}
