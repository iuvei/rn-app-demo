import { createAction } from "redux-actions"
import {
  getUserBalance,
  getUserBankcards,
  isAllowWithdraw,
  getUserConsume
} from '../api/basic'
import {
  getGaKey
} from '../api/member'
import { AsyncStorage } from 'react-native'

export const AsetUserBankCards = function(userId) {
  return createAction(
    'SET_USER_BANKINFO',
    async () => {
      let res = await getUserBankcards({userId})
      return res.code === 0 ? res.data : {
        userBankCards: [],
        bankTime: 6
      }
    }
  )
}()

export const AsetIsAllowWithdraw = createAction(
  'SET_ISALLOW_WITHDRAW',
  async () => {
    let res = await isAllowWithdraw()
    return res.code === 0 ? {sign: res.data.sign, message: res.message} : {sign: false, message: ''}
  }
)

export const AsetUserConsume = createAction(
  'SET_USER_CONSUME',
  async () => {
    let res = await getUserConsume()
    return res.code === 0 ? Object.assign({}, res.data, {code: 0}) : {code: res.code, message: res.message}
  }
)

export const AsetGaKey = createAction(
  'SET_GA_KEY',
  async () => {
    let res = await getGaKey()
    return res.code === 0 ? res.data.gaKey : ''
  }
)

export const AgetUserBalance = (data) => {
  return {
    type: 'SET_USER_BALANCEINFO',
    payload: data
  }
}

export const AgetUserBalance_YUE = (data) => {
  return {
    type: 'SET_USERBALANCE_YUE',
    payload: data
  }
}

export const AgetUserBalance_FD = (data) => {
  return {
    type: 'SET_USERBALANCE_FD',
    payload: data
  }
}

export const AgetUserBalance_FH = (data) => {
  return {
    type: 'SET_USERBALANCE_FH',
    payload: data
  }
}

export const AgetUserBalance_HD = (data) => {
  return {
    type: 'SET_USERBALANCE_HD',
    payload: data
  }
}

export const AgetUserBalance_HB = (data) => {
  return {
    type: 'SET_USERBALANCE_HB',
    payload: data
  }
}

export const AsetSubUserInfo = (data) => {
  return {
    type: 'SET_SUB_USER_INFO',
    payload: data
  }
}

export const AsetAllBalance = ({cb}) => {
  return (dispatch, getState) => {
    let {common: {userId}} = getState()
    getUserBalance({userId}).then(res => {
      if (res.code === 0) {
        dispatch(AgetUserBalance(res.data.banlance))
        // let sysCurCode = storage.get('sysCurCode') || 'CNY'
        AsyncStorage.getItem('sysCurCode').then(sysCurCode => {
          sysCurCode = sysCurCode || 'CNY'
          let sysCurrencyInfo = res.data.banlance[sysCurCode].currencyInfo
          // commit('SET_CURRENCY_INFO', sysCurrencyInfo)
          dispatch(AgetUserBalance(res.data.banlance))
          dispatch(AgetUserBalance_YUE(res.data.banlance[sysCurrencyInfo.currencyCode].ye || {}))
          dispatch(AgetUserBalance_FD(res.data.banlance[sysCurrencyInfo.currencyCode].fd || {}))
          dispatch(AgetUserBalance_FH(res.data.banlance[sysCurrencyInfo.currencyCode].fh || {}))
          dispatch(AgetUserBalance_HD(res.data.banlance[sysCurrencyInfo.currencyCode].hd || {}))
          dispatch(AgetUserBalance_HB(res.data.banlance[sysCurrencyInfo.currencyCode].hb || {}))
        })
      } else {
        dispatch(AgetUserBalance({}))
        dispatch(AgetUserBalance_YUE({}))
        dispatch(AgetUserBalance_FD({}))
        dispatch(AgetUserBalance_FH({}))
        dispatch(AgetUserBalance_HD({}))
        dispatch(AgetUserBalance_HB({}))
      }
      if (cb) {
        cb(res)
      }
    })
  }
}
