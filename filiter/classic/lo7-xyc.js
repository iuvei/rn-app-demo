export default {
  inputNumbers (type, datasel) {
    // XYC_DW_DW
    if (type === 'lo7_jz_jz') {
      let len = 0
      datasel.forEach(value => {
        len += value.length
      })
      return len
    }
    return datasel[0].length
  },
  inputFormat (type, datasel) {
    // if (type === 'lo7_jz_jz') {
    //   return datasel[0].concat(datasel[1])
    // }
    return datasel[0]
  }
}
