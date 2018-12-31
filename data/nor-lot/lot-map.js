// 全局设定彩种
export const selfLot = [
  {
    name: '时时彩',
    code: 'lo1',
    lotCode: 'cqssc',
    mapCode: ['ssc']
  },
  {name: '11选5', code: 'lo2', mapCode: ['syx5']},
  {name: '快三', code: 'lo3', mapCode: ['k3']},
  {name: 'PK拾', code: 'lo4', mapCode: ['pk10']},
  {name: '快乐十分', code: 'lo5', mapCode: ['kl10']},
  {name: '基诺', code: 'lo6', mapCode: ['kl8']},
  {name: '幸运彩', code: 'lo7', mapCode: ['xyc']},
  {name: '低频彩', code: 'lo8', mapCode: ['dpc']}
]

export const getMapCode = realCategory => {
  return selfLot.filter(lot => {
    return lot.mapCode.includes(realCategory) ? lot : ''
  })[0].code
}

export const foundLot = (lotCode, lotStore) => {
  let lotdata = {}
  if (!Object.keys(lotStore).length) return
  lotStore.filter(store => {
    store.lotterList.filter(lot => {
      if (lot.lotterCode === lotCode) {
        lotdata = lot
      }
    })
  })
  return lotdata
}
