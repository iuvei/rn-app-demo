export default {
  inputNumbers (types, datasel) {
    let nums = 0
    let len0 = datasel[0] ? datasel[0].length : 0
    let len1 = datasel[1] ? datasel[1].length : 0
    // let tmpNums = 1
    // let maxplace = 0
    switch (types) {
      case 'lo5_dwd_d1w':
      case 'lo5_dwd_d2w':
      case 'lo5_dwd_d3w':
      case 'lo5_dwd_d4w':
      case 'lo5_dwd_d5w':
      case 'lo5_dwd_d6w':
      case 'lo5_dwd_d7w':
      case 'lo5_dwd_d8w':
      case 'lo5_rx_1z1':
        nums = len0
        break
      case 'lo5_rx_2z2':
        nums = len0 * (len0 - 1) / 2
        break
      case 'lo5_rx_3z3':
        nums = len0 * (len0 - 1) * (len0 - 2) / 6
        break
      case 'lo5_rx_4z4':
        nums = len0 * (len0 - 1) * (len0 - 2) * (len0 - 3) / 24
        break
      case 'lo5_rx_5z5':
        nums = len0 * (len0 - 1) * (len0 - 2) * (len0 - 3) * (len0 - 4) / 120
        break
      case 'lo5_dt_2z2':
        nums = this.checkdtNums({len0, len1, mincode: 1})
        break
      case 'lo5_dt_3z3':
        nums = this.checkdtNums({len0, len1, mincode: 2})
        break
      case 'lo5_dt_4z4':
        nums = this.checkdtNums({len0, len1, mincode: 3})
        break
      case 'lo5_dt_5z5':
        nums = this.checkdtNums({len0, len1, mincode: 4})
        break
      case 'lo5_sx_zxqs':
      case 'lo5_sx_zxhs':
        nums = this.checksxNums({datasel})
        break
      case 'lo5_sx_zuxqs':
      case 'lo5_sx_zuxhs':
        nums = this.checkSXzuxNumber({len0})
        break
      case 'lo5_ex_zx':
        nums = this.checkexzhixNums({datasel})
        break
      case 'lo5_ex_zux':
        nums = this.checkexzuxNums({len0})
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
  checksxNums ({datasel}) {
    let count = 0
    let [len0, len1, len2] = datasel
    len0.filter(i => {
      len1.filter(j => {
        len2.filter(k => {
          if (i !== j && i !== k && j !== k) {
            count++
          }
        })
      })
    })
    return count
  },
  checkSXzuxNumber ({len0}) {
    return len0 * (len0 - 1) * (len0 - 2) / 6
  },
  checkexzhixNums ({datasel}) {
    let count = 0
    let [len0, len1] = datasel
    len0.filter(i => {
      len1.filter(j => {
        if (i !== j) {
          count++
        }
      })
    })
    return count
  },
  checkexzuxNums ({len0}) {
    return len0 * (len0 - 1) / 2
  },
  getContent ({datasel, sy}) {
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
    // let tmpNums = 1
    // let maxplace = 0
    switch (types) {
      case 'lo5_dwd_d1w':
      case 'lo5_dwd_d2w':
      case 'lo5_dwd_d3w':
      case 'lo5_dwd_d4w':
      case 'lo5_dwd_d5w':
      case 'lo5_dwd_d6w':
      case 'lo5_dwd_d7w':
      case 'lo5_dwd_d8w':
      case 'lo5_rx_1z1':
      case 'lo5_rx_2z2':
      case 'lo5_rx_3z3':
      case 'lo5_rx_4z4':
      case 'lo5_rx_5z5':
      case 'lo5_sx_zuxqs':
      case 'lo5_sx_zuxhs':
      case 'lo5_ex_zux':
        return datasel.toString().replace(/,/g, ' ')
      case 'lo5_dt_2z2':
      case 'lo5_dt_3z3':
      case 'lo5_dt_4z4':
      case 'lo5_dt_5z5':
      case 'lo5_sx_zxqs':
      case 'lo5_sx_zxhs':
      case 'lo5_ex_zx':
        return this.getContent({datasel})
    }
  }
}
