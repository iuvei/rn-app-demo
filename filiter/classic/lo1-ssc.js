import _ from 'lodash'
import { ArrayUtil } from './lot-util'

// const arrzxhz = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1]
// const arrzuxhz = [1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14, 14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1]
// const arrzxhzex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
// const arrkuadusx = [10, 54, 96, 126, 144, 150, 144, 126, 96, 54]
// const arrkuaduex = [10, 18, 16, 14, 12, 10, 8, 6, 4, 2]

let Zhixer = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 7,
  7: 8,
  8: 9,
  9: 10,
  10: 9,
  11: 8,
  12: 7,
  13: 6,
  14: 5,
  15: 4,
  16: 3,
  17: 2,
  18: 1
}

let Zhixsan = {
  0: 1,
  1: 3,
  2: 6,
  3: 10,
  4: 15,
  5: 21,
  6: 28,
  7: 36,
  8: 45,
  9: 55,
  10: 63,
  11: 69,
  12: 73,
  13: 75,
  14: 75,
  15: 73,
  16: 69,
  17: 63,
  18: 55,
  19: 45,
  20: 36,
  21: 28,
  22: 21,
  23: 15,
  24: 10,
  25: 6,
  26: 3,
  27: 1
}

let Zuxsan = [1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14, 14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1]

