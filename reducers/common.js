import { handleActions } from 'redux-actions'
import { AsyncStorage } from 'react-native'

var lotteries = [
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
const usaltmp = [
  {
    isOuter: 0,
    lotterCode: 'cqssc',
    lotterName: '重庆时时彩',
    realCategory: 'ssc',
    status: 0
  }, {
    isOuter: 0,
    lotterCode: 'gftxffc',
    lotterName: '腾讯分分彩',
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
const sortArray = arr => {
  if (arr.length === 0) {
    return arr
  }
  const rest = arr.sort((a, b) => {
    return a.index - b.index
  })
  return rest
}
const setSysLot = async data => {
  let l = []
  let wpl = []
  let usal = []
  let jarr = []
  let usa = await AsyncStorage.getItem('usualLotLocal') || []
  for (var g = 0; g < jarr.length; g++) {
    jarr[g].status = 1
  }

  data.filter(d => {
    if (d.isOuter) {
      d.lotterList.filter(i => {
        d.usableList = d.usableList || []
        if (i.status !== 2) {
          d.usableList.push(i)
        }
      })
      if (d.usableList.length) {
        wpl.push(d)
      }
    } else {
      d.lotterList.forEach(i => {
        d.usableList = d.usableList || []
        if (i.status !== 2) {
          d.usableList.push(i)
          for (let h = 0; h < usaltmp.length; h++) {
            if (i.lotterCode === usaltmp[h].lotterCode && i.status === 0) {
              usal.push(i)
            }
          }
          for (var j = 0; j < jarr.length; j++) {
            if (i.lotterCode === jarr[j].lotterCode) {
              jarr[j].status = i.status
            }
          }
        }
      })
      usa = usal.concat(jarr)
      if (d.usableList.length) {
        l.push(d)
      }
    }
  })
  return {l, wpl, usa}
}

const initialState = {
  isLogin: false,
  count: 1,
  sysLottery: {},
  syswpLottery: {},
  sysSortLottery: [],
  syswpSortLottery: [],
  usualLottery: [],
  loginInfo: {}
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
      loginInfo: payload
    }
  },
  SET_CUSTOMIZE_LOTTERY: (state, {payload}) => {
    var ll = JSON.parse(JSON.stringify(lotteries))
    var wpll = JSON.parse(JSON.stringify(lotteries))
    var data = JSON.parse(JSON.stringify(payload))
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
    let {l, wpl, usa} = setSysLot(data)
    return {
      ...state,
      sysLottery: l,
      syswpLottery: wpl,
      usualLottery: usa,
      sysSortLottery: sortArray(ll),
      syswpSortLottery: sortArray(wpll)
    }
  }
}, initialState)

export default common
