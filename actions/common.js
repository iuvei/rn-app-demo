import { getSysLottery } from "../api/lottery";
import { getAllAdversize }from "../api/basic";
import { createAction } from "redux-actions";
import { AsyncStorage } from "react-native";
const usual = [
  {
    isOuter: 0,
    lotterCode: 'cqssc',
    lotterName: '重庆时时彩',
    realCategory: 'ssc',
    status: 0
  }, {
    isOuter: 0,
    lotterCode: 'sdsyxw',
    lotterName: '山东11选5',
    realCategory: 'syx5',
    status: 0
  }, {
    isOuter: 0,
    lotterCode: 'bjpks',
    lotterName: '北京PK拾',
    realCategory: 'pk10',
    status: 0
  }, {
    isOuter: 0,
    lotterCode: 'bjklb',
    lotterName: '北京快乐8',
    realCategory: 'kl8',
    status: 0
  }, {
    isOuter: 0,
    lotterCode: 'xdlks',
    lotterName: '新德里快3',
    realCategory: 'k3',
    status: 0
  }, {
    isOuter: 0,
    lotterCode: 'jzdklb',
    lotterName: '济州岛快乐8',
    realCategory: 'kl8',
    status: 0
  }
]

export const setLoginStatus = (status) => {
  return {
    type: 'SET_LOGIN_STATUS',
    payload: status
  }
}

export const setLoginInfo = (data) => {
  return {
    type: 'SET_LOGIN_INFO',
    payload: data
  }
}

export const setActiveAccount = (data) => {
  return {
    type: 'SET_ACTIVE_ACCOUNT',
    payload: data
  }
}

export const setActiveUsualLot = createAction(
  'SET_ACTIVE_USUAL_LOT',
  async (data) => {
    let old = await AsyncStorage.getItem('usualLottery')
    if (data.custom) { //custom 1 无需过滤
      AsyncStorage.setItem('usualLottery', JSON.stringify(data.data))
      return data.data
    } else {
      let d = JSON.parse(old) || usual
      let rst = await getSysLottery()
      let newD = []
      rst.data.forEach(list => {
        list.lotterList.forEach(v => {
          d.forEach(c => {
            if (c.isOuter === v.isOuter && c.lotterCode === v.lotterCode && v.status !== 2) {
              newD.push(v)
            }
          })
        })
      })
      AsyncStorage.setItem('usualLottery', JSON.stringify(newD))
      return newD
    }
  }
)

export const setCustomizeLottery = createAction(
  'SET_CUSTOMIZE_LOTTERY',
  async (data) => {
    let res = await getSysLottery(data)
    return res.code === 0 ? res.data : []
  }
)

export const getSystemNews = createAction(
  'GET_SYSTEM_NEWS',
  async () => {
    let res = await getAllAdversize()
    return res.code === 0 ? res.data.pageColumns : []
  }
)

export const setUserRebate = (data) => {
  return {
    type: 'SET_USER_REBATE',
    payload: data
  }
}
