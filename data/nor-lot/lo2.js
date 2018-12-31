import _ from 'lodash'
// 11选5
export const navBar = [
  {
    code: 'lo2_3x',
    name: '三星',
    subnav: [
      {
        title: '直选',
        play: [
          {code: 'lo2_3x_q3fs', name: '前三复式'},
          {code: 'lo2_3x_q3ds', name: '前三单式'},
          {code: 'lo2_3x_z3fs', name: '中三复式'},
          {code: 'lo2_3x_z3ds', name: '中三单式'},
          {code: 'lo2_3x_h3fs', name: '后三复式'},
          {code: 'lo2_3x_h3ds', name: '后三单式'}
        ]
      }, {
        title: '组选',
        play: [
          {code: 'lo2_3x_zuq3fs', name: '前三复式'},
          {code: 'lo2_3x_zuq3dt', name: '前三胆拖'},
          {code: 'lo2_3x_zuz3fs', name: '中三复式'},
          {code: 'lo2_3x_zuz3dt', name: '中三胆拖'},
          {code: 'lo2_3x_zuh3fs', name: '后三复式'},
          {code: 'lo2_3x_zuh3dt', name: '后三胆拖'}
        ]
      }
    ]
  },
  {
    code: 'lo2_2x',
    name: '二星',
    subnav: [
      {
        title: '直选',
        play: [
          {code: 'lo2_2x_q2fs', name: '前二复式'},
          {code: 'lo2_2x_q2ds', name: '前二单式'},
          {code: 'lo2_2x_h2fs', name: '后二复式'},
          {code: 'lo2_2x_h2ds', name: '后二单式'}
        ]
      },
      {
        title: '组选',
        play: [
          {code: 'lo2_2x_zuq2fs', name: '前二复式'},
          {code: 'lo2_2x_zuq2dt', name: '前二胆拖'},
          {code: 'lo2_2x_zuh2fs', name: '后二复式'},
          {code: 'lo2_2x_zuh2dt', name: '后二胆拖'}
        ]
      }
    ]
  },
  {
    code: 'lo2_bd',
    name: '不定位',
    subnav: [
      {
        title: '不定位',
        play: [
          {code: 'lo2_bd_q3w', name: '前三位'},
          {code: 'lo2_bd_z3w', name: '中三位'},
          {code: 'lo2_bd_h3w', name: '后三位'}
        ]
      }
    ]
  },
  {
    code: 'lo2_1x',
    name: '定位胆',
    subnav: [
      {
        title: '定位胆',
        play: [
          {code: 'lo2_1x_1x', name: '定位胆'}
        ]
      }
    ]
  },
  {
    code: 'lo2_rx',
    name: '任选',
    subnav: [
      {
        title: '复式',
        play: [
          {code: 'lo2_rx_fs1z1', name: '一中一'},
          {code: 'lo2_rx_fs2z2', name: '二中二'},
          {code: 'lo2_rx_fs3z3', name: '三中三'},
          {code: 'lo2_rx_fs4z4', name: '四中四'},
          {code: 'lo2_rx_fs5z5', name: '五中五'},
          {code: 'lo2_rx_fs6z5', name: '六中五'},
          {code: 'lo2_rx_fs7z5', name: '七中五'},
          {code: 'lo2_rx_fs8z5', name: '八中五'}
        ]
      },
      {
        title: '单式',
        play: [
          {code: 'lo2_rx_ds1z1', name: '一中一'},
          {code: 'lo2_rx_ds2z2', name: '二中二'},
          {code: 'lo2_rx_ds3z3', name: '三中三'},
          {code: 'lo2_rx_ds4z4', name: '四中四'},
          {code: 'lo2_rx_ds5z5', name: '五中五'},
          {code: 'lo2_rx_ds6z5', name: '六中五'},
          {code: 'lo2_rx_ds7z5', name: '七中五'},
          {code: 'lo2_rx_ds8z5', name: '八中五'}
        ]
      }
    ]
  },
  {
    code: 'lo2_dt',
    name: '胆拖',
    subnav: [
      {
        title: '任选',
        play: [
          {code: 'lo2_dt_2z2', name: '二中二'},
          {code: 'lo2_dt_3z3', name: '三中三'},
          {code: 'lo2_dt_4z4', name: '四中四'},
          {code: 'lo2_dt_5z5', name: '五中五'},
          {code: 'lo2_dt_6z5', name: '六中五'},
          {code: 'lo2_dt_7z5', name: '七中五'},
          {code: 'lo2_dt_8z5', name: '八中五'}
        ]
      }
    ]
  },
  {
    code: 'lo2_qw',
    name: '趣味',
    subnav: [
      {
        title: '趣味型',
        play: [
          {code: 'lo2_qw_dds', name: '定单双'},
          {code: 'lo2_qw_czw', name: '猜中位'}
        ]
      }
    ]
  }
]

