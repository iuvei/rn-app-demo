import _ from 'lodash'

// 其他 3d
export const navBar = [
  {
    code: 'lo8_zx',
    name: '直选',
    subnav: [
      {
        title: '直选',
        play: [
          {code: 'lo8_zx_fs', name: '复式'},
          {code: 'lo8_zx_ds', name: '单式'}
        ]
      }
    ]
  },
  {
    code: 'lo8_zux',
    name: '组选',
    subnav: [
      {
        title: '组选',
        play: [
          {code: 'lo8_zux_zs', name: '组三'},
          {code: 'lo8_zux_zl', name: '组六'},
          {code: 'lo8_zux_hh', name: '混合'},
          {code: 'lo8_zux_zsdt', name: '组三胆拖'},
          {code: 'lo8_zux_zldt', name: '组六胆拖'}
        ]
      }
    ]
  },
  {
    code: 'lo8_ex',
    name: '二星',
    subnav: [
      {
        title: '复式',
        play: [
          {code: 'lo8_ex_qefs', name: '前二'},
          {code: 'lo8_ex_hefs', name: '后二'}
        ]
      }, {
        title: '单式',
        play: [
          {code: 'lo8_ex_qeds', name: '前二'},
          {code: 'lo8_ex_heds', name: '后二'}
        ]
      }
    ]
  },
  {
    code: 'lo8_bdw',
    name: '不定位',
    subnav: [
      {
        title: '不定位',
        play: [
          {code: 'lo8_bdw__bdw', name: '不定位'}
        ]
      }
    ]
  },
  {
    code: 'lo8_dwd',
    name: '定位胆',
    subnav: [
      {
        title: '定位胆',
        play: [
          {code: 'lo8_dwd_qy', name: '前一'},
          {code: 'lo8_dwd_hy', name: '后一'}
        ]
      }
    ]
  },
  {
    code: 'lo8_hz',
    name: '和值',
    subnav: [
      {
        title: '和值',
        play: [
          {code: 'lo8_hz_zx', name: '直选'},
          {code: 'lo8_hs_zs', name: '组三'},
          {code: 'lo8_hs_zl', name: '组六'},
          {code: 'lo8_hs_dx', name: '大小'}
        ]
      }
    ]
  },
  {
    code: 'lo8_qw',
    name: '趣味',
    subnav: [
      {
        title: '趣味',
        play: [
          {code: 'lo8_qw_jo', name: '奇偶'},
          {code: 'lo8_qw_tlj', name: '拖拉机'}
        ]
      }
    ]
  }
]

export const codeMap = {
  'lo8_zx_fs': 'pl3zxfs',
  'lo8_zx_ds': 'pl3zxds',
  'lo8_zux_zs': 'pl3zux3',
  'lo8_zux_zl': 'pl3zux6',
  'lo8_zux_hh': 'pl3zuxhh',
  'lo8_zux_zsdt': 'pl3zux3dt',
  'lo8_zux_zldt': 'pl3zux6dt',
  'lo8_ex_qefs': 'pl3qx2fs',
  'lo8_ex_hefs': 'pl3hx2fs',
  'lo8_ex_qeds': 'pl3qx2ds',
  'lo8_ex_heds': 'pl3hx2ds',
  'lo8_bdw__bdw': 'pl3bdw',
  'lo8_dwd_qy': 'pl3dwd1q',
  'lo8_dwd_hy': 'pl3dwd1h',
  'lo8_hz_zx': 'pl3hzzx',
  'lo8_hs_zs': 'pl3hzzux3',
  'lo8_hs_zl': 'pl3hzzux6',
  'lo8_hs_dx': 'pl3hzdx',
  'lo8_qw_jo': 'pl3qwjo',
  'lo8_qw_tlj': 'pl3qwtlj'
}

export const viewData = {
  // 3d
  'lo8_zx_fs': {
    title: '',
    'row': ['bw', 'sw', 'gw'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo8_zx_ds': {'title': '直选 单式'},
  'lo8_zux_zs': {
    title: '',
    'row': ['zs'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo8_zux_zl': {
    title: '',
    'row': ['zl'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo8_zux_hh': {},
  'lo8_zux_zsdt': {
    title: '',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        chooseOne: 1,
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(0, 10).map((i) => {
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(0, 10).map((i) => {
          return {
            ball: i,
            choose: false
          }
        })
      }]
    }
  },
  'lo8_zux_zldt': {
    title: '',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(0, 10).map((i) => {
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(0, 10).map((i) => {
          return {
            ball: i,
            choose: false
          }
        })
      }]
    }
  },
  'lo8_ex_qefs': {
    title: '',
    'row': ['bw', 'sw'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo8_ex_hefs': {
    title: '',
    'row': ['sw', 'gw'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo8_ex_qeds': {},
  'lo8_ex_heds': {},
  'lo8_bdw__bdw': {
    'row': ['bdw'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo8_dwd_qy': {
    title: '',
    'row': ['qy'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo8_dwd_hy': {
    title: '',
    'row': ['hy'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo8_hz_zx': {
    title: '',
    'row': ['zx'],
    'ball_num': '0~27',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo8_hs_zs': {
    title: '',
    'row': ['zs'],
    'ball_num': '1~26',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo8_hs_zl': {
    title: '',
    'row': ['zl'],
    'ball_num': '3~24',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo8_hs_dx': {
    'row': ['dx'],
    'ball_num': ['da', 'xiao']
  },
  'lo8_qw_jo': {
    'ball_num': {
      layout: [{
        title: '奇偶',
        balls: _.map(['奇', '偶'], (i) => {
          return {
            ball: i,
            choose: false
          }
        })
      }]
    }
  },
  'lo8_qw_tlj': {
    'ball_num': {
      layout: [{
        title: '拖拉机',
        balls: _.map(['全'], (i) => {
          return {
            ball: i,
            choose: false
          }
        })
      }]
    }
  }
}
