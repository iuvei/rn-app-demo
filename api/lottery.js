import {fetch} from '../services/HttpService'
// 获取彩种列表
export const getSysLottery = params => {
  return fetch({
    api: '/order/queryLotter',
    params
  })
}

// 检索该彩种的玩法数据
export const loadGamesPlay = params => {
  Object.assign(params, {
    isOuter: 0
  })
  return fetch({
    api: '/order/queryLotterRule',
    // api: '/order/queryLotterRuleByLotterCode',
    params
  })
}

// 最近开奖记录
export const loadLatelyOpenHistory = params => {
  return fetch({
    api: '/order/queryRecentlyReward',
    params
  })
}

// 当前开奖期
export const loadOpenIssue = params => {
  return fetch({
    api: '/order/openTime',
    params
  })
}

// 轮询上一次 开奖号码
export const pollingPrevOpen = params => {
  return fetch({
    api: '/order/openResult',
    params
  })
}

// 查询用户上一期是否有中奖
export const queryLastIssueReward = params => {
  return fetch({
    api: '/order/queryUserLastIssueReward',
    params
  })
}

export const getwpRulegroups = params => {
  return fetch({
    type: 'post',
    api: '/order/querywpLotterRules',
    params
  })
}

// 立即投注
export const toBuyLottery = params => {
  return fetch({
    api: '/order/submit',
    params
  })
}

// 检索当前追号期号
export const getChaseTime = params => {
  return fetch({
    api: '/order/queryLotterExcept',
    params
  })
}

export const toBuywpLottery = params => {
  return fetch({
    api: '/order/submitOuter',
    params
  })
}

export const queryOrderAdditions = params => {
  return fetch({
    type: 'post',
    api: '/order/queryOrderAdditions',
    params
  })
}
export const getChaseOrderDetail = params => {
  return fetch({
    type: 'post',
    api: '/order/getOrderBatchStatistics',
    params
  })
}
// 百家乐游戏菜单列表
export const getBjlComputerGameType = params => {
  return fetch({
    type: 'get',
    api: '/user/bjl/getBjlComputerGameType',
    params
  })
}

// 百家乐游戏列表
export const getBjlComputerGameList = params => {
  return fetch({
    type: 'post',
    api: '/user/bjl/getBjlComputerGameList',
    params
  })
}

// 百家乐游戏试玩
export const bjlGameTry = params => {
  return fetch({
    type: 'post',
    api: '/user/bjl/bjlDemoGame',
    params
  })
}

// 百家乐进入游戏
export const bjlGameLogin = params => {
  return fetch({
    type: 'post',
    api: '/user/bjl/bjlPlayGame',
    params
  })
}

// 热门彩种最近一期开奖记录
export const getHotLotter = () => {
  return fetch({
    type: 'get',
    api: '/order/getHotLotter'
  })
}

// 是不是测试环境
export const isTestEnvironment = () => {
  return fetch({
    type: 'get',
    api: '/order/isTestEnvironment'
  })
}
