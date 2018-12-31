import _ from 'lodash'

// PK10、高频PK10
export const navBar = [
  {
    code: 'lo4_q1',
    name: '前一',
    subnav: [
      {
        title: '前一',
        play: [
          {code: 'lo4_q1_q1', name: '前一'}
        ]
      }
    ]
  },
  {
    code: 'lo4_q2',
    name: '前二',
    subnav: [
      {
        title: '前二',
        play: [
          {code: 'lo4_q2_fs', name: '复式'},
          {code: 'lo4_q2_ds', name: '单式'}
        ]
      }
    ]
  },
  {
    code: 'lo4_q3',
    name: '前三',
    subnav: [
      {
        title: '前三',
        play: [
          {code: 'lo4_q3_fs', name: '复式'},
          {code: 'lo4_q3_ds', name: '单式'}
        ]
      }
    ]
  },
  {
    code: 'lo4_1x',
    name: '定位胆',
    subnav: [
      {
        title: '定位胆',
        play: [
          {code: 'lo4_1x_dwd', name: '定位胆'}
        ]
      }
    ]
  },
  {
    code: 'lo4_dx',
    name: '大小',
    subnav: [
      {
        title: '大小',
        play: [
          {code: 'lo4_dx_1', name: '第一名'},
          {code: 'lo4_dx_2', name: '第二名'},
          {code: 'lo4_dx_3', name: '第三名'}
        ]
      }]
  }, {
    code: 'lo4_ds',
    name: '单双',
    subnav: [
      {
        title: '单双',
        play: [
          {code: 'lo4_ds_1', name: '第一名'},
          {code: 'lo4_ds_2', name: '第二名'},
          {code: 'lo4_ds_3', name: '第三名'}
        ]
      }
    ]
  },
  {
    code: 'lo4_lh',
    name: '龙虎',
    subnav: [
      {
        title: '龙虎',
        play: [
          {code: 'lo4_lh_1', name: '第一名'},
          {code: 'lo4_lh_2', name: '第二名'},
          {code: 'lo4_lh_3', name: '第三名'}
        ]
      }
    ]
  },
  {
    code: 'lo4_gyh',
    name: '冠亚和',
    subnav: [
      {
        title: '冠亚和',
        play: [
          {code: 'lo4_gyh_dx', name: '大小'},
          {code: 'lo4_gyh_ds', name: '单双'},
          {code: 'lo4_gyh_hz', name: '和值'}
        ]
      }
    ]
  }
]

export const codeMap = {
  // PK10
  'lo4_q1_q1': 'qian1',
  //
  'lo4_q2_fs': 'qian2',
  'lo4_q2_ds': 'qian2ds',
  //
  'lo4_q3_fs': 'qian3',
  'lo4_q3_ds': 'qian3ds',
  //
  'lo4_1x_dwd': 'dwd',
  // 'lo4_1x_q5': 'dwqian',
  // 'lo4_1x_h5': 'dwhou',
  //
  'lo4_dx_1': 'dxdy',
  'lo4_dx_2': 'dxde',
  'lo4_dx_3': 'dxds',
  //
  'lo4_ds_1': 'dsdy',
  'lo4_ds_2': 'dsde',
  'lo4_ds_3': 'dsds',

  'lo4_lh_1': 'lhdy',
  'lo4_lh_2': 'lhde',
  'lo4_lh_3': 'lhds',
  //
  'lo4_gyh_ds': 'gyhds',
  'lo4_gyh_dx': 'gyhdx',
  'lo4_gyh_hz': 'gyhhz'
}

export const viewData = {
  /** PK10 **/
  'lo4_q1_q1': {
    'name': '前一',
    'row': ['d1m'],
    // 'ball_num': '1~10',
    // 'ball_bit': 2,
    'ball_key': true,
    'ball_num': {
      layout: [{
        title: '前一',
        Maxchoose: 10,
        balls: _.range(1, 11).map(i => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }]
    }
  },
  //
  'lo4_q2_fs': {
    'name': '前二 复式',
    'row': ['d1m', 'd2m'],
    'ball_num': '1~10',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo4_q2_ds': {
    'name': '前二 单式'
  },
  //
  'lo4_q3_fs': {
    'name': '前三 复式',
    'row': ['d1m', 'd2m', 'd3m'],
    'ball_num': '1~10',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo4_q3_ds': {
    'name': '前三 单式'
  },
  //
  // 'lo4_1x_q5': {
  //   'name': '定位胆 前五名',
  //   'row': ['d1m', 'd2m', 'd3m', 'd4m', 'd5m'],
  //   'ball_num': '1~10',
  //   'ball_bit': 2,
  //   'ball_key': true
  // },
  // 'lo4_1x_h5': {
  //   'name': '定位胆 后五名',
  //   'row': ['d6m', 'd7m', 'd8m', 'd9m', 'd10m'],
  //   'ball_num': '1~10',
  //   'ball_bit': 2,
  //   'ball_key': true
  // },
  'lo4_1x_dwd': {
    'name': '定位胆 后五名',
    'row': ['d1m', 'd2m', 'd3m', 'd4m', 'd5m', 'd6m', 'd7m', 'd8m', 'd9m', 'd10m'],
    'ball_num': '1~10',
    Maxchoose: 1,
    'ball_bit': 2,
    'ball_key': true
  },
  //
  'lo4_dx_1': {
    'name': '大小 第一名',
    'row': ['d1m'],
    'ball_num': ['da', 'xiao']
  },
  'lo4_dx_2': {
    'name': '大小 第二名',
    'row': ['d2m'],
    'ball_num': ['da', 'xiao']
  },
  'lo4_dx_3': {
    'name': '大小 第三名',
    'row': ['d3m'],
    'ball_num': ['da', 'xiao']
  },
  //
  'lo4_ds_1': {
    'name': '单双 第一名',
    'row': ['d1m'],
    'ball_num': ['dan', 'shuang']
  },
  'lo4_ds_2': {
    'name': '单双 第二名',
    'row': ['d2m'],
    'ball_num': ['dan', 'shuang']
  },
  'lo4_ds_3': {
    'name': '单双 第三名',
    'row': ['d3m'],
    'ball_num': ['dan', 'shuang']
  },
  'lo4_lh_1': {
    'name': '龙虎 第一名',
    'row': ['d1m'],
    'ball_num': ['long', 'hu']
  },
  'lo4_lh_2': {
    'name': '龙虎 第二名',
    'row': ['d2m'],
    'ball_num': ['long', 'hu']
  },
  'lo4_lh_3': {
    'name': '龙虎 第三名',
    'row': ['d3m'],
    'ball_num': ['long', 'hu']
  },
  'lo4_gyh_dx': {
    'name': '冠亚和 大小',
    'row': ['dx'],
    'ball_num': ['da', 'xiao']
  },
  'lo4_gyh_ds': {
    'name': '冠亚和 单双',
    'row': ['ds'],
    'ball_num': ['dan', 'shuang']
  },
  'lo4_gyh_hz': {
    'name': '冠亚和 和值',
    'row': ['hz'],
    'ball_num': '3~19',
    'ball_bit': 2,
    'ball_key': true
  }
}
