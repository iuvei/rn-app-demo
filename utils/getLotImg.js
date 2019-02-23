import a1 from '../assets/images/home/ssc_1.png'
import a2 from '../assets/images/home/ssc_2.png'
import a3 from '../assets/images/home/ssc_3.png'
import a4 from '../assets/images/home/ssc_4.png'

const getImgKey = lotterCode => {
  // cq tx md qq gd
  // xdl jpz wx jnd
  // ld bls xjp xdj
  // flb jzd xhg sd
  if (lotterCode.indexOf('cq') > -1 || lotterCode.indexOf('xdl') > -1 || lotterCode.indexOf('ld') > -1 || lotterCode.indexOf('gd') > -1){
    return 0
  } else if (lotterCode.indexOf('tx') > -1 || lotterCode.indexOf('jpz') > -1 || lotterCode.indexOf('bls') > -1) {
    return 1
  } else if (lotterCode.indexOf('md') > -1 || lotterCode.indexOf('wx') > -1 || lotterCode.indexOf('xjp') > -1 || lotterCode.indexOf('sd') > -1) {
    return 2
  } else if (lotterCode.indexOf('qq') > -1 || lotterCode.indexOf('jnd') > -1 || lotterCode.indexOf('xdj') > -1 || lotterCode.indexOf('jzd') > -1) {
    return 3
  } else {
    return 1
  }
}

export const getLoHoIconName = item => {
  let {realCategory, categoryCode, lotterCode} = item
  let key = getImgKey(lotterCode)
  let value = realCategory || categoryCode
  const data = {
    ssc: [a1, a2, a3, a4],
    syx5: [
      require('../assets/images/home/syx5_1.png'),
      require('../assets/images/home/syx5_2.png'),
      require('../assets/images/home/syx5_3.png'),
      require('../assets/images/home/syx5_4.png')
    ],
    kl8: [
      require('../assets/images/home/kl8_1.png'),
      require('../assets/images/home/kl8_2.png'),
      require('../assets/images/home/kl8_3.png'),
      require('../assets/images/home/kl8_4.png')
    ],
    pk10: [
      require('../assets/images/home/pk10_1.png'),
      require('../assets/images/home/pk10_2.png'),
      require('../assets/images/home/pk10_3.png'),
      require('../assets/images/home/pk10_4.png')
    ],
    k3: [
      require('../assets/images/home/k3_1.png'),
      require('../assets/images/home/k3_2.png'),
      require('../assets/images/home/k3_3.png'),
      require('../assets/images/home/k3_4.png')
    ],
    kl10: [
      require('../assets/images/home/kl10_1.png'),
      require('../assets/images/home/kl10_2.png'),
      require('../assets/images/home/kl10_3.png'),
      require('../assets/images/home/kl10_4.png')
    ],
    xyc: [
      require('../assets/images/home/xyc_1.png'),
      require('../assets/images/home/xyc_2.png'),
      require('../assets/images/home/xyc_3.png'),
      require('../assets/images/home/xyc_4.png')
    ],
    dpc: [
      require('../assets/images/home/dpc_1.png'),
      require('../assets/images/home/dpc_2.png'),
      require('../assets/images/home/dpc_3.png'),
      require('../assets/images/home/dpc_4.png')
    ]
  }
  return data[value] ? data[value][key] : a1
}

export const getIconName = value => {
  switch (value) {
    case 'ssc':
      return require('../assets/images/home/ssc_icon.png')
      break
    case 'syx5':
      return require('../assets/images/home/syxw_icon.png')
      break
    case 'kl8':
      return require('../assets/images/home/klc_icon.png')
      break
    case 'pk10':
      return require('../assets/images/home/pks_icon.png')
      break
    case 'k3':
      return require('../assets/images/home/ks_icon.png')
      break
    case 'kl10':
      return require('../assets/images/home/kls_icon.png')
      break
    case 'xyc':
      return require('../assets/images/home/xyc_icon.png')
      break
    case 'dpc':
      return require('../assets/images/home/dpc_icon.png')
      break
    default:
      return require('../assets/images/home/ssc_icon.png')
  }
}
