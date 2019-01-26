import { handleActions } from 'redux-actions'
const {prependUrl} = require('./../api.config')

const lotteries = [
  {
    categoryName: '时时彩',
    index: 1,
    realCategory: 'ssc',
    originLot: [],
    gpLot: [],
    childIdx: [{lotterCode: 'cqssc', idx: 1}]
  },
  {
    categoryName: '11选5',
    index: 2,
    realCategory: 'syx5',
    originLot: [],
    gpLot: [],
    childIdx: [{lotterCode: 'jzdsyxw', idx: 1}, {lotterCode: 'gdsyxw', idx: 1}]
  },
  {categoryName: 'PK拾', index: 3, realCategory: 'pk10', originLot: [], gpLot: []},
  {categoryName: '快三', index: 4, realCategory: 'k3', originLot: [], gpLot: []},
  {categoryName: '基诺', index: 5, realCategory: 'kl8', originLot: [], gpLot: []},
  {categoryName: '幸运彩', index: 6, realCategory: 'xyc', originLot: [], gpLot: []},
  {categoryName: '快乐十分', index: 7, realCategory: 'kl10', originLot: [], gpLot: []},
  {categoryName: '低频彩', index: 8, realCategory: 'dpc', originLot: [], gpLot: []}
]
const sortArray = arr => {
  if (arr.length === 0) {
    return arr
  }
  const rest = arr.sort((a, b) => {
    return a.index - b.index
  })
  return rest
}

const initialState = {
  isLogin: false,
  showFloatBall: true,
  currentApiUrl: prependUrl,
  count: 1,
  sysSortLottery: [],
  syswpSortLottery: [],
  usualLottery: [],
  userId: '',
  sysActivities: [], // 活动信息列表
  systemNews: [],  // 系统公告
  loginInfo: {},  // 用户信息
  rebateInfo: {}, // 用户返点返水信息
  balanceInfo: {}, // 用户账户余额信息
  sysBankList: [], // 系统银行卡列表
  userSecurityLevel: {}, // 账户安全等级
  userSecurityConfig: {}, // 解绑资金密码，GA密码，银行卡姓名开关
  userPlatformInfo: [],
  serviceUrl: {}, //  客服地址
  audioSwitch: true, // 声音开关
  soundType: {type: ''}, // 声音类型
  revokeInfo: {
    time: 0,
    orderId: ''
  }, // 保存撤单时间和撤单订单号
  recharge: {}, // 充值渠道对象
}

// 常规处理
const common = handleActions({
  SET_LOGIN_STATUS: (state, {payload}) => {
    return {
      ...state,
      isLogin: payload
    }
  },
  SET_LOGIN_INFO: (state, {payload}) => {
    return {
      ...state,
      loginInfo: payload,
      userId: payload.userId
    }
  },
  SET_AUDIO_SWITCH: (state, {payload}) => {
    return {
      ...state,
      audioSwitch: payload
    }
  },
  SET_SOUND_TYPE: (state, {payload}) => {
    return {
      ...state,
      soundType: payload
    }
  },
  SET_RECHARGE: (state, {payload = {}}) => {
    return {
      ...state,
      recharge: payload
    }
  },
  SET_CUSTOMIZE_LOTTERY: (state, {payload}) => {
    var ll = JSON.parse(JSON.stringify(lotteries))
    var wpll = JSON.parse(JSON.stringify(lotteries))
    payload.filter(d => {
      if (d.isOuter) {
        d.lotterList.filter(i => {
          if (i.status !== 2) {
            wpll.filter(v => {
              let idxItem = ''
              if (v.childIdx && v.childIdx.length > 0) {
                idxItem = v.childIdx.find(item => {
                  return item.lotterCode === i.lotterCode
                })
              }
              i.index = idxItem ? idxItem.idx : 100
              if (v.realCategory === i.realCategory) {
                if (d.categoryCode.indexOf('gp') > -1) {
                  v.gpLot.push(i)
                } else {
                  v.originLot.push(i)
                }
              }
              v.gpLot = sortArray(v.gpLot)
              v.originLot = sortArray(v.originLot)
            })
          }
        })
      } else {
        d.lotterList.filter(i => {
          if (i.status !== 2) {
            ll.filter(v => {
              let idxItem = ''
              if (v.childIdx && v.childIdx.length > 0) {
                idxItem = v.childIdx.find(item => {
                  return item.lotterCode === i.lotterCode
                })
              }
              i.index = idxItem ? idxItem.idx : 100
              if (v.realCategory === i.realCategory) {
                if (d.categoryCode.indexOf('gp') > -1) {
                  v.gpLot.push(i)
                } else {
                  v.originLot.push(i)
                }
              }
              v.gpLot = sortArray(v.gpLot)
              v.originLot = sortArray(v.originLot)
            })
          }
        })
      }
    })
    return {
      ...state,
      sysSortLottery: sortArray(ll),
      syswpSortLottery: sortArray(wpll)
    }
  },
  SET_ACTIVE_USUAL_LOT: (state, {payload}) => {
    return {
      ...state,
      usualLottery: payload
    }
  },
  GET_SYSTEM_NEWS: (state, {payload}) => {
    return {
      ...state,
      systemNews: payload
    }
  },
  QUERY_ACTIVITY: (state, {payload}) => {
    return {
      ...state,
      sysActivities: payload
    }
  },
  SET_USER_REBATE: (state, {payload}) => {
    return {
      ...state,
      rebateInfo: payload
    }
  },
  SET_USER_BALANCE: (state, {payload}) => {
    return {
      ...state,
      balanceInfo: payload
    }
  },
  SET_SYS_BANKLIST: (state, {payload}) => {
    return {
      ...state,
      sysBankList: payload
    }
  },
  SET_USER_SECURELEVEL: (state, {payload}) => {
    return {
      ...state,
      userSecurityLevel: payload
    }
  },
  SET_USER_SECURECONFIG: (state, {payload}) => {
    return {
      ...state,
      userSecurityConfig: payload
    }
  },
  SET_USER_PLATFORM: (state, {payload}) => {
    return {
      ...state,
      userPlatformInfo: payload
    }
  },
  SET_SERVICE_URL: (state, {payload}) => {
    return {
      ...state,
      serviceUrl: payload
    }
  },
  SET_FLOAT_BALL_STATUS: (state, {payload}) => {
    return {
      ...state,
      showFloatBall: payload
    }
  },
  SET_CURRENT_API_URL: (state, {payload}) => {
    return {
      ...state,
      currentApiUrl: payload
    }
  },
  SET_REVOKE_INFO: (state, {payload}) => {
    return {
      ...state,
      revokeInfo: payload
    }
  }
}, initialState)

export default common
