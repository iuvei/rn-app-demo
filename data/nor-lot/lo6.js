import _ from 'lodash'
import {rulesNameMap} from './basic-info'

// 基诺
export const navBar = [
  {
    code: 'lo6_qw',
    name: '趣味',
    subnav: [
      {
        title: '趣味',
        play: [
          {code: 'lo6_qw_hzds', name: '和值单双'},
          {code: 'lo6_qw_hzdx', name: '和值大小'},
          {code: 'lo6_qw_jop', name: '奇偶盘'},
          {code: 'lo6_qw_sxp', name: '上下盘'},
          {code: 'lo6_qw_hzdxp', name: '和值大小盘'}
        ]
      }
    ]
  }, {
    code: 'lo6_rx',
    name: '任选',
    subnav: [
      {
        title: '任选',
        play: [
          {code: 'lo6_rx_rx1', name: '任选一'},
          {code: 'lo6_rx_rx2', name: '任选二'},
          {code: 'lo6_rx_rx3', name: '任选三'},
          {code: 'lo6_rx_rx4', name: '任选四'},
          {code: 'lo6_rx_rx5', name: '任选五'},
          {code: 'lo6_rx_rx6', name: '任选六'},
          {code: 'lo6_rx_rx7', name: '任选七'}
        ]
      }
    ]
  },
  {
    code: 'lo6_5x',
    name: '五行',
    subnav: [
      {
        title: '五行',
        play: [
          {code: 'lo6_5x_5x', name: '五行'}
        ]
      }
    ]
  }
]

export const codeMap = {
  'lo6_qw_hzds': 'hezhids',
  'lo6_qw_hzdx': 'hezhidx',
  'lo6_qw_jop': 'jopan',
  'lo6_qw_sxp': 'sxpan',
  'lo6_qw_hzdxp': 'hzdxds',
  //
  'lo6_rx_rx1': 'rx1',
  'lo6_rx_rx2': 'rx2',
  'lo6_rx_rx3': 'rx3',
  'lo6_rx_rx4': 'rx4',
  'lo6_rx_rx5': 'rx5',
  'lo6_rx_rx6': 'rx6',
  'lo6_rx_rx7': 'rx7',
  //
  'lo6_5x_5x': 'hezhiwx'
}

