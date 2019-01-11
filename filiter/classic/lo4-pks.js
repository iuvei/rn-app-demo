import _ from 'lodash'
import {ArrayUtil} from './lot-util'

export default {
  /**
   * 输入框类型检测
   */
  inputCheck_Num (datasel, l, fun) {
    fun = _.isFunction(fun) ? fun : (n, l) => {
      return true
    }
    let newsel = []
    // 新的号码
    datasel = ArrayUtil.unique(datasel)
    // 去除重复
    let regex = new RegExp('^([0-9]{2}\\s{1}){' + (l - 1) + '}[0-9]{2}$')
    _.each(datasel, (n, i) => {
      if (regex.test(n) && fun(n, l)) {
        newsel.push(n)
      }
    })
    return newsel
  },
  numberCheck_Num (n) {
    let t = n.split(' ')
    let l = t.length
    for (let i = 0; i < l; i++) {
      if (Number(t[i]) > 10 || Number(t[i]) < 1) {
        return false
      }
      for (let j = i + 1; j < l; j++) {
        if (Number(t[i]) === Number(t[j])) {
          return false
        }
      }
    }
    return true
  },
  inputNumbers (type, datasel) {
    let nums = 0
    let tmpNums = 1
    let maxplace = 0
    // 输入号
    switch (type) {
      case 'lo4_q2_ds':
        return this.inputCheck_Num(datasel, 2, this.numberCheck_Num).length
      case 'lo4_q3_ds':
        return this.inputCheck_Num(datasel, 3, this.numberCheck_Num).length
      // 选号
      case 'lo4_q3_fs':
        if (datasel[0].length > 0 && datasel[1].length > 0 && datasel[2].length > 0) {
          for (let i = 0; i < datasel[0].length; i++) {
            for (let j = 0; j < datasel[1].length; j++) {
              for (let k = 0; k < datasel[2].length; k++) {
                if (datasel[0][i] !== datasel[1][j] && datasel[0][i] !== datasel[2][k] && datasel[1][j] !== datasel[2][k]) {
                  nums++
                }
              }
            }
          }
        }
        break
      case 'lo4_q2_fs':
        if (datasel[0].length > 0 && datasel[1].length > 0) {
          for (let i = 0; i < datasel[0].length; i++) {
            for (let j = 0; j < datasel[1].length; j++) {
              if (datasel[0][i] !== datasel[1][j]) {
                nums++
              }
            }
          }
        }
        break
      case 'lo4_1x':
        maxplace = 3
        for (let i = 0; i < maxplace; i++) {
          nums += datasel[i].length
        }
        break
      // case 'lo4_1x_q5':
      // case 'lo4_1x_h5':
      case 'lo4_1x_dwd':
        // maxplace = 5
        maxplace = 10
        for (let i = 0; i < maxplace; i++) {
          nums += datasel[i].length
        }
        break
      default:
        maxplace = 1
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
  formatSelect_Num (datasel, m, n) {
    let newsel = []
    if (!m) {
      m = 0
    }
    if (!n) {
      n = 0
    }
    for (let i = 0; i < m; i++) {
      newsel.push('-')
    }
    for (let i = 0; i < datasel.length; i++) {
      let f = datasel[i].toString().replace(/,/g, ' ')
      // if (f === '') {
      //   newsel.push(',')
      // } else {
      //   newsel.push(f)
      // }
      newsel.push(f)
    }
    // for (let i = 0; i < n; i++) {
    //   newsel.push('')
    // }
    return newsel.toString()
  },
  formatTextarea_Num (type, datasel) {
    switch (type) {
      case 'lo4_q2_ds':
        datasel = this.inputCheck_Num(datasel, 2, this.numberCheck_Num)
        break
      case 'lo4_q3_ds':
        datasel = this.inputCheck_Num(datasel, 3, this.numberCheck_Num)
        break
      default:
        break
    }
    return datasel.toString().replace(/,/g, ',')
  },
  inputFormat (type, datasel) {
    switch (type) {
      case 'lo4_q1_q1':
        return datasel[0].toString().replace(/,/g, ' ')
      case 'lo4_q2_fs':
        return datasel[0].toString().replace(/,/g, ' ') + ',' + datasel[1].toString().replace(/,/g, ' ')
      case 'lo4_q3_fs':
        return datasel[0].toString().replace(/,/g, ' ') + ',' + datasel[1].toString().replace(/,/g, ' ') + ',' + datasel[2].toString().replace(/,/g, ' ')
      // case 'lo4_1x_q5':
      case 'lo4_1x_dwd':
        return this.formatSelect_Num(datasel)
      case 'lo4_q2_ds':
      case 'lo4_q3_ds':
        let data = this.formatTextarea_Num(type, datasel)
        return data.replace(/ /g, '').replace(/,/g, ' ')
      case 'lo4_dx_1':
      case 'lo4_dx_2':
      case 'lo4_dx_3':
      case 'lo4_ds_1':
      case 'lo4_ds_2':
      case 'lo4_ds_3':
      case 'lo4_lh_1':
      case 'lo4_lh_2':
      case 'lo4_lh_3':
      case 'lo4_gyh_dx':
      case 'lo4_gyh_ds':
        return datasel[0].toString()
      case 'lo4_gyh_hz':
        return datasel[0].toString().replace(/,/g, ' ')
      default:
        break
    }
  }
}
