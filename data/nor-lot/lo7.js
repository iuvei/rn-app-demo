import _ from 'lodash'
import { rulesNameMap } from './basic-info'
// 幸运彩
export const navBar = [
  {
    code: 'lo7_dw',
    name: '定位',
    subnav: [
      {
        title: '定位',
        play: [
          {code: 'lo7_dw_dw', name: '定位'}
        ]
      }
    ]
  },
  {
    code: 'lo7_jz',
    name: '极值',
    subnav: [
      {
        title: '极值',
        play: [
          {code: 'lo7_jz_jz', name: '极值'}
        ]
      }
    ]
  },
  {
    code: 'lo7_zh',
    name: '组合',
    subnav: [
      {
        title: '组合',
        play: [
          {code: 'lo7_zh_zh', name: '组合'}
        ]
      }
    ]
  },
  {
    code: 'lo7_dxds',
    name: '大小单双',
    subnav: [
      {
        title: '大小单双',
        play: [
          {code: 'lo7_dxds_dxds', name: '大小单双'}
        ]
      }
    ]
  }
]

export const codeMap = {
  lo7_jz_jz: 'xycjz',
  lo7_dw_dw: 'xycdw',
  lo7_dxds_dxds: 'xycdxds',
  lo7_zh_zh: 'xyczh'
}

export const viewData = {
  'lo7_jz_jz': {
    ball_num: {
      layout: [{
        title: '极值',
        balls: _.map(['jida', 'jixiao'], (i) => {
          return {
            ball: i,
            text: rulesNameMap[i],
            rate: '',
            choose: false
          }
        })
      }]
    },
    rectangle: true
  },
  'lo7_dw_dw': {
    ball_num: {
      layout: [{
        title: '定位',
        balls: _.range(0, 28).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            text: i,
            rate: '',
            choose: false
          }
        })
      }]
    },
    rectangle: true
  },
  'lo7_zh_zh': {
    ball_num: {
      layout: [{
        title: '组合',
        balls: _.map(['dadan', 'dashuang', 'xiaodan', 'xiaoshuang'], (i) => {
          return {
            ball: i,
            text: rulesNameMap[i],
            rate: '',
            choose: false
          }
        })
      }]
    },
    rectangle: true
  },
  'lo7_dxds_dxds': {
    ball_num: {
      layout: [{
        title: '大小单双',
        balls: _.map(['da', 'xiao', 'dan', 'shuang'], (i) => {
          return {
            ball: i,
            text: rulesNameMap[i],
            rate: '',
            choose: false
          }
        })
      }]
    },
    rectangle: true
  }
}