export const viewData = {
  /** 基诺、快乐彩 **/
  'lo6_qw_hzds': {
    'name': '趣味 和值单双',
    'row': ['hzds'],
    // 'ball_num': ['dan', 'shuang']
    'ball_num': {
      layout: [
        {
          title: '和值单双',
          balls: _.map(['dan', 'shuang'], (i) => {
            return {
              text: rulesNameMap[i],
              ball: i,
              choose: false
            }
          })
        }
      ]
    }
  },
  'lo6_qw_hzdx': {
    'name': '趣味 和值大小',
    'row': ['hzdx'],
    'ball_num': {
      layout: [
        {
          title: '和值大小',
          balls: _.map(['da', 'xiao', 'daxiaohe'], (i) => {
            let text = rulesNameMap[i]
            return {
              ball: i,
              choose: false,
              text
            }
          })
        }
      ]
    }
  },
  'lo6_qw_jop': {
    'name': '趣味 奇偶盘',
    'row': ['jo'],
    'ball_num': {
      layout: [
        {
          title: '奇偶盘',
          balls: _.map(['ji', 'ou', 'jiouhe'], (i) => {
            let text = rulesNameMap[i]
            return {
              ball: i,
              choose: false,
              text
            }
          })
        }
      ]
    }
  },
  'lo6_qw_sxp': {
    'name': '趣味 上下盘',
    'row': ['sx'],
    'ball_num': {
      layout: [
        {
          title: '上下盘',
          balls: _.map(['shang', 'zhong', 'xia'], (i) => {
            let text = rulesNameMap[i]
            return {
              ball: i,
              choose: false,
              text
            }
          })
        }
      ]
    }
  },
  'lo6_qw_hzdxp': {
    'name': '趣味 和值大小盘',
    'row': ['dxds'],
    'ball_num': {
      layout: [
        {
          title: '和值大小盘',
          balls: _.map(['dadan', 'dashuang', 'xiaodan', 'xiaoshuang'], (i) => {
            let text = rulesNameMap[i]
            return {
              ball: i,
              choose: false,
              text
            }
          })
        }
      ]
    }
  },
  //
  'lo6_rx_rx1': {
    'name': '任选 任选一',
    'row': ['shang', 'xia'],
    'ball_num': {
      layout: [
        {
          title: '上',
          balls: _.range(1, 41).map(function (i) {
            i = i < 10 ? '0' + i : i
            return {
              ball: i,
              choose: false
            }
          })
        }, {
          title: '下',
          balls: _.range(41, 81).map(function (i) {
            return {
              ball: i,
              choose: false
            }
          })
        }
      ]
    }
  },
  'lo6_rx_rx2': {
    'name': '任选 任选二',
    'row': ['shang', 'xia'],
    'ball_num': {
      layout: [
        {
          title: '上',
          balls: _.range(1, 41).map(function (i) {
            i = i < 10 ? '0' + i : i
            return {
              ball: i,
              choose: false
            }
          })
        }, {
          title: '下',
          balls: _.range(41, 81).map(function (i) {
            return {
              ball: i,
              choose: false
            }
          })
        }
      ]
    }
  },
  'lo6_rx_rx3': {
    'name': '任选 任选三',
    'row': ['shang', 'xia'],
    'ball_num': {
      layout: [
        {
          title: '上',
          balls: _.range(1, 41).map(function (i) {
            i = i < 10 ? '0' + i : i
            return {
              ball: i,
              choose: false
            }
          })
        }, {
          title: '下',
          balls: _.range(41, 81).map(function (i) {
            return {
              ball: i,
              choose: false
            }
          })
        }
      ]
    }
  },
  'lo6_rx_rx4': {
    'name': '任选 任选四',
    'row': ['shang', 'xia'],
    'ball_num': {
      layout: [
        {
          title: '上',
          balls: _.range(1, 41).map(function (i) {
            i = i < 10 ? '0' + i : i
            return {
              ball: i,
              choose: false
            }
          })
        }, {
          title: '下',
          balls: _.range(41, 81).map(function (i) {
            return {
              ball: i,
              choose: false
            }
          })
        }
      ]
    }
  },
  'lo6_rx_rx5': {
    'name': '任选 任选五',
    'row': ['shang', 'xia'],
    'ball_num': {
      layout: [
        {
          title: '上',
          balls: _.range(1, 41).map(function (i) {
            i = i < 10 ? '0' + i : i
            return {
              ball: i,
              choose: false
            }
          })
        }, {
          title: '下',
          balls: _.range(41, 81).map(function (i) {
            return {
              ball: i,
              choose: false
            }
          })
        }
      ]
    }
  },
  'lo6_rx_rx6': {
    'name': '任选 任选六',
    'row': ['shang', 'xia'],
    'ball_num': {
      layout: [
        {
          title: '上',
          balls: _.range(1, 41).map(function (i) {
            i = i < 10 ? '0' + i : i
            return {
              ball: i,
              choose: false
            }
          })
        }, {
          title: '下',
          balls: _.range(41, 81).map(function (i) {
            return {
              ball: i,
              choose: false
            }
          })
        }
      ]
    }
  },
  'lo6_rx_rx7': {
    'name': '任选 任选七',
    'row': ['shang', 'xia'],
    'ball_num': {
      layout: [
        {
          title: '上',
          balls: _.range(1, 41).map(function (i) {
            i = i < 10 ? '0' + i : i
            return {
              ball: i,
              choose: false
            }
          })
        }, {
          title: '下',
          balls: _.range(41, 81).map(function (i) {
            return {
              ball: i,
              choose: false
            }
          })
        }
      ]
    }
  },
  //
  'lo6_5x_5x': {
    'name': '五行',
    'row': ['xh'],
    'ball_num': {
      layout: [
        {
          title: '五行',
          balls: _.map(['jin', 'mu', 'shui', 'huo', 'tu'], (i) => {
            let text = rulesNameMap[i]
            return {
              ball: i,
              choose: false,
              text
            }
          })
        }
      ]
    }
  }
}
