import _ from 'lodash'
// 时时彩
export const navBar = [
  {
    code: 'lo1_5x',
    name: '五星',
    subnav: [
      {
        title: '直选',
        play: [
          {code: 'lo1_5x_fs', name: '复式'},
          {code: 'lo1_5x_ds', name: '单式'},
          {code: 'lo1_5x_zh', name: '组合'}
        ]
      },
      {
        title: '组选',
        play: [
          {code: 'lo1_5x_120', name: '组选120'},
          {code: 'lo1_5x_60', name: '组选60'},
          {code: 'lo1_5x_30', name: '组选30'},
          {code: 'lo1_5x_20', name: '组选20'},
          {code: 'lo1_5x_10', name: '组选10'},
          {code: 'lo1_5x_5', name: '组选5'}
        ]
      }
    ]
  },
  {
    code: 'lo1_q4',
    name: '前四',
    subnav: [
      {
        title: '直选',
        play: [
          {code: 'lo1_q4_fs', name: '复式'},
          {code: 'lo1_q4_ds', name: '单式'},
          {code: 'lo1_q4_zh', name: '组合'}
        ]
      },
      {
        title: '组选',
        play: [
          {code: 'lo1_q4_24', name: '组选24'},
          {code: 'lo1_q4_12', name: '组选12'},
          {code: 'lo1_q4_6', name: '组选6'},
          {code: 'lo1_q4_4', name: '组选4'}
        ]
      }
    ]
  },
  {
    code: 'lo1_h4',
    name: '后四',
    subnav: [
      {
        title: '直选',
        play: [
          {code: 'lo1_h4_fs', name: '复式'},
          {code: 'lo1_h4_ds', name: '单式'},
          {code: 'lo1_h4_zh', name: '组合'}
        ]
      },
      {
        title: '组选',
        play: [
          {code: 'lo1_h4_24', name: '组选24'},
          {code: 'lo1_h4_12', name: '组选12'},
          {code: 'lo1_h4_6', name: '组选6'},
          {code: 'lo1_h4_4', name: '组选4'}
        ]
      }
    ]
  },
  {
    code: 'lo1_q3',
    name: '前三',
    subnav: [
      {
        title: '直选',
        play: [
          {code: 'lo1_q3_fs', name: '复式'},
          {code: 'lo1_q3_ds', name: '单式'}
        ]
      },
      {
        title: '组选',
        play: [
          {code: 'lo1_q3_3', name: '组三'},
          {code: 'lo1_q3_z3td', name: '组三胆拖'},
          {code: 'lo1_q3_6', name: '组六'},
          {code: 'lo1_q3_z6td', name: '组六胆拖'},
          {code: 'lo1_q3_hh', name: '混合组选'}
        ]
      }
    ]
  },
  {
    code: 'lo1_z3',
    name: '中三',
    subnav: [
      {
        title: '直选',
        play: [
          {code: 'lo1_z3_fs', name: '复式'},
          {code: 'lo1_z3_ds', name: '单式'}
        ]
      },
      {
        title: '组选',
        play: [
          {code: 'lo1_z3_3', name: '组三'},
          {code: 'lo1_z3_z3td', name: '组三胆拖'},
          {code: 'lo1_z3_6', name: '组六'},
          {code: 'lo1_z3_z6td', name: '组六胆拖'},
          {code: 'lo1_z3_hh', name: '混合组选'}
        ]
      }
    ]
  },
  {
    code: 'lo1_h3',
    name: '后三',
    subnav: [
      {
        title: '直选',
        play: [
          {code: 'lo1_h3_fs', name: '复式'},
          {code: 'lo1_h3_ds', name: '单式'}
        ]
      },
      {
        title: '组选',
        play: [
          {code: 'lo1_h3_3', name: '组三'},
          {code: 'lo1_h3_z3td', name: '组三胆拖'},
          {code: 'lo1_h3_6', name: '组六'},
          {code: 'lo1_h3_z6td', name: '组六胆拖'},
          {code: 'lo1_h3_hh', name: '混合组选'}
        ]
      }
    ]
  },
  {
    code: 'lo1_2x',
    name: '二星',
    subnav: [
      {
        title: '直选',
        play: [
          {code: 'lo1_2x_q2fs', name: '前二复式'},
          {code: 'lo1_2x_q2ds', name: '前二单式'},
          {code: 'lo1_2x_h2fs', name: '后二复式'},
          {code: 'lo1_2x_h2ds', name: '后二单式'}
        ]
      },
      {
        title: '组选',
        play: [
          {code: 'lo1_2x_zuq2fs', name: '前二复式'},
          {code: 'lo1_2x_zuq2ds', name: '前二单式'},
          {code: 'lo1_2x_zuh2fs', name: '后二复式'},
          {code: 'lo1_2x_zuh2ds', name: '后二单式'}
        ]
      }
    ]
  },
  {
    code: 'lo1_1x',
    name: '定位胆',
    subnav: [
      {
        title: '定位胆',
        play: [
          {code: 'lo1_1x_1x', name: '定位胆'}
        ]
      }
    ]
  },
  {
    code: 'lo1_bd',
    name: '不定位',
    subnav: [
      {
        title: '不定位',
        play: [
          {code: 'lo1_bd_q31m', name: '前三一码'},
          {code: 'lo1_bd_q32m', name: '前三二码'},
          {code: 'lo1_bd_z31m', name: '中三一码'},
          {code: 'lo1_bd_z32m', name: '中三二码'},
          {code: 'lo1_bd_h31m', name: '后三一码'},
          {code: 'lo1_bd_h32m', name: '后三二码'}
        ]
      },
      {
        title: '不定位',
        play: [
          {code: 'lo1_bd_wx1m', name: '五星一码'},
          {code: 'lo1_bd_wx2m', name: '五星二码'},
          {code: 'lo1_bd_wx3m', name: '五星三码'},
          {code: 'lo1_bd_2mjz', name: '二码计重'},
          {code: 'lo1_bd_3mjz', name: '三码计重'}
        ]
      }
    ]
  },
  {
    code: 'lo1_kd',
    name: '跨度',
    subnav: [
      {
        title: '跨度',
        play: [
          {code: 'lo1_kd_q3kd', name: '前三跨度'},
          {code: 'lo1_kd_z3kd', name: '中三跨度'},
          {code: 'lo1_kd_h3kd', name: '后三跨度'},
          {code: 'lo1_kd_q2kd', name: '前二跨度'},
          {code: 'lo1_kd_h2kd', name: '后二跨度'}
        ]
      }
    ]
  },
  {
    code: 'lo1_rx',
    name: '任选',
    subnav: [
      {
        title: '任四',
        play: [
          {code: 'lo1_rx_r4fs', name: '复式'},
          {code: 'lo1_rx_r4ds', name: '单式'}
        ]
      },
      {
        title: '任三',
        play: [
          {code: 'lo1_rx_r3fs', name: '复式'},
          {code: 'lo1_rx_r3ds', name: '单式'},
          {code: 'lo1_rx_r3z3', name: '组三'},
          {code: 'lo1_rx_r3z6', name: '组六'},
          {code: 'lo1_rx_r3hh', name: '混合'}
        ]
      },
      {
        title: '任二',
        play: [
          {code: 'lo1_rx_r2fs', name: '复式'},
          {code: 'lo1_rx_r2ds', name: '单式'},
          {code: 'lo1_rx_r2zx', name: '组选'}
        ]
      }
    ]
  },
  {
    code: 'lo1_dxds',
    name: '大小单双',
    subnav: [
      {
        title: '大小单双',
        play: [
          {code: 'lo1_dxds_q2', name: '前二'},
          {code: 'lo1_dxds_h2', name: '后二'},
          {code: 'lo1_dxds_hz', name: '和值'}
        ]
      }
    ]
  },
  {
    code: 'lo1_hz',
    name: '和值',
    subnav: [
      {
        title: '直选',
        play: [
          {code: 'lo1_hz_zhixqs', name: '前三'},
          {code: 'lo1_hz_zhixzs', name: '中三'},
          {code: 'lo1_hz_zhixhs', name: '后三'},
          {code: 'lo1_hz_zhixqe', name: '前二'},
          {code: 'lo1_hz_zhixhe', name: '后二'}
        ]
      },
      {
        title: '组选',
        play: [
          {code: 'lo1_hz_zuxqs', name: '前三'},
          {code: 'lo1_hz_zuxzs', name: '中三'},
          {code: 'lo1_hz_zuxhs', name: '后三'}
        ]
      }, {
        title: '尾数',
        play: [
          {code: 'lo1_hz_wsqs', name: '前三'},
          {code: 'lo1_hz_wszs', name: '中三'},
          {code: 'lo1_hz_wshs', name: '后三'}
        ]
      }
    ]
  },
  {
    code: 'lo1_qw',
    name: '趣味',
    subnav: [
      {
        title: '趣味',
        play: [
          {code: 'lo1_qw_yffs', name: '一帆风顺'},
          {code: 'lo1_qw_hscs', name: '好事成双'},
          {code: 'lo1_qw_sxbx', name: '三星报喜'},
          {code: 'lo1_qw_sjfc', name: '四季发财'}
        ]
      },
      {
        title: '龙虎',
        play: [
          {code: 'lo1_lh_wq', name: '万千'},
          {code: 'lo1_lh_wb', name: '万百'},
          {code: 'lo1_lh_ws', name: '万十'},
          {code: 'lo1_lh_wg', name: '万个'},
          {code: 'lo1_lh_qb', name: '千百'},
          {code: 'lo1_lh_qs', name: '千十'},
          {code: 'lo1_lh_qg', name: '千个'},
          {code: 'lo1_lh_bs', name: '百十'},
          {code: 'lo1_lh_bg', name: '百个'},
          {code: 'lo1_lh_sg', name: '十个'}
        ]
      },
      {
        title: '和',
        play: [
          {code: 'lo1_h_wq', name: '万千'},
          {code: 'lo1_h_wb', name: '万百'},
          {code: 'lo1_h_ws', name: '万十'},
          {code: 'lo1_h_wg', name: '万个'},
          {code: 'lo1_h_qb', name: '千百'},
          {code: 'lo1_h_qs', name: '千十'},
          {code: 'lo1_h_qg', name: '千个'},
          {code: 'lo1_h_bs', name: '百十'},
          {code: 'lo1_h_bg', name: '百个'},
          {code: 'lo1_h_sg', name: '十个'}
        ]
      }
    ]
  }
]