export const codeMap = {
  'lo2_3x_q3fs': '11x5qsfs',
  'lo2_3x_q3ds': '11x5qsds',
  'lo2_3x_z3fs': '11x5zsfs',
  'lo2_3x_z3ds': '11x5zsds',
  'lo2_3x_h3fs': '11x5hsfs',
  'lo2_3x_h3ds': '11x5hsds',
  'lo2_3x_zuq3fs': '11x5qszx',
  'lo2_3x_zuz3fs': '11x5zszx',
  'lo2_3x_zuh3fs': '11x5hszx',
  // 'lo2_3x_zuq3ds': 'sanmzuxdsq',
  // 新增
  'lo2_3x_zuq3dt': '11x5qsdt',
  'lo2_3x_zuz3dt': '11x5zsdt',
  'lo2_3x_zuh3dt': '11x5hsdt',
  // 二星
  'lo2_2x_q2fs': '11x5qefs',
  'lo2_2x_h2fs': '11x5hefs',
  'lo2_2x_q2ds': '11x5qeds',
  'lo2_2x_h2ds': '11x5heds',
  'lo2_2x_zuq2fs': '11x5qezx',
  'lo2_2x_zuh2fs': '11x5hezx',
  // 'lo2_2x_zuq2ds': 'ermzuxdsq',
  // 新增
  'lo2_2x_zuq2dt': '11x5qedt',
  'lo2_2x_zuh2dt': '11x5hedt',
  //
  'lo2_1x_1x': '11x5dwd',
  //
  'lo2_bd_q3w': '11x5bdwqs',
  'lo2_bd_z3w': '11x5bdwzs',
  'lo2_bd_h3w': '11x5bdwhs',
  //
  'lo2_rx_fs1z1': '11x5rx1z1',
  'lo2_rx_fs2z2': '11x5rx2z2',
  'lo2_rx_fs3z3': '11x5rx3z3',
  'lo2_rx_fs4z4': '11x5rx4z4',
  'lo2_rx_fs5z5': '11x5rx5z5',
  'lo2_rx_fs6z5': '11x5rx6z5',
  'lo2_rx_fs7z5': '11x5rx7z5',
  'lo2_rx_fs8z5': '11x5rx8z5',
  'lo2_rx_ds1z1': '11x5rxds1z1',
  'lo2_rx_ds2z2': '11x5rxds2z2',
  'lo2_rx_ds3z3': '11x5rxds3z3',
  'lo2_rx_ds4z4': '11x5rxds4z4',
  'lo2_rx_ds5z5': '11x5rxds5z5',
  'lo2_rx_ds6z5': '11x5rxds6z5',
  'lo2_rx_ds7z5': '11x5rxds7z5',
  'lo2_rx_ds8z5': '11x5rxds8z5',
  //
  'lo2_dt_2z2': '11x5dt2z2',
  'lo2_dt_3z3': '11x5dt3z3',
  'lo2_dt_4z4': '11x5dt4z4',
  'lo2_dt_5z5': '11x5dt5z5',
  'lo2_dt_6z5': '11x5dt6z5',
  'lo2_dt_7z5': '11x5dt7z5',
  'lo2_dt_8z5': '11x5dt8z5',
  //
  'lo2_qw_dds': '11x5dds',
  'lo2_qw_czw': '11x5czw'
}