export default {
  /**
   * 输入框类型检测
   */
  inputCheck_Num (datasel, l, fun, sort) {
    fun = _.isFunction(fun) ? fun : function (n, l) {
      return true
    }
    let newsel = []
    // 新的号码
    if (sort) {
      // 如果需要号码排序
      let sortsel = []
      let reg = /,/g
      _.each(datasel, (n, i) => {
        sortsel.push(n.split('').sort().toString().replace(reg, ''))
      })
      datasel = sortsel
    }
    datasel = ArrayUtil.unique(datasel)
    // 去除重复
    let regex = new RegExp('^[0-9]{' + l + '}$')
    _.each(datasel, (n, i) => {
      if (regex.test(n) && fun(n, l)) {
        newsel.push(n)
      }
    })
    return newsel
  },
  /**
   * 和值检测
   */
  HHZXCheck_Num (n, l) {
    let a = []
    if (l === 2) {
      // 两位
      a = ['00', '11', '22', '33', '44', '55', '66', '77', '88', '99']
    } else {
      // 三位[默认]
      a = ['000', '111', '222', '333', '444', '555', '666', '777', '888', '999']
    }
    return _.indexOf(a, n) === -1
  },
  /**
   * 拖胆计算
   */
  TDCheckNum ({type, datasel, num}) {
    let cc = {
      1: 0,
      2: 1,
      3: 3,
      4: 6,
      5: 10,
      6: 15,
      7: 21,
      8: 28,
      9: 36
    }
    let tempNum = 0
    let multiple = 2
    let len0 = datasel[0].length
    let len1 = datasel[1].length
    if (!len0 || !len1) {
      return tempNum
    }
    switch (num) {
      case 3 :
        if (len0 === 1) {
          tempNum = multiple * len1
        } else {
          tempNum = 0
        }
        break
      case 6:
        if (len0 === 1) {
          tempNum = cc[len1]
        } else if (len0 === 2) {
          tempNum = len1
        } else {
          tempNum = 0
        }
        break
    }
    return tempNum
  },
  /**
   * 多少注计算
   */
  inputNumbers (type, datasel) {
    let nums = 0
    let tmpNums = 1
    let datalen = datasel[0].length
    let maxplace = 1
    switch (type) {
      case 'lo1_rx_r3z3':
        maxplace = 1
        if (datasel.length > 1) {
          let place = 0
          for (let i = 0; i < datasel[0].length; i++) {
            if (datasel[0][i] === '√') {
              place++
            }
          }
          let newsel = datasel[1]
          let m = 3
          // 任选3必须大于选了3位以上才能组成组合
          if (place >= m) {
            let h = ArrayUtil.ComNum(place, m)
            if (h > 0) {
              // 组合数必须大于0
              for (let i = 0; i < maxplace; i++) {
                let s = newsel.length
                // 组三必须选两位或者以上
                if (s > 1) {
                  nums += s * (s - 1)
                }
              }
              nums *= h
            }
          }
        }
        break
      case 'lo1_rx_r3z6':
        if (datasel.length > 1) {
          let place = 0
          for (let i = 0; i < datasel[0].length; i++) {
            if (datasel[0][i] === '√') {
              place++
            }
          }
          let newsel = datasel[1]
          let m = 3
          // 任选3必须大于选了3位以上才能组成组合
          if (place >= m) {
            let maxplace = 1
            let h = ArrayUtil.ComNum(place, m)
            if (h > 0) {
              // 组合数必须大于0
              for (let i = 0; i < maxplace; i++) {
                let s = newsel.length
                // 组六必须选三位或者以上
                if (s > 2) {
                  nums += s * (s - 1) * (s - 2) / 6
                }
              }
              nums *= h
            }
          }
        }
        break
      case 'lo1_rx_r2zx':
        if (datasel.length > 1) {
          let place = 0
          for (let i = 0; i < datasel[0].length; i++) {
            if (datasel[0][i] === '√') {
              place++
            }
          }
          let newsel = datasel[1]
          let m = 2
          if (place >= m) {
            // 任选2必须大于选了2位以上才能组成组合
            let maxplace = 1
            let h = ArrayUtil.ComNum(place, m)
            if (h > 0) {
              // 组合数必须大于0
              for (let i = 0; i < maxplace; i++) {
                let s = newsel.length
                // 二码不定位必须选两位或者以上
                if (s > 1) {
                  nums += s * (s - 1) / 2
                }
              }
              nums *= h
            }
          }
        }
        break
      case 'lo1_rx_r2ds':
      case 'lo1_rx_r3ds':
      case 'lo1_rx_r4ds':
        if (datasel.length > 1) {
          let place = 0
          for (let i = 0; i < datasel[0].length; i++) {
            if (datasel[0][i] === '√') {
              place++
            }
          }
          let newsel = []
          for (let i = 1; i < datasel.length; i++) {
            newsel.push(datasel[i])
          }
          let m = 0
          if (type === 'lo1_rx_r2ds') {
            m = 2
          }
          if (type === 'lo1_rx_r3ds') {
            m = 3
          }
          if (type === 'lo1_rx_r4ds') {
            m = 4
          }
          // 任选2必须大于选了2位以上才能组成组合
          if (place >= m) {
            let h = ArrayUtil.ComNum(place, m)
            if (h > 0) {
              // 组合数必须大于0
              nums += this.inputCheck_Num(newsel, m).length
              nums *= h
            }
          }
        }
        break
      case 'lo1_rx_r3hh':
        if (datasel.length > 1) {
          let place = 0
          for (let i = 0; i < datasel[0].length; i++) {
            if (datasel[0][i] === '√') {
              place++
            }
          }
          let newsel = []
          for (let i = 1; i < datasel.length; i++) {
            newsel.push(datasel[i])
          }
          let m = 3
          // 任选3必须大于选了3位以上才能组成组合
          if (place >= m) {
            let h = ArrayUtil.ComNum(place, m)
            if (h > 0) {
              // 组合数必须大于0
              nums = this.inputCheck_Num(newsel, 3, this.HHZXCheck_Num, true).length
              nums *= h
            }
          }
        }
        break
      case 'lo1_5x_ds':
        nums = this.inputCheck_Num(datasel, 5).length
        break
      case 'lo1_h4_ds':
      case 'lo1_q4_ds':
        nums = this.inputCheck_Num(datasel, 4).length
        break
      case 'lo1_h3_ds':
      case 'lo1_z3_ds':
      case 'lo1_q3_ds':
        nums = this.inputCheck_Num(datasel, 3).length
        break
      case 'lo1_h3_hh':
      case 'lo1_z3_hh':
      case 'lo1_q3_hh':
        nums = this.inputCheck_Num(datasel, 3, this.HHZXCheck_Num, true).length
        break
      case 'lo1_q3_z3td':
      case 'lo1_z3_z3td':
      case 'lo1_h3_z3td':
        nums = this.TDCheckNum({datasel, type, num: 3})
        break
      case 'lo1_q3_z6td':
      case 'lo1_z3_z6td':
      case 'lo1_h3_z6td':
        nums = this.TDCheckNum({datasel, type, num: 6})
        break
      case 'lo1_2x_h2ds':
      case 'lo1_2x_q2ds':
        nums = this.inputCheck_Num(datasel, 2).length
        break
      case 'lo1_2x_zuh2ds':
      case 'lo1_2x_zuq2ds':
        nums = this.inputCheck_Num(datasel, 2, this.HHZXCheck_Num, true).length
        break
      case 'lo1_5x_120':
        let s = datasel[0].length
        if (s > 4) {
          nums += ArrayUtil.ComNum(s, 5)
        }
        break
      case 'lo1_5x_60':
      case 'lo1_5x_30':
      case 'lo1_5x_20':
      case 'lo1_5x_10':
      case 'lo1_5x_5':
        let minchosen = []
        if (type === 'lo1_5x_60') {
          minchosen = [1, 3]
        }
        if (type === 'lo1_5x_30') {
          minchosen = [2, 1]
        }
        if (type === 'lo1_5x_20') {
          minchosen = [1, 2]
        }
        if (type === 'lo1_5x_10' || type === 'lo1_5x_5') {
          minchosen = [1, 1]
        }
        if (datasel[0].length >= minchosen[0] && datasel[1].length >= minchosen[1]) {
          let h = ArrayUtil.intersect(datasel[0], datasel[1]).length
          tmpNums = ArrayUtil.ComNum(datasel[0].length, minchosen[0]) * ArrayUtil.ComNum(datasel[1].length, minchosen[1])
          if (h > 0) {
            if (type === 'lo1_5x_60') {
              tmpNums -= ArrayUtil.ComNum(h, 1) * ArrayUtil.ComNum(datasel[1].length - 1, 2)
            }
            if (type === 'lo1_5x_30') {
              tmpNums -= ArrayUtil.ComNum(h, 2) * ArrayUtil.ComNum(2, 1)
              if (datasel[0].length - h > 0) {
                tmpNums -= ArrayUtil.ComNum(h, 1) * ArrayUtil.ComNum(datasel[0].length - h, 1)
              }
            }
            if (type === 'lo1_5x_20') {
              tmpNums -= ArrayUtil.ComNum(h, 1) * ArrayUtil.ComNum(datasel[1].length - 1, 1)
            }
            if (type === 'lo1_5x_10' || type === 'lo1_5x_5') {
              tmpNums -= ArrayUtil.ComNum(h, 1)
            }
          }
          nums += tmpNums
        }
        break
      case 'lo1_h4_24':
      case 'lo1_q4_24':
        if (datasel[0].length > 3) {
          nums += ArrayUtil.ComNum(datalen, 4)
        }
        break
      case 'lo1_h4_6':
      case 'lo1_q4_6':
        if (datasel[0].length >= 2) {
          nums += ArrayUtil.ComNum(datasel[0].length, 2)
        }
        break
      case 'lo1_h4_12':
      case 'lo1_q4_12':
      case 'lo1_h4_4':
      case 'lo1_q4_4':
        if (type === 'lo1_h4_12' || type === 'lo1_q4_12') {
          minchosen = [1, 2]
        }
        if (type === 'lo1_h4_4' || type === 'lo1_q4_4') {
          minchosen = [1, 1]
        }
        if (datasel[0].length >= minchosen[0] && datasel[1].length >= minchosen[1]) {
          let h = ArrayUtil.intersect(datasel[0], datasel[1]).length
          tmpNums = ArrayUtil.ComNum(datasel[0].length, minchosen[0]) * ArrayUtil.ComNum(datasel[1].length, minchosen[1])
          if (h > 0) {
            if (type === 'lo1_h4_12' || type === 'lo1_q4_12') {
              tmpNums -= ArrayUtil.ComNum(h, 1) * ArrayUtil.ComNum(datasel[1].length - 1, 1)
            }
            if (type === 'lo1_h4_4' || type === 'lo1_q4_4') {
              tmpNums -= ArrayUtil.ComNum(h, 1)
            }
          }
          nums += tmpNums
        }
        break
      case 'lo1_h3_3':
      case 'lo1_z3_3':
      case 'lo1_q3_3':
        for (let i = 0; i < maxplace; i++) {
          let s = datasel[i].length
          // 组三必须选两位或者以上
          if (s > 1) {
            nums += s * (s - 1)
          }
        }
        break
      case 'lo1_h3_6':
      case 'lo1_z3_6':
      case 'lo1_q3_6':
        maxplace = 1
        for (let i = 0; i < 1; i++) {
          let s = datasel[i].length
          // 组六必须选三位或者以上
          if (s > 2) {
            nums += s * (s - 1) * (s - 2) / 6
          }
        }
        break
      case 'lo1_5x_zh':
      case 'lo1_h4_zh':
      case 'lo1_q4_zh':
        maxplace = 0
        if (type === 'lo1_5x_zh') {
          maxplace = 5
        }
        if (type === 'lo1_h4_zh' || type === 'lo1_q4_zh') {
          maxplace = 4
        }
        for (let i = 0; i < maxplace; i++) {
          // 有位置上没有选择
          if (datasel[i].length === 0) {
            tmpNums = 0
            break
          }
          tmpNums *= datasel[i].length
        }
        nums += tmpNums * maxplace
        break
      case 'lo1_h3_hz':
      case 'lo1_z3_hz':
      case 'lo1_q3_hz':
      case 'lo1_2x_h2hz':
      case 'lo1_2x_q2hz':
        let cc = {
          0: 1,
          1: 3,
          2: 6,
          3: 10,
          4: 15,
          5: 21,
          6: 28,
          7: 36,
          8: 45,
          9: 55,
          10: 63,
          11: 69,
          12: 73,
          13: 75,
          14: 75,
          15: 73,
          16: 69,
          17: 63,
          18: 55,
          19: 45,
          20: 36,
          21: 28,
          22: 21,
          23: 15,
          24: 10,
          25: 6,
          26: 3,
          27: 1
        }
        if (type === 'lo1_2x_h2hz' || type === 'lo1_2x_q2hz') {
          cc = {
            0: 1,
            1: 2,
            2: 3,
            3: 4,
            4: 5,
            5: 6,
            6: 7,
            7: 8,
            8: 9,
            9: 10,
            10: 9,
            11: 8,
            12: 7,
            13: 6,
            14: 5,
            15: 4,
            16: 3,
            17: 2,
            18: 1
          }
        }
        for (let i = 0; i < datasel[0].length; i++) {
          nums += cc[parseInt(datasel[0][i], 10)]
        }
        break
      case 'lo1_rx_r2fs':
      case 'lo1_rx_r3fs':
      case 'lo1_rx_r4fs':
        let minplace = 0
        if (type === 'lo1_rx_r2fs') {
          minplace = 2
        }
        if (type === 'lo1_rx_r3fs') {
          minplace = 3
        }
        if (type === 'lo1_rx_r4fs') {
          minplace = 4
        }
        let newsel = []
        for (let i = 0; i < datasel.length; i++) {
          if (datasel[i].length !== 0) {
            newsel.push(datasel[i])
          }
        }
        // 最少位数
        if (newsel.length >= minplace) {
          let l = ArrayUtil.ComNum(newsel.length, minplace)
          for (let i = 0; i < l; i++) {
            tmpNums = 1
            let data = ArrayUtil.ComVal(newsel, minplace, i)
            for (let j = 0; j < data.length; j++) {
              tmpNums *= data[j].length
            }
            nums += tmpNums
          }
        }
        break
      case 'lo1_1x_1x':
        // 定位胆所有在一起特殊处理
        maxplace = 5
        for (let i = 0; i < maxplace; i++) {
          nums += datasel[i].length
        }
        break
      case 'lo1_bd_h32m':
      case 'lo1_bd_z32m':
      case 'lo1_bd_q32m':
      case 'lo1_2x_zuh2fs':
      case 'lo1_2x_zuq2fs':
        maxplace = 1
        for (let i = 0; i < maxplace; i++) {
          let s = datasel[i].length
          // 二码不定位必须选两位或者以上
          if (s > 1) {
            nums += s * (s - 1) / 2
          }
        }
        break
      case 'lo1_kd_q3kd':
      case 'lo1_kd_z3kd':
      case 'lo1_kd_h3kd':
      case 'lo1_kd_q2kd':
      case 'lo1_kd_h2kd':
        cc = {0: 10, 1: 54, 2: 96, 3: 126, 4: 144, 5: 150, 6: 144, 7: 126, 8: 96, 9: 54}
        if (type === 'lo1_kd_q2kd' || type === 'lo1_kd_h2kd') {
          cc = {0: 10, 1: 18, 2: 16, 3: 14, 4: 12, 5: 10, 6: 8, 7: 6, 8: 4, 9: 2}
        }
        for (let i = 0; i < datasel[0].length; i++) {
          nums += cc[parseInt(datasel[0][i], 10)]
        }
        break
      case 'lo1_bd_wx1m':
        nums = datasel[0].length
        break
      case 'lo1_bd_wx2m':
      case 'lo1_bd_2mjz':
        let bd2mjzlen = datasel[0].length
        let bd2mjz = {
          1: 0,
          2: 1,
          3: 3,
          4: 6,
          5: 10,
          6: 15,
          7: 21,
          8: 28,
          9: 36,
          10: 45
        }
        nums = bd2mjzlen ? bd2mjz[bd2mjzlen] : 0
        break
      case 'lo1_bd_wx3m':
      case 'lo1_bd_3mjz':
        let bd3mjz = {
          3: 1,
          4: 4,
          5: 10,
          6: 20,
          7: 35,
          8: 56,
          9: 84,
          10: 120
        }
        let bd3mjzlen = datasel[0].length
        nums = bd3mjzlen >= 3 ? bd3mjz[bd3mjzlen] : 0
        break
      case 'lo1_hz_zhixqs':
      case 'lo1_hz_zhixzs':
      case 'lo1_hz_zhixhs':
        for (let i = 0; i < datalen; i++) {
          nums += Zhixsan[Number(datasel[0][i])]
        }
        // nums = datalen ? Zhixsan[datalen - 1] : 0
        break
      case 'lo1_hz_zhixqe':
      case 'lo1_hz_zhixhe':
        for (let i = 0; i < datalen; i++) {
          nums += Zhixer[Number(datasel[0][i])]
        }
        // nums = datalen ? Zhixer[datalen - 1] : 0
        break
      case 'lo1_hz_zuxqs':
      case 'lo1_hz_zuxzs':
      case 'lo1_hz_zuxhs':
        for (let i = 0; i < datalen; i++) {
          nums += Zuxsan[Number(datasel[0][i]) - 1]
        }
        // nums = Zuxsan[datalen]
        break
      case 'lo1_hz_wsqs':
      case 'lo1_hz_wszs':
      case 'lo1_hz_wshs':
        nums = datalen
        break
      default:
        maxplace = 0
        switch (type) {
          case 'lo1_5x_fs':
            maxplace = 5
            break
          case 'lo1_h4_fs':
          case 'lo1_q4_fs':
            maxplace = 4
            break
          case 'lo1_h3_fs':
          case 'lo1_z3_fs':
          case 'lo1_q3_fs':
            maxplace = 3
            break
          case 'lo1_2x_h2fs':
          case 'lo1_2x_q2fs':
          case 'lo1_2x_h2dx':
          case 'lo1_2x_q2dx':
          case 'lo1_dxds_q2':
          case 'lo1_dxds_h2':
            maxplace = 2
            break
          case 'lo1_bd_h31m':
          case 'lo1_bd_z31m':
          case 'lo1_bd_q31m':
          case 'lo1_dxds_hz':
          case 'lo1_qw_yffs':
          case 'lo1_qw_hscs':
          case 'lo1_qw_sxbx':
          case 'lo1_qw_sjfc':
          case 'lo1_lh_wq':
          case 'lo1_lh_wb':
          case 'lo1_lh_ws':
          case 'lo1_lh_wg':
          case 'lo1_lh_qb':
          case 'lo1_lh_qs':
          case 'lo1_lh_qg':
          case 'lo1_lh_bs':
          case 'lo1_lh_bg':
          case 'lo1_lh_sg':
          case 'lo1_h_wq':
          case 'lo1_h_wb':
          case 'lo1_h_ws':
          case 'lo1_h_wg':
          case 'lo1_h_qb':
          case 'lo1_h_qs':
          case 'lo1_h_qg':
          case 'lo1_h_bs':
          case 'lo1_h_bg':
          case 'lo1_h_sg':
            maxplace = 1
            break
        }
        if (datasel.length === maxplace) {
          for (let i = 0; i < maxplace; i++) {
            // 有位置上没有选择
            if (datasel[i].length === 0) {
              tmpNums = 0
              break
            }
            tmpNums *= datasel[i].length
          }
          nums += tmpNums
        }
    }
    return nums
  },
  formatSelect_Num (datasel, m, n) {
    let newsel = []
    if (!m) {
      m = 0
    }
    if (!n) {
      n = 0
    }
    // for (let i = 0; i < m; i++) {
    //   newsel.push('-')
    // }
    let reg = /,/g
    for (let i = 0; i < datasel.length; i++) {
      let f = datasel[i].toString().replace(reg, ' ')
      if (f === ' ') {
        newsel.push('-')
      } else {
        newsel.push(f)
      }
    }
    // for (let i = 0; i < n; i++) {
    //   newsel.push('-')
    // }
    return newsel.toString()
  },
  formatTextarea_Num (type, datasel) {
    switch (type) {
      case 'lo1_5x_ds':
        datasel = this.inputCheck_Num(datasel, 5)
        break
      case 'lo1_h4_ds':
      case 'lo1_q4_ds':
        datasel = this.inputCheck_Num(datasel, 4)
        break
      case 'lo1_h3_ds':
      case 'lo1_z3_ds':
      case 'lo1_q3_ds':
        datasel = this.inputCheck_Num(datasel, 3)
        break
      case 'lo1_h3_hh':
      case 'lo1_z3_hh':
      case 'lo1_q3_hh':
        datasel = this.inputCheck_Num(datasel, 3, this.HHZXCheck_Num, true)
        break
      case 'lo1_2x_h2ds':
      case 'lo1_2x_q2ds':
        datasel = this.inputCheck_Num(datasel, 2)
        break
      case 'lo1_2x_zuh2ds':
      case 'lo1_2x_zuq2ds':
        datasel = this.inputCheck_Num(datasel, 2, this.HHZXCheck_Num, true)
        break
      case 'lo1_rx_r2ds':
      case 'lo1_rx_r3ds':
      case 'lo1_rx_r4ds':
        if (datasel.length > 1) {
          let place = 0
          for (let i = 0; i < datasel[0].length; i++) {
            if (datasel[0][i] === '√') {
              place++
            }
          }
          let newsel = []
          for (let i = 1; i < datasel.length; i++) {
            newsel.push(datasel[i])
          }
          let m = 0
          if (type === 'lo1_rx_r2ds') {
            m = 2
          }
          if (type === 'lo1_rx_r3ds') {
            m = 3
          }
          if (type === 'lo1_rx_r4ds') {
            m = 4
          }
          // 任选2必须大于选了2位以上才能组成组合
          if (place >= m) {
            let h = ArrayUtil.ComNum(place, m)
            if (h > 0) {
              // 组合数必须大于0
              return '[' + datasel[0] + ']' + this.inputCheck_Num(newsel, m)
            }
          }
        }
        break
      case 'lo1_rx_r3hh':
        if (datasel.length > 1) {
          let place = 0
          for (let i = 0; i < datasel[0].length; i++) {
            if (datasel[0][i] === '√') {
              place++
            }
          }
          let newsel = []
          for (let i = 1; i < datasel.length; i++) {
            newsel.push(datasel[i])
          }
          let m = 3
          // 任选3必须大于选了3位以上才能组成组合
          if (place >= m) {
            let h = ArrayUtil.ComNum(place, m)
            if (h > 0) {
              // 组合数必须大于0
              return '[' + datasel[0] + ']' + this.inputCheck_Num(newsel, 3, this.HHZXCheck_Num, true)
            }
          }
        }
        break
      default:
        break
    }
    return datasel.toString().replace(/,/g, ',')
  },
  inputFormat (type, datasel) {
    switch (type) {
      case 'lo1_5x_ds':
      case 'lo1_h4_ds':
      case 'lo1_q4_ds':
      case 'lo1_h3_ds':
      case 'lo1_z3_ds':
      case 'lo1_q3_ds':
      case 'lo1_h3_hh':
      case 'lo1_z3_hh':
      case 'lo1_q3_hh':
      case 'lo1_2x_h2ds':
      case 'lo1_2x_q2ds':
      case 'lo1_2x_zuh2ds':
      case 'lo1_2x_zuq2ds':
      case 'lo1_rx_r2ds':
      case 'lo1_rx_r3ds':
      case 'lo1_rx_r3hh':
      case 'lo1_rx_r4ds':
        return this.formatTextarea_Num(type, datasel)
      case 'lo1_rx_r3z3':
      case 'lo1_rx_r3z6':
      case 'lo1_rx_r2zx':
        let arr = []
        arr = arr.concat(datasel)
        let space = datasel[0]
        return '[' + space + ']' + ArrayUtil.remove(arr, 0).toString().replace(/,/g, '')
      // case 'lo1_h3_3':
      // case 'lo1_z3_3':
      // case 'lo1_q3_3':
      // case 'lo1_h3_6':
      // case 'lo1_z3_6':
      // case 'lo1_q3_6':
      case 'lo1_h3_hz':
      case 'lo1_z3_hz':
      case 'lo1_q3_hz':
      case 'lo1_2x_h2hz':
      case 'lo1_2x_q2hz':
        return datasel.toString()
      case 'lo1_dxds_q2':
      case 'lo1_dxds_h2':
        return datasel[0].toString().replace(/,/g, ' ') + ',' + datasel[1].toString().replace(/,/g, ' ')
      case 'lo1_lh_wq':
      case 'lo1_lh_wb':
      case 'lo1_lh_ws':
      case 'lo1_lh_wg':
      case 'lo1_lh_qb':
      case 'lo1_lh_qs':
      case 'lo1_lh_qg':
      case 'lo1_lh_bs':
      case 'lo1_lh_bg':
      case 'lo1_lh_sg':
      case 'lo1_h_wq':
      case 'lo1_h_wb':
      case 'lo1_h_ws':
      case 'lo1_h_wg':
      case 'lo1_h_qb':
      case 'lo1_h_qs':
      case 'lo1_h_qg':
      case 'lo1_h_bs':
      case 'lo1_h_bg':
      case 'lo1_h_sg':
      case 'lo1_bd_h31m':
      case 'lo1_bd_z31m':
      case 'lo1_bd_q31m':
      case 'lo1_bd_h32m':
      case 'lo1_bd_z32m':
      case 'lo1_bd_q32m':
      case 'lo1_bd_wx1m':
      case 'lo1_bd_wx2m':
      case 'lo1_bd_wx3m':
      case 'lo1_bd_2mjz':
      case 'lo1_bd_3mjz':
      case 'lo1_5x_120':
      case 'lo1_h4_24':
      case 'lo1_q4_24':
      case 'lo1_q4_6':
      case 'lo1_h4_6':
      case 'lo1_2x_zuh2fs':
      case 'lo1_2x_zuq2fs':
      case 'lo1_kd_z3kd':
      case 'lo1_kd_h3kd':
      case 'lo1_kd_q3kd':
      case 'lo1_kd_q2kd':
      case 'lo1_kd_h2kd':
      case 'lo1_dxds_hz':
      case 'lo1_qw_yffs':
      case 'lo1_qw_hscs':
      case 'lo1_qw_sxbx':
      case 'lo1_qw_sjfc':
        return datasel[0].toString().replace(/,/g, ' ')
      // case 'lo1_h4_fs':
      // case 'lo1_h4_zh':
      //   return this.formatSelect_Num(datasel, 1)
      // case 'lo1_q4_fs':
      // case 'lo1_q4_zh':
      //   return this.formatSelect_Num(datasel, 0, 1)
      // case 'lo1_h3_fs':
      //   return this.formatSelect_Num(datasel)
      // case 'lo1_z3_fs':
      // return this.formatSelect_Num(datasel, 1, 1)
      // case 'lo1_q3_fs':
      // return this.formatSelect_Num(datasel, 0, 2)
      // case 'lo1_2x_h2fs':
      //   return this.formatSelect_Num(datasel, 3)
      // case 'lo1_2x_q2fs':
      //   return this.formatSelect_Num(datasel, 0, 3)
      default:
        return this.formatSelect_Num(datasel)
    }
  },
  typeFormat (code) {
    let a = [code[0], code[1], code[2]]
    let b = [code[2], code[3], code[4]]
    let _a = a.uniquelize()
    let _b = b.uniquelize()
    let arr = []
    if (_a.length === 1) {
      arr[0] = '豹子'
    }
    if (_a.length === 2) {
      arr[0] = '组三'
    }
    if (_a.length === 3) {
      arr[0] = '组六'
    }
    if (_b.length === 1) {
      arr[1] = '豹子'
    }
    if (_b.length === 2) {
      arr[1] = '组三'
    }
    if (_b.length === 3) {
      arr[1] = '组六'
    }
    return arr
  }
}