export const codeMap = {
  'lo1_5x_fs': 'wxzhixfs',
  'lo1_5x_ds': 'wxzhixds',
  'lo1_5x_zh': 'wxzhixzh',
  'lo1_5x_120': 'wxzxyel',
  'lo1_5x_60': 'wxzxls',
  'lo1_5x_30': 'wxzxsl',
  'lo1_5x_20': 'wxzxel',
  'lo1_5x_10': 'wxzxyl',
  'lo1_5x_5': 'wxzxw',
  // 前四
  'lo1_q4_fs': 'sixzhixfsq',
  'lo1_q4_ds': 'sixzhixdsq',
  'lo1_q4_zh': 'sixzhixzhq',
  'lo1_q4_24': 'qsizxes',
  'lo1_q4_12': 'qsizxye',
  'lo1_q4_6': 'qsizxl',
  'lo1_q4_4': 'qsizxs',
  // 后四
  'lo1_h4_fs': 'sixzhixfsh',
  'lo1_h4_ds': 'sixzhixdsh',
  'lo1_h4_zh': 'sixzhixzhh',
  'lo1_h4_24': 'hsizxes',
  'lo1_h4_12': 'hsizxye',
  'lo1_h4_6': 'hsizxl',
  'lo1_h4_4': 'hsizxs',
  // 前三
  'lo1_q3_fs': 'sxzhixfsq',
  'lo1_q3_ds': 'sxzhixdsq',
  'lo1_q3_3': 'sxzuxzsq',
  'lo1_q3_z3td': 'sxzuxzsdtq',
  'lo1_q3_6': 'sxzuxzlq',
  'lo1_q3_z6td': 'sxzuxzldtq',
  'lo1_q3_hh': 'sxhhzxq',
  // 中三
  'lo1_z3_fs': 'sxzhixfsz',
  'lo1_z3_ds': 'sxzhixdsz',
  'lo1_z3_3': 'sxzuxzsz',
  'lo1_z3_z3td': 'sxzuxzsdtz',
  'lo1_z3_6': 'sxzuxzlz',
  'lo1_z3_z6td': 'sxzuxzldtz',
  'lo1_z3_hh': 'sxhhzxz',
  // 后三
  'lo1_h3_fs': 'sxzhixfsh',
  'lo1_h3_ds': 'sxzhixdsh',
  'lo1_h3_3': 'sxzuxzsh',
  'lo1_h3_z3td': 'sxzuxzsdth',
  'lo1_h3_6': 'sxzuxzlh',
  'lo1_h3_z6td': 'sxzuxzldth',
  'lo1_h3_hh': 'sxhhzxh',
  // 二星
  'lo1_2x_q2fs': 'exzhixfsq',
  'lo1_2x_q2ds': 'exzhixdsq',
  'lo1_2x_h2ds': 'exzhixdsh',
  'lo1_2x_h2fs': 'exzhixfsh',
  'lo1_2x_zuq2fs': 'exzuxfsq',
  'lo1_2x_zuq2ds': 'exzuxdsq',
  'lo1_2x_zuh2fs': 'exzuxfsh',
  'lo1_2x_zuh2ds': 'exzuxdsh',
  // 定位胆
  'lo1_1x_1x': 'dweid',
  // 不定位
  'lo1_bd_h31m': 'bdwhs',
  'lo1_bd_h32m': 'bdwhsem',
  'lo1_bd_z31m': 'bdwzs',
  'lo1_bd_z32m': 'bdwzsem',
  'lo1_bd_q31m': 'bdwqs',
  'lo1_bd_q32m': 'bdwqsem',
  'lo1_bd_wx1m': 'bdw5x1m',
  'lo1_bd_wx2m': 'bdw5x2m',
  'lo1_bd_wx3m': 'bdw5x3m',
  'lo1_bd_2mjz': 'bdw2mjc',
  'lo1_bd_3mjz': 'bdw3mjc',
  // 跨度
  'lo1_kd_q3kd': 'kuaduqs',
  'lo1_kd_z3kd': 'kuaduzs',
  'lo1_kd_h3kd': 'kuaduhs',
  'lo1_kd_q2kd': 'kuaduqe',
  'lo1_kd_h2kd': 'kuaduhe',
  // 任选
  'lo1_rx_r4fs': 'rx4fs',
  'lo1_rx_r4ds': 'rx4ds',
  'lo1_rx_r3fs': 'rx3fs',
  'lo1_rx_r3ds': 'rx3ds',
  'lo1_rx_r3z3': 'rx3z3',
  'lo1_rx_r3z6': 'rx3z6',
  'lo1_rx_r3hh': 'rx3zxhh',
  'lo1_rx_r2fs': 'rx2fs',
  'lo1_rx_r2ds': 'rx2ds',
  'lo1_rx_r2zx': 'rx2zx',
  // 大小单双
  'lo1_dxds_q2': 'dxdsqe',
  'lo1_dxds_h2': 'dxdshe',
  'lo1_dxds_hz': 'dxdshz',
  // 和值
  'lo1_hz_zhixqs': 'zhixhzqs',
  'lo1_hz_zhixzs': 'zhixhzzs',
  'lo1_hz_zhixhs': 'zhixhzhs',
  'lo1_hz_zhixqe': 'zhixhzqe',
  'lo1_hz_zhixhe': 'zhixhzhe',
  'lo1_hz_zuxqs': 'zuxhzqs',
  'lo1_hz_zuxzs': 'zuxhzzs',
  'lo1_hz_zuxhs': 'zuxhzhs',
  'lo1_hz_wsqs': 'hzwsqs',
  'lo1_hz_wszs': 'hzwszs',
  'lo1_hz_wshs': 'hzwshs',
  // 趣味
  'lo1_qw_yffs': 'qwyffs',
  'lo1_qw_hscs': 'qwhscs',
  'lo1_qw_sxbx': 'qwsxbx',
  'lo1_qw_sjfc': 'qwsjfc',
  // 龙虎
  'lo1_lh_wq': 'lhwq',
  'lo1_lh_wb': 'lhwb',
  'lo1_lh_ws': 'lhws',
  'lo1_lh_wg': 'lhwg',
  'lo1_lh_qb': 'lhqb',
  'lo1_lh_qs': 'lhqs',
  'lo1_lh_qg': 'lhqg',
  'lo1_lh_bs': 'lhbs',
  'lo1_lh_bg': 'lhbg',
  'lo1_lh_sg': 'lhsg',
  'lo1_h_wq': 'hwq',
  'lo1_h_wb': 'hwb',
  'lo1_h_ws': 'hws',
  'lo1_h_wg': 'hwg',
  'lo1_h_qb': 'hqb',
  'lo1_h_qs': 'hqs',
  'lo1_h_qg': 'hqg',
  'lo1_h_bs': 'hbs',
  'lo1_h_bg': 'hbg',
  'lo1_h_sg': 'hsg'
}

