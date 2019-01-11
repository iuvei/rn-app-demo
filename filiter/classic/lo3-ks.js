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
    let newsel = [] // 新的号码
    datasel = ArrayUtil.unique(datasel) // 去除重复
    let regex = new RegExp('^[0-6]{' + l + '}$')
    _.each(datasel, (n, i) => {
      console.log('isOk', fun(n, l))
      if (regex.test(n) && fun(n, l)) {
        newsel.push(n)
      }
    })
    console.log('inputCheck_Num result', newsel)
    return newsel
  },
  /**
   * 2排不重复检测
   */
  uniqueCheck (a, b) {
    return ArrayUtil.intersect(a, b).length === 0
  },
  /**
   * 二同号单式
   */
  ethdsCheck (n, l) {
    if (l !== 3) return false
    let first = n.substring(0, 1)
    let second = n.substring(1, 2)
    let third = n.substring(2, 3)
    if (first === second && second === third) return false
    if (first === second || second === third || third === first) return true
    return false
  },
  /**
   * 二不同号单式
   */
  ebthdsCheck (n, l) {
    if (l !== 2) return false
    let first = n.substring(0, 1)
    let second = n.substring(1, 2)
    if (first === second) return false
    return true
  },
  /**
   * 三不同号单式
   */
  sbthdsCheck (n, l) {
    if (l !== 3) {
      return false
    }
    let first = n.substring(0, 1)
    let second = n.substring(1, 2)
    let third = n.substring(2, 3)
    return first !== second && second !== third && third !== first
  },
  /**
   * 快三计算号码
   */
  inputNumbers (type, datasel) {
    let nums = 0
    // 输入号
    switch (type) {
      case 'lo3_2b_sd':
        return this.inputCheck_Num(datasel, 2, this.ebthdsCheck).length
      case 'lo3_2t_sd':
        return this.inputCheck_Num(datasel, 3, this.ethdsCheck).length
      case 'lo3_3b_sd':
        return this.inputCheck_Num(datasel, 3, this.sbthdsCheck).length
      // 选号
      case 'lo3_2b_bz': // 二不同号，标准选号
        if (datasel[0].length >= 2) {
          nums += ArrayUtil.ComNum(datasel[0].length, 2)
        }
        break
      case 'lo3_2b_dt':
        let maxplace = 2
        if (datasel.length === maxplace) {
          if (this.uniqueCheck(datasel[0], datasel[1])) {
            for (let i = 0; i < maxplace; i++) {
              let s = datasel[i].length
              if (s > 0) {
                if (i > 0) {
                  nums = datasel[i].length
                }
              } else {
                nums = 0
                break
              }
            }
          }
        }
        break
      case 'lo3_2t_bz':
        let s = datasel.length
        if (s > 1) {
          let v = datasel[0].map(item => item % 10)
          let a = v.length
          let w = datasel[1].map(item => item % 10)
          let b = w.length
          if (a > 0 && b > 0) {
            if (this.uniqueCheck(v, w)) {
              nums = a * b
            }
          }
        }
        break
      case 'lo3_2t_fx':
        nums = datasel[0].length
        break
      case 'lo3_3b_bz': // 三不同号单选
        if (datasel[0].length >= 3) {
          nums += ArrayUtil.ComNum(datasel[0].length, 3)
        }
        break
      case 'lo3_3t_dx': // 三同号单选
      case 'lo3_hz_hz': // 和值
      case 'lo3_3l_dx':
        nums = datasel[0].length
        break
      case 'lo3_3b_dt':
        let len0 = datasel[0].length
        let len1 = datasel[1].length
        if (!len0 || !len1) {
          return 0
        }
        let len1Arr = [0, 0, 1, 3, 6, 10]
        if (len0 === 1) {
          nums = len1Arr[len1]
        } else if (len0 === 2) {
          return len1
        } else {
          return 0
        }
        break
      case 'lo3_3t_tx': // 三同号通选
      case 'lo3_3l_tx': // 三连号通选
        nums = datasel[0].length > 0 ? 1 : 0
        break
      default:
        break
    }
    return nums
  },
  formatSelect_Num (datasel, m, n) {
    let newsel = []
    if (!m) m = 0
    if (!n) n = 0
    // for (let i = 0; i < m; i++) {
    //   newsel.push('-')
    // }
    for (let i = 0; i < datasel.length; i++) {
      let f = datasel[i].toString().replace(/,/g, ' ')
      if (f === '') {
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
      case 'lo3_2b_sd':
        datasel = this.inputCheck_Num(datasel, 2, this.ebthdsCheck)
        break
      case 'lo3_2t_sd':
        datasel = this.inputCheck_Num(datasel, 3, this.ethdsCheck)
        break
      case 'lo3_3b_sd':
        datasel = this.inputCheck_Num(datasel, 3, this.sbthdsCheck)
        break
      default:
        break
    }
    console.log('formatTextarea_Num result: ', datasel)
    return datasel.toString().replace(/,/g, ' ')
  },
  inputFormat (type, datasel) {
    switch (type) {
      case 'lo3_2b_sd':
      case 'lo3_2t_sd':
      case 'lo3_3b_sd':
        return this.formatTextarea_Num(type, datasel)
      case 'lo3_2b_bz':
      case 'lo3_2t_fx':
      case 'lo3_3b_bz':
      case 'lo3_3t_dx':
      case 'lo3_3t_tx':
      case 'lo3_3l_tx':
      case 'lo3_hz_hz':
      case 'lo3_3l_dx':
        return datasel[0].toString().replace(/,/g, ' ')
      case 'lo3_2b_dt':
      case 'lo3_2t_bz':
      case 'lo3_3b_dt':
        return this.formatSelect_Num(datasel)
      default:
        break
    }
  },
  typeFormat (code) {
    let arr = []
    code.sort()
    let a = code[0]
    let b = code[1]
    let c = code[2]
    let sanlian = ['123', '234', '345', '456']
    if (_.inArray(code.toString().replace(/,/g, ''), sanlian) !== -1) {
      arr[0] = '三连号'
    } else if (a === b && b === c) {
      arr[0] = '三同号'
    } else if (a === b || b === c) {
      arr[0] = '二同号'
    } else {
      arr[0] = '三不同'
    }
    arr[1] = parseInt(a) + parseInt(b) + parseInt(c)
    return arr
  }
}
