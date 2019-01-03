import { createAction } from "redux-actions"
import { getUserBalance, getUserBankcards } from '../api/basic'
import { AsyncStorage } from 'react-native'

export const AsetUserBankCards = (userId) => {
  return createAction(
    'SET_USER_BANKCARDS',
    () => new Promise((resolve, reject) => {
      getUserBankcards({userId}).then(res => {
        if (res.code === 0) {
          resolve(res.data)
        } else {
          resolve({
            userBankCards: [],
            bankTime: 6
          })
        }
      })
    })
  )
}

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

export const AsetAllBalance = (userId) => {
  return (dispatch, getState) => {
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
        // commit('SET_CURRENCY_INFO', {})
        dispatch(AgetUserBalance({}))
        dispatch(AgetUserBalance_YUE({}))
        dispatch(AgetUserBalance_FD({}))
        dispatch(AgetUserBalance_FH({}))
        dispatch(AgetUserBalance_HD({}))
        dispatch(AgetUserBalance_HB({}))
      }
    })
  }
}