export const viewData = {
  /** 十一选五 **/
  'lo2_3x_q3fs': {
    'name': '三码 直选 复式',
    'row': ['d1w', 'd2w', 'd3w'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_3x_z3fs': {
    'name': '三码 直选 复式',
    'row': ['d2w', 'd3w', 'd4w'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_3x_h3fs': {
    'name': '三码 直选 复式',
    'row': ['d3w', 'd4w', 'd5w'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_3x_q3ds': {
    'name': '三码 直选 单式'
  },
  'lo2_3x_z3ds': {
    'name': '三码 直选 单式'
  },
  'lo2_3x_h3ds': {
    'name': '三码 直选 单式'
  },
  'lo2_3x_zuq3fs': {
    'name': '三码 组选 前三复式',
    'row': ['xh'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_3x_zuz3fs': {
    'name': '三码 组选 中三复式',
    'row': ['xh'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_3x_zuh3fs': {
    'name': '三码 组选 后三复式',
    'row': ['xh'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_3x_zuq3dt': {
    'name': '三星 直选 前三拖胆',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        Maxchoose: 2,
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false,
            disable: false
          }
        })
      }]
    }
  },
  'lo2_3x_zuz3dt': {
    'name': '三星 直选 中三拖胆',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        Maxchoose: 2,
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false,
            disable: false
          }
        })
      }]
    }
  },
  'lo2_3x_zuh3dt': {
    'name': '三星 直选 后三拖胆',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        Maxchoose: 2,
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false,
            disable: false
          }
        })
      }]
    }
  },
  // 二码
  'lo2_2x_q2fs': {
    'name': '二码 直选 复式',
    'row': ['d1w', 'd2w'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_2x_h2fs': {
    'name': '二码 直选 复式',
    'row': ['d4w', 'd5w'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_2x_q2ds': {
    'name': '二码 直选 前二单式'
  },
  'lo2_2x_h2ds': {
    'name': '二码 直选 后儿单式'
  },
  'lo2_2x_zuq2fs': {
    'name': '二码 组选 前二复式',
    'row': ['xh'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_2x_zuh2fs': {
    'name': '二码 组选 后二复式',
    'row': ['xh'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_2x_zuq2dt': {
    'name': '二星 组选 前二拖胆',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        Maxchoose: 2,
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false,
            disable: false
          }
        })
      }]
    }
  },
  'lo2_2x_zuh2dt': {
    'name': '二星 组选 后二拖胆',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        Maxchoose: 2,
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false,
            disable: false
          }
        })
      }]
    }
  },
  // 定位胆
  'lo2_1x_1x': {
    'name': '定位胆',
    'row': ['d1w', 'd2w', 'd3w', 'd4w', 'd5w'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  // 不定位
  'lo2_bd_q3w': {
    'name': '不定位 前三位',
    'row': ['xh'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_bd_z3w': {
    'name': '不定位 中三位',
    'row': ['xh'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_bd_h3w': {
    'name': '不定位 后三位',
    'row': ['xh'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  // 任选
  'lo2_rx_fs1z1': {
    'name': '任选 复式 一中一',
    'row': ['1z1'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_rx_fs2z2': {
    'name': '任选 复式 二中二',
    'row': ['2z2'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_rx_fs3z3': {
    'name': '任选 复式 三中三',
    'row': ['3z3'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_rx_fs4z4': {
    'name': '任选 复式 四中四',
    'row': ['4z4'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_rx_fs5z5': {
    'name': '任选 复式 五中五',
    'row': ['5z5'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_rx_fs6z5': {
    'name': '任选 复式 六中五',
    'row': ['6z5'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_rx_fs7z5': {
    'name': '任选 复式 七中五',
    'row': ['7z5'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_rx_fs8z5': {
    'name': '任选 复式 八中五',
    'row': ['8z5'],
    'ball_num': '1~11',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo2_rx_ds1z1': {
    'name': '任选 单式 一中一'
  },
  'lo2_rx_ds2z2': {
    'name': '任选 单式 二中二'
  },
  'lo2_rx_ds3z3': {
    'name': '任选 单式 三中三'
  },
  'lo2_rx_ds4z4': {
    'name': '任选 单式 四中四'
  },
  'lo2_rx_ds5z5': {
    'name': '任选 单式 五中五'
  },
  'lo2_rx_ds6z5': {
    'name': '任选 单式 六中五'
  },
  'lo2_rx_ds7z5': {
    'name': '任选 单式 七中五'
  },
  'lo2_rx_ds8z5': {
    'name': '任选 单式 八中五'
  },
  // 任选 拖胆
  'lo2_dt_2z2': {
    name: '胆拖 任选 二中二',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        chooseOne: true,
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false,
            disable: false
          }
        })
      }]
    }
  },
  'lo2_dt_3z3': {
    name: '胆拖 任选 三中三',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        Maxchoose: 2,
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false,
            disable: false
          }
        })
      }]
    }
  },
  'lo2_dt_4z4': {
    name: '胆拖 任选 四中四',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        Maxchoose: 3,
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false,
            disable: false
          }
        })
      }]
    }
  },
  'lo2_dt_5z5': {
    name: '胆拖 任选 五中五',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        Maxchoose: 4,
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false,
            disable: false
          }
        })
      }]
    }
  },
  'lo2_dt_6z5': {
    name: '胆拖 任选 六中五',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        Maxchoose: 5,
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false,
            disable: false
          }
        })
      }]
    }
  },
  'lo2_dt_7z5': {
    name: '胆拖 任选 七中五',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        Maxchoose: 6,
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false,
            disable: false
          }
        })
      }]
    }
  },
  'lo2_dt_8z5': {
    name: '胆拖 任选 八中五',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        Maxchoose: 7,
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(1, 12).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false,
            disable: false
          }
        })
      }]
    }
  },
  // 趣味
  'lo2_qw_dds': {
    'name': '趣味 定单双',
    'row': ['dds'],
    'ball_num': ['5d0s', '4d1s', '3d2s', '2d3s', '1d4s', '0d5s']
  },
  'lo2_qw_czw': {
    'name': '趣味 猜中位',
    'row': ['czw'],
    'ball_num': '3~9',
    'ball_bit': 2,
    'ball_key': true
  }
}
