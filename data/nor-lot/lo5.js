import _ from 'lodash'

// 快乐十分
export const navBar = [
  {
    code: 'lo5_dwd',
    name: '定位胆',
    subnav: [
      {
        title: '定位胆',
        play: [
          {code: 'lo5_dwd_d1w', name: '第一位'},
          {code: 'lo5_dwd_d2w', name: '第二位'},
          {code: 'lo5_dwd_d3w', name: '第三位'},
          {code: 'lo5_dwd_d4w', name: '第四位'},
          {code: 'lo5_dwd_d5w', name: '第五位'},
          {code: 'lo5_dwd_d6w', name: '第六位'},
          {code: 'lo5_dwd_d7w', name: '第七位'},
          {code: 'lo5_dwd_d8w', name: '第八位'}
        ]
      }
    ]
  }, {
    code: 'lo5_rx',
    name: '任选',
    subnav: [
      {
        title: '任选',
        play: [
          {code: 'lo5_rx_1z1', name: '一中一'},
          {code: 'lo5_rx_2z2', name: '二中二'},
          {code: 'lo5_rx_3z3', name: '三中三'},
          {code: 'lo5_rx_4z4', name: '四中四'},
          {code: 'lo5_rx_5z5', name: '五中五'}
        ]
      }
    ]
  }, {
    code: 'lo5_dt',
    name: '胆拖',
    subnav: [
      {
        title: '胆拖',
        play: [
          {code: 'lo5_dt_2z2', name: '二中二'},
          {code: 'lo5_dt_3z3', name: '三中三'},
          {code: 'lo5_dt_4z4', name: '四中四'},
          {code: 'lo5_dt_5z5', name: '五中五'}
        ]
      }
    ]
  }, {
    code: 'lo5_sx',
    name: '三星',
    subnav: [
      {
        title: '直选',
        play: [
          {code: 'lo5_sx_zxqs', name: '前三'},
          {code: 'lo5_sx_zxhs', name: '后三'}
        ]
      },
      {
        title: '组选',
        play: [
          {code: 'lo5_sx_zuxqs', name: '前三'},
          {code: 'lo5_sx_zuxhs', name: '后三'}
        ]
      }
    ]
  },
  {
    code: 'lo5_ex',
    name: '二星',
    subnav: [
      {
        title: '二连',
        play: [
          {code: 'lo5_ex_zx', name: '直选'},
          {code: 'lo5_ex_zux', name: '组选'}
        ]
      }
    ]
  }
]

export const codeMap = {
  'lo5_dwd_d1w': 'kl10dwd1',
  'lo5_dwd_d2w': 'kl10dwd2',
  'lo5_dwd_d3w': 'kl10dwd3',
  'lo5_dwd_d4w': 'kl10dwd4',
  'lo5_dwd_d5w': 'kl10dwd5',
  'lo5_dwd_d6w': 'kl10dwd6',
  'lo5_dwd_d7w': 'kl10dwd7',
  'lo5_dwd_d8w': 'kl10dwd8',
  'lo5_rx_1z1': 'kl10rx1z1',
  'lo5_rx_2z2': 'kl10rx2z2',
  'lo5_rx_3z3': 'kl10rx3z3',
  'lo5_rx_4z4': 'kl10rx4z4',
  'lo5_rx_5z5': 'kl10rx5z5',
  'lo5_dt_2z2': 'kl10dt2z2',
  'lo5_dt_3z3': 'kl10dt3z3',
  'lo5_dt_4z4': 'kl10dt4z4',
  'lo5_dt_5z5': 'kl10dt5z5',
  'lo5_sx_zxqs': 'kl10qszx',
  'lo5_sx_zxhs': 'kl10hszx',
  'lo5_sx_zuxqs': 'kl10qszux',
  'lo5_sx_zuxhs': 'kl10hszux',
  'lo5_ex_zx': 'kl10elzx',
  'lo5_ex_zux': 'kl10elzux'
}

