import {handleActions} from 'redux-actions'

const initialState = {
  memberText: '',
  activeAccount: {},
  userBalanceInfo: {}, // 用户账户信息
  userBalanceInfoYE: {}, // 用户账户余额信息
  userBalanceInfoFD: {}, // 返点
  userBalanceInfoFH: {}, // 分红
  userBalanceInfoHD: {}, // 活动
  userBalanceInfoHB: {}, // 红包
}

const member = handleActions({
  SET_MEMBER_TEXT: (state, {payload}) => {
    return {
      ...state,
      memberText: payload
    }
  },
  SET_ACTIVE_ACCOUNT: (state, {payload}) => {
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
  }
}, initialState)

export default member
