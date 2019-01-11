export const ArrayUtil = {
  // 组合数
  ComNum (n, m) {
    m = parseInt(m)
    n = parseInt(n)
    if (m < 0 || n < 0) {
      return false
    }
    if (m === 0 || n === 0) {
      return 1
    }
    if (m > n) {
      return 0
    }
    if (m > n / 2.0) {
      m = n - m
    }
    let result = 0.0
    for (let i = n; i >= (n - m + 1); i--) {
      result += Math.log(i)
    }
    for (let i = m; i >= 1; i--) {
      result -= Math.log(i)
    }
    result = Math.exp(result)
    return Math.round(result)
  },
  // 组合值
  ComVal (source, m, x) {
    let n = source.length
    let list = []
    let start = 0
    while (m > 0) {
      if (m === 1) {
        list.push(source[start + x])
        break
      }
      for (let i = 0; i <= n - m; i++) {
        let cnm = this.ComNum(n - 1 - i, m - 1)
        if (x <= cnm - 1) {
          list.push(source[start + i])
          start = start + (i + 1)
          n = n - (i + 1)
          m--
          break
        } else {
          x = x - cnm
        }
      }
    }
    return list
  },
  // 判断是否存在
  inArray (e, data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === e) return true
    }
    return false
  },
  // 数组去重复
  uniquelize (data) {
    let array = []
    for (let i = 0; i < data.length; i++) {
      if (!this.inArray(data[i], array)) {
        array.push(data[i])
      }
    }
    return array
  },
  // 求两个集合的并集
  union (a, b) {
    return this.uniquelize(a.concat(b))
  },
  // 求两个集合的差集
  minus (a, b) {
    let array = []
    let ua = this.uniquelize(a)
    for (let i = 0; i < ua.length; i++) {
      if (!this.inArray(ua[i], b)) {
        array.push(ua[i])
      }
    }
    return array
  },
  // 求两个集合的交集
  intersect (a, b) {
    let array = []
    let ua = this.uniquelize(a)
    for (let i = 0; i < ua.length; i++) {
      if (this.inArray(ua[i], b)) {
        array.push(ua[i])
      }
    }
    return array
  },
  // 求两个集合的补集
  complement (a, b) {
    return this.minus(this.union(a, b), this.intersect(a, b))
  },
  // 去除重复，最快速方法，会排序
  unique (data) {
    data.sort()
    let re = [data[0]]
    for (let i = 1; i < data.length; i++) {
      if (data[i] !== re[re.length - 1]) {
        re.push(data[i])
      }
    }
    return re
  },
  // 根据下标删除
  remove (data, idx) {
    if (data.length > idx) {
      data.splice(idx, 1)
    }
    return data
  }
}

export const LZMAUtil = {
  toHex (byteRrr) {
    let hexStr = ''
    let tmpHex = ''
    let len = byteRrr.length
    for (let i = 0; i < len; ++i) {
      if (byteRrr[i] < 0) {
        byteRrr[i] = byteRrr[i] + 256
      }
      tmpHex = byteRrr[i].toString(16)
      if (tmpHex.length === 1) {
        tmpHex = '0' + tmpHex
      }
      hexStr += byteRrr
    }
    return hexStr.trim()
  }
}