export const viewData = {
//
  'lo5_dwd_d1w': {
    name: '快乐十分 第一位',
    'row': ['d1w'],
    'ball_num': '1~20',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo5_dwd_d2w': {
    name: '快乐十分 第二位',
    'row': ['d2w'],
    'ball_num': '1~20',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo5_dwd_d3w': {
    name: '快乐十分 第三位',
    'row': ['d3w'],
    'ball_num': '1~20',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo5_dwd_d4w': {
    name: '快乐十分 第四位',
    'row': ['d4w'],
    'ball_num': '1~20',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo5_dwd_d5w': {
    name: '快乐十分 第五位',
    'row': ['d5w'],
    'ball_num': '1~20',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo5_dwd_d6w': {
    name: '快乐十分 第六位',
    'row': ['d6w'],
    'ball_num': '1~20',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo5_dwd_d7w': {
    name: '快乐十分 第七位',
    'row': ['d7w'],
    'ball_num': '1~20',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo5_dwd_d8w': {
    name: '快乐十分 第八位',
    'row': ['d8w'],
    'ball_num': '1~20',
    'ball_bit': 2,
    'ball_key': true
  },
  //
  'lo5_rx_1z1': {
    name: '快乐十分 一中一',
    'row': ['xh'],
    'ball_num': '1~20',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo5_rx_2z2': {
    name: '快乐十分 二中二',
    'row': ['xh'],
    'ball_num': '1~20',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo5_rx_3z3': {
    name: '快乐十分 三中三',
    'row': ['xh'],
    'ball_num': '1~20',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo5_rx_4z4': {
    name: '快乐十分 四中四',
    'row': ['xh'],
    'ball_num': '1~20',
    'ball_bit': 2,
    'ball_key': true
  },
  'lo5_rx_5z5': {
    name: '快乐十分 五中五',
    'row': ['xh'],
    'ball_num': '1~20',
    'ball_bit': 2,
    'ball_key': true
  },
  //
  'lo5_dt_2z2': {
    title: '二中二',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        Maxchoose: 1,
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(1, 21).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(1, 21).map((i) => {
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
  'lo5_dt_3z3': {
    title: '三中三',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        Maxchoose: 2,
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(1, 21).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(1, 21).map((i) => {
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
  'lo5_dt_4z4': {
    title: '四中四',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        Maxchoose: 3,
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(1, 21).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(1, 21).map((i) => {
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
  'lo5_dt_5z5': {
    title: '五中五',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        Maxchoose: 4,
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(1, 21).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(1, 21).map((i) => {
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
  //
  'lo5_sx_zxqs': {
    name: '快乐十分 前三',
    'ball_key': true,
    'ball_num': {
      layout: [{
        title: '第一名',
        balls: _.range(1, 21).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '第二名',
        balls: _.range(1, 21).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false,
            disable: false
          }
        })
      }, {
        title: '第三名',
        balls: _.range(1, 21).map((i) => {
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
  'lo5_sx_zxhs': {
    name: '快乐十分 后三',
    'ball_key': true,
    'ball_num': {
      layout: [{
        title: '第六名',
        balls: _.range(1, 21).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '第七名',
        balls: _.range(1, 21).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false,
            disable: false
          }
        })
      }, {
        title: '第八名',
        balls: _.range(1, 21).map((i) => {
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
  'lo5_sx_zuxqs': {
    name: '快乐十分 前三',
    'ball_key': true,
    'ball_num': {
      layout: [{
        title: '前三',
        balls: _.range(1, 21).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }]
    }
  },
  'lo5_sx_zuxhs': {
    name: '快乐十分 后三',
    'ball_key': true,
    'ball_num': {
      layout: [{
        title: '后三',
        balls: _.range(1, 21).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }]
    }
  },
  'lo5_ex_zx': {
    name: '快乐十分 直选',
    'row': ['xh'],
    'ball_key': true,
    'ball_num': {
      layout: [{
        title: '第一名',
        balls: _.range(1, 21).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '第二名',
        balls: _.range(1, 21).map((i) => {
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
  'lo5_ex_zux': {
    name: '快乐十分 组选',
    'ball_key': true,
    'ball_num': {
      layout: [{
        title: '二连组选',
        balls: _.range(1, 21).map((i) => {
          i = i >= 10 ? i : '0' + i
          return {
            ball: i,
            choose: false
          }
        })
      }]
    }
  }
}
