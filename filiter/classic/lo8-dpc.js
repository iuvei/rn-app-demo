import _ from 'lodash'
import { ArrayUtil } from './lot-util'

export default {
  inputNumbers (types, datasel) {
    let len0 = datasel[0] ? datasel[0].length : 0
    let len1 = datasel[1] ? datasel[1].length : 0
    let len2 = datasel[2] ? datasel[2].length : 0
    let nums = 0
    switch (types) {
      case 'lo8_zx_fs':
        if (!len0 || !len1 || !len2) {
          return 0
        }
        nums = len0 * len1 * len2
        break
      case 'lo8_zx_ds':
        nums = this.inputCheck_Num(datasel, 3).length
        break
      case 'lo8_zux_zs':
        nums = len0 * (len0 - 1)
        break
      case 'lo8_zux_zl':
        nums = len0 * (len0 - 1) * (len0 - 2) / 6
        break
      case 'lo8_zux_hh':
        nums = this.inputCheck_Num(datasel, 3, true).length
        break
      case 'lo8_zux_zsdt':
        if (len0 === 1) {
          if (len1 >= 1) {
            nums = len1 * 2
          }
        }
        break
      case 'lo8_zux_zldt':
        if (len0 <= 2 && len0 > 0) {
          if (len0 === 1) {
            if (len1 >= 2) {
              nums = len1 * (len1 - 1) / 2
            }
          } else if (len0 === 2) {
            if (len1 >= 1) {
              nums = len1
            }
          }
        }
        break
      case 'lo8_ex_qefs':
      case 'lo8_ex_hefs':
        nums = len0 * len1
        break
      case 'lo8_ex_qeds':
      case 'lo8_ex_heds':
        nums = this.inputCheck_Num(datasel, 2).length
        break
      case 'lo8_bdw__bdw':
      case 'lo8_dwd_qy':
      case 'lo8_dwd_hy':
      case 'lo8_hs_dx':
      case 'lo8_qw_jo':
      case 'lo8_qw_tlj':
        nums = len0
        break
      case 'lo8_hz_zx':
        for (let i = 0; i <= 9; i++) {
          for (let j = 0; j <= 9; j++) {
            for (let k = 0; k <= 9; k++) {
              for (let d = 0; d < len0; d++) {
                if (datasel[0] !== undefined && datasel[0][d] !== '') {
                  if (i + j + k === parseInt(datasel[0][d])) {
                    nums++
                  }
                }
              }
            }
          }
        }
        break
      case 'lo8_hs_zs':
        for (let i = 0; i <= 9; i++) {
          for (let j = 0; j <= 9; j++) {
            for (let k = 0; k <= 9; k++) {
              for (let d = 0; d < len0; d++) {
                if (datasel[0][d] !== undefined && datasel[0][d] !== '') {
                  if (i + j + k === parseInt(datasel[0][d])) {
                    if ((i === j && j !== k) || (i === k && k !== j) || (j === k && k !== i)) {
                      nums++
                    }
                  }
                }
              }
            }
          }
        }
        nums = nums / 3
        break
      case 'lo8_hs_zl':
        for (let i = 0; i <= 9; i++) {
          for (let j = 0; j <= 9; j++) {
            for (let k = 0; k <= 9; k++) {
              for (let d = 0; d < len0; d++) {
                if (datasel[0][d] !== undefined && datasel[0][d] !== '') {
                  if (i + j + k === parseInt(datasel[0][d])) {
                    if (i !== j && j !== k && k !== i) {
                      nums++
                    }
                  }
                }
              }
            }
          }
        }
        nums = nums / 6
        break
    }
    return nums
  },
  getContent ({datasel}) {
    let f = ''
    datasel.filter((item, index) => {
      f += item.toString().replace(/,/g, ' ')
      if (index !== datasel.length - 1) {
        f += ','
      }
    })
    return f
  },
  inputFormat (types, datasel) {
    switch (types) {
      case 'lo8_zx_fs':
      case 'lo8_zux_zs':
      case 'lo8_zux_zl':
      case 'lo8_zux_zsdt':
      case 'lo8_zux_zldt':
      case 'lo8_ex_qefs':
      case 'lo8_ex_hefs':
      case 'lo8_bdw__bdw':
      case 'lo8_dwd_qy':
      case 'lo8_dwd_hy':
      case 'lo8_hz_zx':
      case 'lo8_hs_zs':
      case 'lo8_hs_zl':
      case 'lo8_hs_dx':
      case 'lo8_qw_jo':
      case 'lo8_qw_tlj':
        return this.getContent({datasel})
      case 'lo8_zx_ds':
        return this.inputCheck_Num(datasel, 3).toString()
      case 'lo8_zux_hh':
        return this.inputCheck_Num(datasel, 3, true).toString()
      case 'lo8_ex_qeds':
      case 'lo8_ex_heds':
        return this.inputCheck_Num(datasel, 2).toString()
    }
  },
  inputCheck_Num (datasel, l, sort) {
    let newsel = [] // 新的号码
    if (sort) { // 如果需要号码排序
      let sortsel = []
      _.each(datasel, (n, i) => {
        sortsel.push(n.split('').sort().toString().replace(/,/g, ''))
      })
      datasel = sortsel
    }
    datasel = ArrayUtil.unique(datasel) // 去除重复
    let regex = new RegExp('^[0-9]{' + l + '}$')
    _.each(datasel, (n, i) => {
      if (regex.test(n)) {
        newsel.push(n)
      }
    })
    return newsel
  }
}