export const viewData = {
  'lo1_5x_fs': {
    // 名称
    'name': '五星 直选 复式',
    // 行数
    'row': ['ww', 'qw', 'bw', 'sw', 'gw'],
    // 数字范围
    'ball_num': '0~9',
    // 位数
    'ball_bit': 1,
    // 快捷键
    'ball_key': true
  },
  'lo1_5x_ds': {
    'name': '五星 直选 单式'
  },
  'lo1_5x_zh': {
    // 名称
    'name': '五星 直选 复式',
    // 行数
    'row': ['ww', 'qw', 'bw', 'sw', 'gw'],
    // 数字范围
    'ball_num': '0~9',
    // 位数
    'ball_bit': 1,
    // 快捷键
    'ball_key': true
  },
  'lo1_5x_120': {
    'name': '五星 组选 组选120',
    'row': ['xh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_5x_60': {
    'name': '五星 组选 组选60',
    'row': ['2ch', 'dh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_5x_30': {
    'name': '五星 组选 组选30',
    'row': ['2ch', 'dh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_5x_20': {
    'name': '五星 组选 组选20',
    'row': ['3ch', 'dh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_5x_10': {
    'name': '五星 组选 组选10',
    'row': ['3ch', '2ch'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_5x_5': {
    'name': '五星 组选 组选5',
    'row': ['4ch', 'dh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  // 前四
  'lo1_q4_fs': {
    'name': '前四 直选 复式',
    'row': ['ww', 'qw', 'bw', 'sw'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_q4_ds': {
    'name': '前四 直选 单式'
  },
  'lo1_q4_zh': {
    'name': '前四 直选 组合',
    'row': ['ww', 'qw', 'bw', 'sw'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_q4_24': {
    'name': '前四 组选 组选24',
    'row': ['xh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_q4_12': {
    'name': '前四 组选 组选12',
    'row': ['2ch', 'dh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_q4_6': {
    'name': '前四 组选 组选6',
    'row': ['2ch'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_q4_4': {
    'name': '前四 组选 组选4',
    'row': ['3ch', 'dh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  // 后四
  'lo1_h4_fs': {
    'name': '后四 直选 复式',
    'row': ['qw', 'bw', 'sw', 'gw'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_h4_ds': {
    'name': '后四 直选 单式'
  },
  'lo1_h4_zh': {
    'name': '后四 直选 组合',
    'row': ['qw', 'bw', 'sw', 'gw'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_h4_24': {
    'name': '后四 组选 组选24',
    'row': ['xh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_h4_12': {
    'name': '后四 组选 组选12',
    'row': ['2ch', 'dh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_h4_6': {
    'name': '后四 组选 组选6',
    'row': ['2ch'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_h4_4': {
    'name': '后四 组选 组选4',
    'row': ['3ch', 'dh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  // 前三
  'lo1_q3_fs': {
    'name': '前三 直选 复式',
    'row': ['ww', 'qw', 'bw'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_q3_ds': {
    'name': '前三 直选 单式'
  },
  'lo1_q3_hz': {
    'name': '前三 直选 和值',
    'row': ['xh'],
    'ball_num': '0~27',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_q3_3': {
    'name': '前三 组选 组三',
    'row': ['zu3'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_q3_z3td': {
    'name': '前三 组选 组三胆拖',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        chooseOne: true,
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
            choose: false,
            disable: false
          }
        })
      }]
    }
  },
  'lo1_q3_6': {
    'name': '前三 组选 组六',
    'row': ['zu6'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_q3_z6td': {
    'name': '前六 组选 组六胆拖',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        title: '胆码',
        Maxchoose: 2,
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
            choose: false,
            disable: false
          }
        })
      }]
    }
  },
  'lo1_q3_hh': {
    'name': '前三 组选 混合组选'
  },
  // 中三
  'lo1_z3_fs': {
    'name': '中三 直选 复式',
    'row': ['qw', 'bw', 'sw'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_z3_ds': {
    'name': '中三 直选 单式'
  },
  'lo1_z3_3': {
    'name': '中三 组选 组三',
    'row': ['zu3'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_z3_z3td': {
    'name': '中三 组选 组三胆拖',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        chooseOne: true,
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
            choose: false,
            disable: false
          }
        })
      }]
    }
  },
  'lo1_z3_6': {
    'name': '中三 组选 组六',
    'row': ['zu6'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_z3_z6td': {
    'name': '中六 组选 组六胆拖',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        title: '胆码',
        Maxchoose: 2,
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
            choose: false,
            disable: false
          }
        })
      }]
    }
  },
  'lo1_z3_hh': {
    'name': '中三 组选 混合组选'
  },
  // 后三
  'lo1_h3_fs': {
    'name': '后三 直选 复式',
    'row': ['bw', 'sw', 'gw'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_h3_ds': {
    'name': '后三 直选 单式'
  },
  'lo1_h3_hz': {
    'name': '后三 直选 和值',
    'row': ['xh'],
    'ball_num': '0~27',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_h3_3': {
    'name': '后三 组选 组三',
    'row': ['zu3'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_h3_z3td': {
    'name': '后三 组选 组三胆拖',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        chooseOne: true,
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
            choose: false,
            disable: false
          }
        })
      }]
    }
  },
  'lo1_h3_6': {
    'name': '后三 组选 组六',
    'row': ['zu6'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_h3_z6td': {
    'name': '后六 组选 组六胆拖',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        title: '胆码',
        Maxchoose: 2,
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
            choose: false,
            disable: false
          }
        })
      }]
    }
  },
  'lo1_h3_hh': {
    'name': '后三 组选 混合组选'
  },
  // 二星
  'lo1_2x_q2fs': {
    'name': '前二 直选 复式',
    'row': ['ww', 'qw'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_2x_q2ds': {
    'name': '前二 直选 单式'
  },
  'lo1_2x_h2fs': {
    'name': '后二 直选 复式',
    'row': ['sw', 'gw'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_2x_h2ds': {
    'name': '后二 直选 单式'
  },
  'lo1_2x_zuh2fs': {
    'name': '后二 组选 复式',
    'row': ['zux'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_2x_zuh2ds': {
    'name': '后二 组选 单式'
  },
  'lo1_2x_zuq2fs': {
    'name': '前二 组选 复式',
    'row': ['zux'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_2x_zuq2ds': {
    'name': '前二 组选 单式'
  },
  // 一星
  'lo1_1x_1x': {
    'name': '定位胆',
    'row': ['ww', 'qw', 'bw', 'sw', 'gw'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  // 不定位
  'lo1_bd_q31m': {
    'name': '不定位 前三一码',
    'row': ['bdd'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_bd_q32m': {
    'name': '不定位 前三二码',
    'row': ['bdd'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_bd_z31m': {
    'name': '不定位 中三一码',
    'row': ['bdd'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_bd_z32m': {
    'name': '不定位 中三二码',
    'row': ['bdd'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_bd_h31m': {
    'name': '不定位 后三一码',
    'row': ['bdd'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_bd_h32m': {
    'name': '不定位 后三二码',
    'row': ['bdd'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_bd_wx1m': {
    'name': '不定位 五星一码',
    'row': ['wxym'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_bd_wx2m': {
    'name': '不定位 五星二码',
    'row': ['wxem'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_bd_wx3m': {
    'name': '不定位 五星三码',
    'row': ['wxsm'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_bd_2mjz': {
    'name': '不定位 二码计重',
    'row': ['emjz'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_bd_3mjz': {
    'name': '不定位 三码计重',
    'row': ['smjz'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  // 跨度
  'lo1_kd_q3kd': {
    'name': '跨度 前三跨度',
    'row': ['xh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_kd_z3kd': {
    'name': '跨度 中三跨度',
    'row': ['xh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_kd_h3kd': {
    'name': '跨度 后三跨度',
    'row': ['xh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_kd_q2kd': {
    'name': '跨度 前二跨度',
    'row': ['xh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_kd_h2kd': {
    'name': '跨度 后二跨度',
    'row': ['xh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  // 任选
  'lo1_rx_r2fs': {
    'name': '任选 任二 复式',
    'row': ['ww', 'qw', 'bw', 'sw', 'gw'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_rx_r2ds': {
    'name': '任选 任二 单式',
    bitMax: 2,
    'bit': [
      {position: 'ww', name: '万位', 'choose': true},
      {position: 'qw', name: '千位', 'choose': true},
      {position: 'bw', name: '百位', 'choose': false},
      {position: 'sw', name: '十位', 'choose': false},
      {position: 'gw', name: '个位', 'choose': false}
    ]
  },
  'lo1_rx_r2zx': {
    'name': '任选 任二 组选',
    'row': ['xh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true,
    bitMax: 2,
    'bit': [
      {position: 'ww', name: '万位', 'choose': true},
      {position: 'qw', name: '千位', 'choose': true},
      {position: 'bw', name: '百位', 'choose': false},
      {position: 'sw', name: '十位', 'choose': false},
      {position: 'gw', name: '个位', 'choose': false}
    ]
  },
  'lo1_rx_r3fs': {
    'name': '任选 任三 复式',
    'row': ['ww', 'qw', 'bw', 'sw', 'gw'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_rx_r3ds': {
    'name': '任选 任三 单式',
    bitMax: 3,
    'bit': [
      {position: 'ww', name: '万位', 'choose': true},
      {position: 'qw', name: '千位', 'choose': true},
      {position: 'bw', name: '百位', 'choose': true},
      {position: 'sw', name: '十位', 'choose': false},
      {position: 'gw', name: '个位', 'choose': false}
    ]
  },
  'lo1_rx_r3z3': {
    'name': '任选 任三 组三',
    'row': ['xh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true,
    bitMax: 3,
    'bit': [
      {position: 'ww', name: '万位', 'choose': true},
      {position: 'qw', name: '千位', 'choose': true},
      {position: 'bw', name: '百位', 'choose': true},
      {position: 'sw', name: '十位', 'choose': false},
      {position: 'gw', name: '个位', 'choose': false}
    ]
  },
  'lo1_rx_r3z6': {
    'name': '任选 任三 组六',
    'row': ['xh'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true,
    bitMax: 3,
    'bit': [
      {position: 'ww', name: '万位', 'choose': true},
      {position: 'qw', name: '千位', 'choose': true},
      {position: 'bw', name: '百位', 'choose': true},
      {position: 'sw', name: '十位', 'choose': false},
      {position: 'gw', name: '个位', 'choose': false}
    ]
  },
  'lo1_rx_r3hh': {
    'name': '任选 任三 混合组选',
    bitMax: 3,
    'bit': [
      {position: 'ww', name: '万位', 'choose': true},
      {position: 'qw', name: '千位', 'choose': true},
      {position: 'bw', name: '百位', 'choose': true},
      {position: 'sw', name: '十位', 'choose': false},
      {position: 'gw', name: '个位', 'choose': false}
    ]
  },
  'lo1_rx_r4fs': {
    'name': '任选 任四 复式',
    'row': ['ww', 'qw', 'bw', 'sw', 'gw'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_rx_r4ds': {
    'name': '任选 任四 单式',
    bitMax: 4,
    'bit': [
      {position: 'ww', name: '万位', 'choose': true},
      {position: 'qw', name: '千位', 'choose': true},
      {position: 'bw', name: '百位', 'choose': true},
      {position: 'sw', name: '十位', 'choose': true},
      {position: 'gw', name: '个位', 'choose': false}
    ]
  },
  // 大小单双
  'lo1_dxds_q2': {
    'name': '大小单双 前二',
    'row': ['ww', 'qw'],
    'ball_num': ['da', 'xiao', 'dan', 'shuang'],
    'ball_bit': 1
  },
  'lo1_dxds_h2': {
    'name': '大小单双 后二',
    'row': ['sw', 'gw'],
    'ball_num': ['da', 'xiao', 'dan', 'shuang'],
    'ball_bit': 1
  },
  'lo1_dxds_hz': {
    'name': '大小单双 和值',
    'row': ['hzzx'],
    'ball_num': ['da', 'xiao', 'dan', 'shuang'],
    'ball_bit': 1
  },
  // 和值
  'lo1_hz_zhixqs': {
    'name': '和值 直选 前三',
    'row': ['qszx'],
    'ball_num': '0~27',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_hz_zhixzs': {
    'name': '和值 直选 中三',
    'row': ['zszx'],
    'ball_num': '0~27',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_hz_zhixhs': {
    'name': '和值 直选 后三',
    'row': ['hszx'],
    'ball_num': '0~27',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_hz_zhixqe': {
    'name': '和值 直选 前二',
    'row': ['qezx'],
    'ball_num': '0~18',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_hz_zhixhe': {
    'name': '和值 直选 后二',
    'row': ['hezx'],
    'ball_num': '0~18',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_hz_zuxqs': {
    'name': '和值 组选 前三',
    'row': ['qszux'],
    'ball_num': '1~26',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_hz_zuxzs': {
    'name': '和值 组选 中三',
    'row': ['zszux'],
    'ball_num': '1~26',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_hz_zuxhs': {
    'name': '和值 组选 后三',
    'row': ['hszux'],
    'ball_num': '1~26',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_hz_wsqs': {
    'name': '和值 组选 前三',
    'row': ['qsws'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_hz_wszs': {
    'name': '和值 组选 中三',
    'row': ['zsws'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_hz_wshs': {
    'name': '和值 组选 后三',
    'row': ['hsws'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  // 趣味
  'lo1_qw_yffs': {
    'name': '趣味 特殊 一帆风顺',
    'row': ['yffs'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_qw_hscs': {
    'name': '趣味 特殊 好事成双',
    'row': ['hscs'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_qw_sxbx': {
    'name': '趣味 特殊 三星报喜',
    'row': ['sxbx'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  'lo1_qw_sjfc': {
    'name': '趣味 特殊 四季发财',
    'row': ['sjfc'],
    'ball_num': '0~9',
    'ball_bit': 1,
    'ball_key': true
  },
  // 龙虎 和
  'lo1_lh_wq': {
    'name': '龙虎 万千',
    'row': ['lh'],
    'ball_num': ['long', 'hu']
  },
  'lo1_lh_wb': {
    'name': '龙虎 万百',
    'row': ['lh'],
    'ball_num': ['long', 'hu']
  },
  'lo1_lh_ws': {
    'name': '龙虎 万十',
    'row': ['lh'],
    'ball_num': ['long', 'hu']
  },
  'lo1_lh_wg': {
    'name': '龙虎 万个',
    'row': ['lh'],
    'ball_num': ['long', 'hu']
  },
  'lo1_lh_qb': {
    'name': '龙虎 千百',
    'row': ['lh'],
    'ball_num': ['long', 'hu']
  },
  'lo1_lh_qs': {
    'name': '龙虎 千十',
    'row': ['lh'],
    'ball_num': ['long', 'hu']
  },
  'lo1_lh_qg': {
    'name': '龙虎 千个',
    'row': ['lh'],
    'ball_num': ['long', 'hu']
  },
  'lo1_lh_bs': {
    'name': '龙虎 百十',
    'row': ['lh'],
    'ball_num': ['long', 'hu']
  },
  'lo1_lh_bg': {
    'name': '龙虎 百个',
    'row': ['lh'],
    'ball_num': ['long', 'hu']
  },
  'lo1_lh_sg': {
    'name': '龙虎 十个',
    'row': ['lh'],
    'ball_num': ['long', 'hu']
  },
  'lo1_h_wq': {
    'name': '和 万千',
    'row': ['he'],
    'ball_num': ['he']
  },
  'lo1_h_wb': {
    'name': '和 万百',
    'row': ['he'],
    'ball_num': ['he']
  },
  'lo1_h_ws': {
    'name': '和 万十',
    'row': ['he'],
    'ball_num': ['he']
  },
  'lo1_h_wg': {
    'name': '和 万个',
    'row': ['he'],
    'ball_num': ['he']
  },
  'lo1_h_qb': {
    'name': '和 千百',
    'row': ['he'],
    'ball_num': ['he']
  },
  'lo1_h_qs': {
    'name': '和 千十',
    'row': ['he'],
    'ball_num': ['he']
  },
  'lo1_h_qg': {
    'name': '和 千个',
    'row': ['he'],
    'ball_num': ['he']
  },
  'lo1_h_bs': {
    'name': '和 百十',
    'row': ['he'],
    'ball_num': ['he']
  },
  'lo1_h_bg': {
    'name': '和 百个',
    'row': ['he'],
    'ball_num': ['he']
  },
  'lo1_h_sg': {
    'name': '和 十个',
    'row': ['he'],
    'ball_num': ['he']
  }
}

export const rulesDoc = {}
