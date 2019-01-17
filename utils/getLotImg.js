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
