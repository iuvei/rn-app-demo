import {handleActions} from 'redux-actions'

const initialState = {
  activeAccount: {},
  userBalanceInfo: {}, // 用户账户信息
  userBalanceInfoYE: {}, // 用户账户余额信息
  userBalanceInfoFD: {}, // 返点
  userBalanceInfoFH: {}, // 分红
  userBalanceInfoHD: {}, // 活动
  userBalanceInfoHB: {}, // 红包
  userBankInfo: {
    userBankCards: [],
    bankTime: 6
  },  // 用户银行卡列表
  isAllowWithdraw: {sign: false, message: '', local: true}, // 是否可提现
  userConsume: {}, // 用户消费量验证对象
  bankList: [], // 系统银行列表
  gaKey: '',
  subUserInfo: {}, // 下级用户信息
}

const member = handleActions({
  SET_ACTIVE_ACCOUNT: (state, {payload = {}}) => {
    return {
      ...state,
      activeAccount: payload
    }
  },
  SET_USER_BALANCEINFO: (state, {payload}) => {
    return {
      ...state,
      userBalanceInfo: payload
    }
  },
  SET_USERBALANCE_YUE: (state, {payload}) => {
    return {
      ...state,
      userBalanceInfoYE: payload
    }
  },
  SET_USERBALANCE_FD: (state, {payload}) => {
    return {
      ...state,
      userBalanceInfoFD: payload
    }
  },
  SET_USERBALANCE_FH: (state, {payload}) => {
    return {
      ...state,
      userBalanceInfoFH: payload
    }
  },
  SET_USERBALANCE_HD: (state, {payload}) => {
    return {
      ...state,
      userBalanceInfoHD: payload
    }
  },
  SET_USERBALANCE_HB: (state, {payload}) => {
    return {
      ...state,
      userBalanceInfoHB: payload
    }
  },
  SET_USER_BANKINFO: (state, {payload}) => {
    return {
      ...state,
      userBankInfo: payload
    }
  },
  SET_ISALLOW_WITHDRAW: (state, {payload}) => {
    return {
      ...state,
      isAllowWithdraw: payload
    }
  },
  SET_USER_CONSUME: (state, {payload}) => {
    return {
      ...state,
      userConsume: payload
    }
  },
  SET_GA_KEY: (state, {payload}) => {
    return {
      ...state,
      gaKey: payload
    }
  },
  SET_SUB_USER_INFO: (state, {payload}) => {
    return {
      ...state,
      subUserInfo: payload
    }
  }
}, initialState)

export default member
