import { getSysLottery } from "../api/lottery";
import {
  getAllAdversize,
  getActivities,
  getBankList,
  getUserSecurityLevel,
  getUserSecurityConfig,
  getUserPlatformInfo,
  coustomerService
} from "../api/basic";
import { createAction } from "redux-actions";
import { AsyncStorage } from "react-native";
import { list } from "../data/activity";
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
      let d =  old ? JSON.parse(old) : usual
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

export const queryActivity = createAction(
  'QUERY_ACTIVITY',
  async () => {
    let res = await getActivities()
    let volist = res.data.volist || []
    let arr = []
    for (let i = 0; i < volist.length; i++) {
      if (list[volist[i].activityCode]) {
        arr.push(Object.assign({}, volist[i], list[volist[i].activityCode]))
      } else {
        arr.push(volist[i])
      }
    }
    return arr
  }
)

export const setUserRebate = (data) => {
  return {
    type: 'SET_USER_REBATE',
    payload: data
  }
}

export const setUserBalance = (data) => {
  return {
    type: 'SET_USER_BALANCE',
    payload: data
  }
}

export const AsetSysBanklist = createAction(
  'SET_SYS_BANKLIST',
  async () => {
    let res = await getBankList()
    return res.code === 0 ? res.data.bankList : []
})

export const AsetUserSecureLevel = createAction(
  'SET_USER_SECURELEVEL',
  async () => {
    let res = await getUserSecurityLevel()
    return res.code === 0 ? res.data.userSecurityLevel : {}
})

export const AsetUserSecureConfig = createAction(
  'SET_USER_SECURECONFIG',
  async () => {
    let res = await getUserSecurityConfig()
    return res.code === 0 ? res.data : {gaSwitch: false, bankNamePwdSwitch: false}
})

export const AsetUserPlatfrom = createAction(
  'SET_USER_PLATFORM',
  async () => {
    let res = await getUserPlatformInfo()
    return res.code === 0 ? res.data.partnerInfo : []
  }
)

export const AsetServiceUrl = createAction(
  'SET_SERVICE_URL',
  async () => {
    let res = await coustomerService()
    return res.code === 0 ? res.data : {}
  }
)

export const setShowFloatBall = (status) => {
  return {
    type: 'SET_FLOAT_BALL_STATUS',
    payload: status
  }
}

export const setCurrentApiUrl = (url) => {
  return {
    type: 'SET_CURRENT_API_URL',
    payload: url
  }
}
