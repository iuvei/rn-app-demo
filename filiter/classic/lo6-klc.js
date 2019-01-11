import _ from 'lodash'
import {ArrayUtil} from './lot-util'

export default {
  /**
   * 多少注计算
   */
  inputNumbers (type, datasel) {
    let nums = 0
    let tmpNums = 1
    let l = 0
    // 选号
    switch (type) {
      case 'lo6_rx_rx1':
        l = datasel[0].length + (datasel[1]).length
        if (l >= 1 && l <= 8) {
          nums = ArrayUtil.ComNum(l, 1)
        }
        break
      case 'lo6_rx_rx2':
        l = datasel[0].length + (datasel[1]).length
        if (l >= 2 && l <= 8) {
          nums = ArrayUtil.ComNum(l, 2)
        }
        break
      case 'lo6_rx_rx3':
        l = datasel[0].length + (datasel[1]).length
        if (l >= 3 && l <= 8) {
          nums = ArrayUtil.ComNum(l, 3)
        }
        break
      case 'lo6_rx_rx4':
        l = datasel[0].length + (datasel[1]).length
        if (l >= 4 && l <= 8) {
          nums = ArrayUtil.ComNum(l, 4)
        }
        break
      case 'lo6_rx_rx5':
        l = datasel[0].length + (datasel[1]).length
        if (l >= 5 && l <= 8) {
          nums = ArrayUtil.ComNum(l, 5)
        }
        break
      case 'lo6_rx_rx6':
        l = datasel[0].length + (datasel[1]).length
        if (l >= 6 && l <= 8) {
          nums = ArrayUtil.ComNum(l, 6)
        }
        break
      case 'lo6_rx_rx7':
        l = datasel[0].length + (datasel[1]).length
        if (l >= 7 && l <= 8) {
          nums = ArrayUtil.ComNum(l, 7)
        }
        break
      default:
        let maxplace = 1
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
    return nums
  },
  inputFormat (type, datasel) {
    switch (type) {
      case 'lo6_rx_rx1':
      case 'lo6_rx_rx2':
      case 'lo6_rx_rx3':
      case 'lo6_rx_rx4':
      case 'lo6_rx_rx5':
      case 'lo6_rx_rx6':
      case 'lo6_rx_rx7':
        return datasel[0].concat(datasel[1]).toString()
      case 'lo6_qw_hzds':
      case 'lo6_qw_hzdx':
      case 'lo6_qw_jop':
      case 'lo6_qw_sxp':
      case 'lo6_qw_hzdxp':
      case 'lo6_5x_5x':
        return datasel[0]
      default:
        break
    }
  },
  typeFormat (code) {
    let arr = []
    let [j, o, h] = [0, 0, 0]
    _.each(code, (val, idx) => {
      let num = parseInt(val)
      h += num
      if (num % 2 === 0) {
        o++
      } else {
        j++
      }
    })
    if (j > o) {
      arr[0] = '奇'
    }
    if (j < o) {
      arr[0] = '偶'
    }
    if (j === o) {
      arr[0] = '和'
    }
    let hdx = ''
    if (h >= 210 && h <= 809) {
      hdx += '小'
    }
    if (h === 810) {
      hdx += '和'
    }
    if (h >= 811 && h <= 1410) {
      hdx += '大'
    }
    if (h % 2 === 0) {
      hdx += '双'
    } else {
      hdx += '单'
    }
    arr[1] = hdx
    return arr
  }
}
