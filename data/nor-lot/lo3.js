import _ from 'lodash'
// 快3
export const navBar = [
  {
    code: 'lo3_hz',
    name: '和值',
    subnav: [
      {
        title: '和值',
        play: [
          {code: 'lo3_hz_hz', name: '直选'}
        ]
      }
    ]
  },
  {
    code: 'lo3_2t',
    name: '二同号',
    subnav: [
      {
        title: '二同号',
        play: [
          {code: 'lo3_2t_bz', name: '标准选号'},
          {code: 'lo3_2t_fx', name: '二同号复选'}
        ]
      }
    ]
  },
  {
    code: 'lo3_2b',
    name: '二不同号',
    subnav: [
      {
        title: '二不同号',
        play: [
          {code: 'lo3_2b_bz', name: '标准选号'},
          {code: 'lo3_2b_dt', name: '胆拖选号'}
        ]
      }
    ]
  },
  {
    code: 'lo3_3t',
    name: '三同号',
    subnav: [
      {
        title: '三同号',
        play: [
          {code: 'lo3_3t_dx', name: '三同号单选'},
          {code: 'lo3_3t_tx', name: '三同号通选'}
        ]
      }
    ]
  },
  {
    code: 'lo3_3b',
    name: '三不同号',
    subnav: [
      {
        title: '三不同号',
        play: [
          {code: 'lo3_3b_bz', name: '标准选号'},
          {code: 'lo3_3b_dt', name: '胆拖选号'}
        ]
      }
    ]
  },
  {
    code: 'lo3_3l',
    name: '三连号',
    subnav: [
      {
        title: '通选',
        play: [
          {code: 'lo3_3l_tx', name: '三连号通选'},
          {code: 'lo3_3l_dx', name: '三连号单选'}
        ]
      }
    ]
  }
]

export const codeMap = {
  'lo3_2b_bz': 'jsk3ebthbz',
  'lo3_2b_dt': 'jsk3ebthdt',
  //
  'lo3_2t_bz': 'jsk3ethdx',
  'lo3_2t_fx': 'jsk3ethfx',
  //
  'lo3_3b_bz': 'jsk3sbthbz',
  'lo3_3b_sd': 'sbthds',
  'lo3_3b_dt': 'jsk3sbthdt',
  //
  'lo3_3t_dx': 'jsk3sthdx',
  'lo3_3t_tx': 'jsk3sthtx',
  //
  'lo3_3l_tx': 'jsk3slhtx',
  'lo3_3l_dx': 'jsk3slhdx',
  //
  'lo3_hz_hz': 'jsk3hzzx'
}

export const viewData = {
  /** 快三 **/
  'lo3_2b_bz': {
    'name': '二不同号 标准选号',
    'row': ['xh'],
    'ball_num': '1~6',
    'ball_bit': 1
  },
  'lo3_2b_sd': {
    'name': '二不同号 手动选号'
  },
  'lo3_2b_dt': {
    'name': '二不同号 胆拖选号',
    'row': ['dm', 'tm'],
    'ball_num': '1~6',
    'ball_bit': 1
  },
  // 二同号
  'lo3_2t_bz': {
    'name': '二同号 标准选号',
    'row': ['eth', 'bth'],
    'ball_num': {
      layout: [
        {
          title: '二同号',
          balls: _.map(['11', '22', '33', '44', '55', '66'], function (i) {
            return {
              text: i,
              ball: i,
              choose: false
            }
          })
        }, {
          title: '不同号',
          balls: _.range(1, 7).map(function (i) {
            i = i >= 10 ? i : '0' + i
            return {
              ball: i,
              choose: false
            }
          })
        }
      ]
    },
    'ball_bit': 1
  },
  'lo3_2t_fx': {
    'name': '二同号 复选',
    'row': ['eth'],
    'ball_num': {
      layout: [{
        title: '二同号',
        balls: _.map(['11', '22', '33', '44', '55', '66'], (i) => {
          return {
            text: i + '*',
            ball: i,
            choose: false
          }
        })
      }]
    }
  },
  // 三不同号
  'lo3_3b_bz': {
    'name': '三不同号 标准选号',
    'row': ['xh'],
    'ball_num': '1~6',
    'ball_bit': 1
  },
  'lo3_3b_sd': {
    'name': '三不同号 手动选号'
  },
  'lo3_3b_dt': {
    'name': '三不同号 胆拖选号',
    'row': ['dm', 'tm'],
    'ball_num': {
      layout: [{
        Maxchoose: 2,
        title: '胆码',
        mutuallyExclusive: true,
        balls: _.range(1, 7).map((i) => {
          return {
            ball: i,
            choose: false
          }
        })
      }, {
        title: '拖码',
        mutuallyExclusive: true,
        balls: _.range(1, 7).map((i) => {
          return {
            ball: i,
            choose: false
          }
        })
      }]
    }
  },
  // 三同号
  'lo3_3t_dx': {
    'name': '三同号 单选',
    'row': ['hm'],
    'ball_num': {
      layout: [{
        title: '号码',
        balls: _.map(['111', '222', '333', '444', '555', '666'], (i) => {
          return {
            text: i,
            ball: i,
            choose: false
          }
        })
      }]
    }
  },
  'lo3_3t_tx': {
    'name': '三同号 通选',
    'row': ['dm'],
    chooseAll: true,
    'ball_num': {
      layout: [{
        title: '胆码',
        chooseAll: true,
        balls: _.map(['全'], (i) => {
          return {
            ball: i,
            choose: false
          }
        })
      }]
    }
  },
  // 三连号
  'lo3_3l_tx': {
    'name': '三连号 通选',
    'row': ['xh'],
    'ball_num': {
      layout: [{
        title: '通选',
        balls: _.map(['全'], (i) => {
          return {
            ball: i,
            choose: false
          }
        })
      }]
    }
  },
  'lo3_3l_dx': {
    'name': '三连号 单选',
    'ball_num': {
      layout: [{
        title: '三连号',
        balls: _.map(['123', '234', '345', '456'], (i) => {
          return {
            text: i,
            ball: i,
            choose: false
          }
        })
      }]
    }
  },
  // 和值
  'lo3_hz_hz': {
    'name': '和值',
    'row': ['xh'],
    'ball_num': '3~18',
    'ball_bit': 2,
    'ball_key': true
  }
}
