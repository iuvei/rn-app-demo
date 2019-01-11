import _ from 'lodash'
import {ArrayUtil} from './lot-util'

const qsdt = {
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
    let regex = new RegExp('^([0-9]{2}\\s{1}){' + (l - 1) + '}[0-9]{2}$')
    _.each(datasel, (n, i) => {
      if (regex.test(n) && fun(n, l)) {
        newsel.push(n)
      }
    })
    return newsel
  },
  /**
   * 输入框号码检测
   */
  numberCheck_Num (n) {
    let t = n.split(' ')
    let l = t.length
    for (let i = 0; i < l; i++) {
      if (Number(t[i]) > 11 || Number(t[i]) < 1) {
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
  TDCheckNum ({datasel, num}) {
    let len0 = datasel[0].length
    let len1 = datasel[1].length
    if (!len0 || !len1) return 0
    if (num === 3) {
      if (len0 === 1) {
        return qsdt[len1]
      } else if (len0 === 2) {
        return len1
      } else {
        return 0
      }
    } else if (num === 2) {
      return len0 === 1 ? len1 : 0
    }
  },
  /**
   * 多少注计算
   */
  inputNumbers (type, datasel) {
    let nums = 0
    let maxplace = 0
    let len0 = datasel[0] ? datasel[0].length : 0
    let len1 = datasel[1] ? datasel[1].length : 0
    switch (type) {
      // 这里验证输入框类型
      case 'lo2_3x_q3ds':
      case 'lo2_3x_z3ds':
      case 'lo2_3x_h3ds':
      case 'lo2_3x_zuq3ds':
      case 'lo2_3x_zuz3ds':
      case 'lo2_3x_zuh3ds':
        return this.inputCheck_Num(datasel, 3, this.numberCheck_Num).length
      case 'lo2_2x_q2ds':
      case 'lo2_2x_h2ds':
      case 'lo2_2x_zuq2ds':
        return this.inputCheck_Num(datasel, 2, this.numberCheck_Num).length
      case 'lo2_rx_ds1z1':
        return this.inputCheck_Num(datasel, 1, this.numberCheck_Num).length
      case 'lo2_rx_ds2z2':
        return this.inputCheck_Num(datasel, 2, this.numberCheck_Num).length
      case 'lo2_rx_ds3z3':
        return this.inputCheck_Num(datasel, 3, this.numberCheck_Num).length
      case 'lo2_rx_ds4z4':
        return this.inputCheck_Num(datasel, 4, this.numberCheck_Num).length
      case 'lo2_rx_ds5z5':
        return this.inputCheck_Num(datasel, 5, this.numberCheck_Num).length
      case 'lo2_rx_ds6z5':
        return this.inputCheck_Num(datasel, 6, this.numberCheck_Num).length
      case 'lo2_rx_ds7z5':
        return this.inputCheck_Num(datasel, 7, this.numberCheck_Num).length
      case 'lo2_rx_ds8z5':
        return this.inputCheck_Num(datasel, 8, this.numberCheck_Num).length
      case 'lo2_3x_zuq3dt':
      case 'lo2_3x_zuz3dt':
      case 'lo2_3x_zuh3dt':
        return this.TDCheckNum({datasel, num: 3})
      case 'lo2_2x_zuq2dt':
      case 'lo2_2x_zuh2dt':
        return this.TDCheckNum({datasel, num: 2})
      // 这里验证选号类型
      case 'lo2_3x_q3fs':
      case 'lo2_3x_z3fs':
      case 'lo2_3x_h3fs':
        if (datasel[0].length > 0 && datasel[1].length > 0 && datasel[2].length > 0) {
          datasel[0].filter((i) => {
            datasel[1].filter((j) => {
              datasel[2].filter((k) => {
                if (Number(i) !== Number(j) && Number(i) !== Number(k) && Number(j) !== Number(k)) {
                  nums++
                }
              })
            })
          })
        }
        break
      case 'lo2_3x_zuq3fs':
      case 'lo2_3x_zuz3fs':
      case 'lo2_3x_zuh3fs':
        maxplace = 1
        for (let i = 0; i < maxplace; i++) {
          let s = datasel[i].length
          if (s > 2) {
            nums += s * (s - 1) * (s - 2) / 6
          }
        }
        break
      case 'lo2_2x_q2fs':
      case 'lo2_2x_h2fs':
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
      case 'lo2_2x_zuq2fs':
      case 'lo2_2x_zuh2fs':
        maxplace = 1
        for (let i = 0; i < maxplace; i++) {
          let s = datasel[i].length
          if (s > 1) {
            nums += s * (s - 1) / 2
          }
        }
        break
      case 'lo2_bd_q3w':
      case 'lo2_bd_z3w':
      case 'lo2_bd_h3w':
      case 'lo2_1x_1x':
      case 'lo2_qw_dds':
      case 'lo2_qw_czw':
      case 'lo2_rx_fs1z1': // 任选1中1
        maxplace = 0
        if (type === 'lo2_bd_q3w' || type === 'lo2_bd_z3w' || type === 'lo2_bd_h3w' ||
          type === 'lo2_qw_dds' || type === 'lo2_qw_czw' || type === 'lo2_rx_fs1z1') {
          maxplace = 1
        }
        if (type === 'lo2_1x_1x') {
          maxplace = 5
        }
        for (let i = 0; i < maxplace; i++) {
          nums += datasel[i].length
        }
        break
      case 'lo2_rx_fs2z2': // 任选2中2
        maxplace = 1
        for (let i = 0; i < maxplace; i++) {
          let s = datasel[i].length
          if (s > 1) {
            nums += s * (s - 1) / 2
          }
        }
        break
      case 'lo2_rx_fs3z3': // 任选3中3
        maxplace = 1
        for (let i = 0; i < maxplace; i++) {
          let s = datasel[i].length
          if (s > 2) {
            nums += s * (s - 1) * (s - 2) / 6
          }
        }
        break
      case 'lo2_rx_fs4z4': // 任选4中4
        maxplace = 1
        for (let i = 0; i < maxplace; i++) {
          let s = datasel[i].length
          if (s > 3) {
            nums += s * (s - 1) * (s - 2) * (s - 3) / 24
          }
        }
        break
      case 'lo2_rx_fs5z5': // 任选5中5
        maxplace = 1
        for (let i = 0; i < maxplace; i++) {
          let s = datasel[i].length
          if (s > 4) {
            nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) / 120
          }
        }
        break
      case 'lo2_rx_fs6z5': // 任选6中6
        maxplace = 1
        for (let i = 0; i < maxplace; i++) {
          let s = datasel[i].length
          if (s > 5) {
            nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) * (s - 5) / 720
          }
        }
        break
      case 'lo2_rx_fs7z5': // 任选7中7
        maxplace = 1
        for (let i = 0; i < maxplace; i++) {
          let s = datasel[i].length
          if (s > 6) {
            nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) * (s - 5) * (s - 6) / 5040
          }
        }
        break
      case 'lo2_rx_fs8z5': // 任选8中8
        maxplace = 1
        for (let i = 0; i < maxplace; i++) {
          let s = datasel[i].length
          if (s > 7) {
            nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) * (s - 5) * (s - 6) * (s - 7) / 40320
          }
        }
        break
      case 'lo2_dt_2z2':
        nums = this.checkdtNums({len0, len1, mincode: 1})
        break
      case 'lo2_dt_3z3':
        nums = this.checkdtNums({len0, len1, mincode: 2})
        break
      case 'lo2_dt_4z4':
        console.log('into')
        nums = this.checkdtNums({len0, len1, mincode: 3})
        break
      case 'lo2_dt_5z5':
        nums = this.checkdtNums({len0, len1, mincode: 4})
        break
      case 'lo2_dt_6z5':
        nums = this.checkdtNums({len0, len1, mincode: 5})
        break
      case 'lo2_dt_7z5':
        nums = this.checkdtNums({len0, len1, mincode: 6})
        break
      case 'lo2_dt_8z5':
        nums = this.checkdtNums({len0, len1, mincode: 7})
        break
      default:
        break
    }
    return nums
  },
  checkdtNums ({len0, len1, mincode}) {
    let dCount = len0
    let tCount = len1
    let itemcount = 0
    if (mincode === 1) {
      if (dCount === 1) {
        if (tCount >= 1) {
          itemcount = tCount
        }
      }
    }
    if (mincode === 2) {
      if (dCount === 1) {
        if (tCount >= 2) {
          itemcount = tCount * (tCount - 1) / 2
        }
      } else if (dCount === 2) {
        if (tCount >= 1) {
          itemcount = tCount
        }
      }
    }
    if (mincode === 3) {
      if (dCount === 1) {
        if (tCount >= 3) {
          itemcount = tCount * (tCount - 1) * (tCount - 2) / (3 * 2)
        }
      } else if (dCount === 2) {
        if (tCount >= 2) {
          itemcount = tCount * (tCount - 1) / 2
        }
      } else if (dCount === 3) {
        if (tCount >= 1) {
          itemcount = tCount
        }
      }
    }
    if (mincode === 4) {
      if (dCount === 1) {
        if (tCount >= 4) {
          itemcount = tCount * (tCount - 1) * (tCount - 2) * (tCount - 3) / (4 * 3 * 2)
        }
      } else if (dCount === 2) {
        if (tCount >= 3) {
          itemcount = tCount * (tCount - 1) * (tCount - 2) / (3 * 2)
        }
      } else if (dCount === 3) {
        if (tCount >= 2) {
          itemcount = tCount * (tCount - 1) / 2
        }
      } else if (dCount === 4) {
        if (tCount >= 1) {
          itemcount = tCount
        }
      }
    }
    if (mincode === 5) {
      if (dCount === 1) {
        if (tCount >= 5) {
          itemcount = tCount * (tCount - 1) * (tCount - 2) * (tCount - 3) * (tCount - 4) / (5 * 4 * 3 * 2)
        }
      } else if (dCount === 2) {
        if (tCount >= 4) {
          itemcount = tCount * (tCount - 1) * (tCount - 2) * (tCount - 3) / (4 * 3 * 2)
        }
      } else if (dCount === 3) {
        if (tCount >= 3) {
          itemcount = tCount * (tCount - 1) * (tCount - 2) / (3 * 2)
        }
      } else if (dCount === 4) {
        if (tCount >= 2) {
          itemcount = tCount * (tCount - 1) / 2
        }
      } else if (dCount === 5) {
        if (tCount >= 1) {
          itemcount = tCount
        }
      }
    }
    if (mincode === 6) {
      if (dCount === 1) {
        if (tCount >= 6) {
          itemcount = tCount * (tCount - 1) * (tCount - 2) * (tCount - 3) * (tCount - 4) * (tCount - 5) / (6 * 5 * 4 * 3 * 2)
        }
      } else if (dCount === 2) {
        if (tCount >= 5) {
          itemcount = tCount * (tCount - 1) * (tCount - 2) * (tCount - 3) * (tCount - 4) / (5 * 4 * 3 * 2)
        }
      } else if (dCount === 3) {
        if (tCount >= 4) {
          itemcount = tCount * (tCount - 1) * (tCount - 2) * (tCount - 3) / (4 * 3 * 2)
        }
      } else if (dCount === 4) {
        if (tCount >= 3) {
          itemcount = tCount * (tCount - 1) * (tCount - 2) / (3 * 2)
        }
      } else if (dCount === 5) {
        if (tCount >= 2) {
          itemcount = tCount * (tCount - 1) / 2
        }
      } else if (dCount === 6) {
        if (tCount >= 1) {
          itemcount = tCount
        }
      }
    }
    if (mincode === 7) {
      if (dCount === 1) {
        if (tCount >= 7) {
          itemcount = tCount * (tCount - 1) * (tCount - 2) * (tCount - 3) * (tCount - 4) * (tCount - 5) * (tCount - 6) / (7 * 6 * 5 * 4 * 3 * 2)
        }
      } else if (dCount === 2) {
        if (tCount >= 6) {
          itemcount = tCount * (tCount - 1) * (tCount - 2) * (tCount - 3) * (tCount - 4) * (tCount - 5) / (6 * 5 * 4 * 3 * 2)
        }
      } else if (dCount === 3) {
        if (tCount >= 5) {
          itemcount = tCount * (tCount - 1) * (tCount - 2) * (tCount - 3) * (tCount - 4) / (5 * 4 * 3 * 2)
        }
      } else if (dCount === 4) {
        if (tCount >= 4) {
          itemcount = tCount * (tCount - 1) * (tCount - 2) * (tCount - 3) / (4 * 3 * 2)
        }
      } else if (dCount === 5) {
        if (tCount >= 3) {
          itemcount = tCount * (tCount - 1) * (tCount - 2) / (3 * 2)
        }
      } else if (dCount === 6) {
        if (tCount >= 2) {
          itemcount = tCount * (tCount - 1) / 2
        }
      } else if (dCount === 7) {
        if (tCount >= 1) {
          itemcount = tCount
        }
      }
    }
    return itemcount
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
      case 'lo2_3x_q3ds':
      case 'lo2_3x_z3ds':
      case 'lo2_3x_h3ds':
      case 'lo2_3x_zuq3ds':
      case 'lo2_3x_zuz3ds':
      case 'lo2_3x_zuh3ds':
        datasel = this.inputCheck_Num(datasel, 3, this.numberCheck_Num)
        break
      case 'lo2_2x_q2ds':
      case 'lo2_2x_h2ds':
      case 'lo2_2x_zuq2ds':
        datasel = this.inputCheck_Num(datasel, 2, this.numberCheck_Num)
        break
      case 'lo2_rx_ds1z1':
        datasel = this.inputCheck_Num(datasel, 1, this.numberCheck_Num)
        break
      case 'lo2_rx_ds2z2':
        datasel = this.inputCheck_Num(datasel, 2, this.numberCheck_Num)
        break
      case 'lo2_rx_ds3z3':
        datasel = this.inputCheck_Num(datasel, 3, this.numberCheck_Num)
        break
      case 'lo2_rx_ds4z4':
        datasel = this.inputCheck_Num(datasel, 4, this.numberCheck_Num)
        break
      case 'lo2_rx_ds5z5':
        datasel = this.inputCheck_Num(datasel, 5, this.numberCheck_Num)
        break
      case 'lo2_rx_ds6z5':
        datasel = this.inputCheck_Num(datasel, 6, this.numberCheck_Num)
        break
      case 'lo2_rx_ds7z5':
        datasel = this.inputCheck_Num(datasel, 7, this.numberCheck_Num)
        break
      case 'lo2_rx_ds8z5':
        datasel = this.inputCheck_Num(datasel, 8, this.numberCheck_Num)
        break
      default:
        break
    }
    return datasel.toString().replace(/,/g, ',')
  },
  inputFormat (type, datasel) {
    switch (type) {
      case 'lo2_3x_q3fs':
      case 'lo2_3x_z3fs':
      case 'lo2_3x_h3fs':
      case 'lo2_1x_1x':
      case 'lo2_3x_zuq3dt':
      case 'lo2_3x_zuz3dt':
      case 'lo2_3x_zuh3dt':
      case 'lo2_2x_zuq2fs':
      case 'lo2_2x_zuh2fs':
      case 'lo2_2x_q2fs':
      case 'lo2_2x_h2fs':
      case 'lo2_2x_zuq2dt':
      case 'lo2_2x_zuh2dt':
      case 'lo2_bd_q3w':
      case 'lo2_bd_z3w':
      case 'lo2_bd_h3w':
      case 'lo2_rx_fs1z1':
      case 'lo2_rx_fs2z2':
      case 'lo2_rx_fs3z3':
      case 'lo2_rx_fs4z4':
      case 'lo2_rx_fs5z5':
      case 'lo2_rx_fs6z5':
      case 'lo2_rx_fs7z5':
      case 'lo2_rx_fs8z5':
      case 'lo2_qw_czw':
      case 'lo2_dt_2z2':
      case 'lo2_dt_3z3':
      case 'lo2_dt_4z4':
      case 'lo2_dt_5z5':
      case 'lo2_dt_6z5':
      case 'lo2_dt_7z5':
      case 'lo2_dt_8z5':
        return this.formatSelect_Num(datasel, 0, 0)
      // case ：
      // return datasel[0].toString()
      case 'lo2_3x_zuq3fs':
      case 'lo2_3x_zuz3fs':
      case 'lo2_3x_zuh3fs':
        return datasel[0].toString().replace(/,/g, ' ')
      case 'lo2_3x_q3ds':
      case 'lo2_3x_z3ds':
      case 'lo2_3x_h3ds':
      case 'lo2_3x_zuq3ds':
      case 'lo2_3x_zuz3ds':
      case 'lo2_3x_zuh3ds':
      case 'lo2_2x_q2ds':
      case 'lo2_2x_h2ds':
      case 'lo2_rx_ds1z1':
      case 'lo2_rx_ds2z2':
      case 'lo2_rx_ds3z3':
      case 'lo2_rx_ds4z4':
      case 'lo2_rx_ds5z5':
      case 'lo2_rx_ds6z5':
      case 'lo2_rx_ds7z5':
      case 'lo2_rx_ds8z5':
        return this.formatTextarea_Num(type, datasel)
      case 'lo2_qw_dds':
        return datasel[0].toString().replace(/,/g, ' ')
      // case 'lo2_qw_czw':
      // return datasel[0].toString()
      default:
        break
    }
  },
  typeFormat (code) {
    code.sort()
    let arr = []
    let [j, o, z] = [0, 0, 0]
    _.each(code, (val, idx) => {
      let num = parseInt(val)
      if (num % 2 === 0) {
        o++
      } else {
        j++
      }
      if (idx === 2) {
        z = num
      }
    })
    arr[0] = j + '单' + o + '双'
    arr[1] = z
    return arr
  }
}
