import _ from 'lodash'

export const rulesNameMap = {
  // 时时彩
  'ww': '万位',
  'qw': '千位',
  'bw': '百位',
  'sw': '十位',
  'gw': '个位',
  //
  'xh': '选号',
  '2ch': '二重号',
  'dh': '单号',
  '3ch': '三重号',
  '4ch': '四重号',
  //
  'zu3': '组三',
  'zu6': '组六',
  'zu3td': '组三胆拖',
  'zu6td': '组六胆拖',
  'hhzx': '混合组选',
  //
  'zux': '组选',
  //
  'wxym': '五星一码',
  'wxem': '五星二码',
  'wxsm': '五星三码',
  'emjz': '二码计重',
  'smjz': '三码计重',
  //
  'da': '大',
  'xiao': '小',
  'dan': '单',
  'shuang': '双',
  //
  'bdd': '不定位',
  //
  hzzx: '和值直选',
  qszx: '前三直选',
  zszx: '中三直选',
  hszx: '后三直选',
  qezx: '前二直选',
  hezx: '后二直选',
  qszux: '前三组选',
  zszux: '中三组选',
  hszux: '后三组选',
  qsws: '前三尾数',
  zsws: '中三尾数',
  hsws: '后三尾数',
  //
  quwei: '趣味',
  //
  lh: '龙虎',
  //
  yffs: '一帆风顺',
  hscs: '好事成双',
  sxbx: '三星报喜',
  sjfc: '四季发财',
  // 十一选五
  'd1w': '第一位',
  'd2w': '第二位',
  'd3w': '第三位',
  'd4w': '第四位',
  'd5w': '第五位',
  'd6w': '第六位',
  'd7w': '第七位',
  'd8w': '第八位',
  //
  'dds': '定单双',
  'czw': '猜中位',
  //
  '1z1': '一中一',
  '2z2': '二中二',
  '3z3': '三中三',
  '4z4': '四中四',
  '5z5': '五中五',
  '6z5': '六中五',
  '7z5': '七中五',
  '8z5': '八中五',
  // 快三
  'dm': '胆码',
  'tm': '拖码',
  //
  '2th': '二同号',
  'bth': '不同号',
  // 基诺、快乐彩
  'hzds': '和值单双',
  'hzdx': '和值大小',
  'jo': '奇偶',
  'sx': '上下',
  'dxds': '大小单双',
  //
  'shang': '上',
  'xia': '下',
  'zhong': '中',
  // PK 拾
  'd1m': '第一名',
  'd2m': '第二名',
  'd3m': '第三名',
  'd4m': '第四名',
  'd5m': '第五名',
  'd6m': '第六名',
  'd7m': '第七名',
  'd8m': '第八名',
  'd9m': '第九名',
  'd10m': '第十名',
  // 投注面文案
  'long': '龙',
  'hu': '虎',
  'he': '和',
  'daxiaohe': '和',
  //
  '5d0s': '5单0双',
  '4d1s': '4单1双',
  '3d2s': '3单2双',
  '2d3s': '2单3双',
  '1d4s': '1单4双',
  '0d5s': '0单5双',
  //
  '11': '11',
  '22': '22',
  '33': '33',
  '44': '44',
  '55': '55',
  '66': '66',
  //
  '11*': '11*',
  '22*': '22*',
  '33*': '33*',
  '44*': '44*',
  '55*': '55*',
  '66*': '66*',
  //
  '111': '111',
  '222': '222',
  '333': '333',
  '444': '444',
  '555': '555',
  '666': '666',
  //
  '123': '123',
  '234': '234',
  '345': '345',
  '456': '456',
  //
  'x_dx': '小(210~809)',
  'h_dx': '和(810)',
  'd_dx': '大(811~1410)',
  //
  'ji': '奇(奇>偶)',
  'jiouhe': '和(奇=偶)',
  'ou': '偶(奇<偶)',
  //
  's_sx': '上(上>下)',
  'h_sx': '和(上=下)',
  'x_sx': '下(上<下)',
  //
  // 'dd': '大单',
  // 'ds': '大双',
  // 'xd': '小单',
  // 'xs': '小双',
  ds: '单双',
  hz: '和值',
  jida: '极大',
  jixiao: '极小',
  dadan: '大单',
  dashuang: '大双',
  xiaodan: '小单',
  xiaoshuang: '小双',
  //
  jin: '金(210~695)',
  mu: '木(696~763)',
  shui: '水(764~855)',
  huo: '火(856~923)',
  tu: '土(924~1410)',
  // 3d
  zs: '组三',
  zl: '组六',
  qy: '前一',
  hy: '后一',
  zx: '直选',
  dx: '大小',
  bdw: '定位胆'
}

// 快捷选号按钮
export const ballTools = [
  {fncode: 'full', name: '全'},
  {fncode: 'big', name: '大'},
  {fncode: 'small', name: '小'},
  {fncode: 'single', name: '单'},
  {fncode: 'double', name: '双'},
  {fncode: 'empty', name: '清'}
]

// 快捷选号按钮方法
export const handlerBall = {
  full({ball}) {
    this.empty({ball})
    ball.filter(list => list.choose = true)
  },
  big({ball}) {
    this.empty({ball})
    let len = Math.ceil(ball.length / 2)
    ball.filter((list, idx) => idx >= len ? list.choose = true : list.choose = false)
  },
  small({ball}) {
    this.empty({ball})
    let len = Math.ceil(ball.length / 2)
    ball.filter((list, idx) => idx < len ? list.choose = true : list.choose = false)
  },
  single({ball}) {
    this.empty({ball})
    ball.filter(list => list.ball % 2 ? list.choose = true : list.choose = false)
  },
  double({ball}) {
    this.empty({ball})
    ball.filter(list => list.ball % 2 === 0 ? list.choose = true : list.choose = false)
  },
  empty({ball}) {
    ball.filter(list => list.choose = false)
  }
}

// 玩法数据生成器
export const ruleBuilder = ({playCode, viewData, rulesDoc, codeMap}) => {
  let data = viewData[playCode] || {}
  // let doc = rulesDoc[playCode] || {}
  let t = {}
  t.title = data.name
  t.code = playCode
  // t.tips = doc.tips
  // t.example = doc.example
  // t.help = doc.help
  t.tools = !!data.ball_key
  t.playOrgin = codeMap[playCode]
  t.layout = []
  if (data.ball_num) {
    // 非单式
    if (_.isArray(data.ball_num)) {
      t.layout = _.map(data.row, (i) => {
        let item = {}
        // 行标题
        item.title = rulesNameMap[i]
        // 行数据-球是文字
        item.balls = _.map(data.ball_num, (i) => {
          return {
            ball: rulesNameMap[i],
            choose: false
          }
        })
        return item // 行数据
      })
    } else if (_.isObject(data.ball_num)) {
      // 特殊布局数据(手动)
      t.layout = data.ball_num.layout
    } else {
      t.layout = _.map(data.row, (i) => {
        let item = {}
        // 行标题
        item.title = rulesNameMap[i]
        // 行数据-球是数字
        let num = data.ball_num.split('~')
        item.balls = _.range(num[0], parseInt(num[1]) + 1).map((i) => {
          i = (data.ball_bit === 2) && i < 10 ? '0' + i : i
          return {
            ball: i,
            choose: false
          }
        })
        return item
      })
    }
  } else {
    if (Object.keys(data).length) {
      // 单式
      t.text = true
      t.textarea = ''
    }
  }

  // 是否有任选位
  if (data.bit) {
    t.bit = data.bit
    t.bitMax = data.bitMax
    t.checkbox = []
    // bug100 说不要自动选中
    // t.bit.filter(list => {
    //   if (list.choose) {
    //     t.checkbox.push(list.position)
    //   }
    // })
  }
  return t
}

export const filterCurBall = ({activeViewData, lotType}) => {
  let LazmDataSel = ''
  let BetContentarr = []
  let BetContent = ''
  // let {activeViewData, activeLot} = this
  let {layout, text, textarea, bit, checkbox} = activeViewData
  let [balls, textareas, places, place] = [[], [], [], []]
  if (layout) {
    layout.forEach((item, idx) => {
      let arr = []
      balls[idx] = []
      let sonIdx = 0
      item.balls.forEach((list) => {
        if (list.choose) {
          if (list.text) {
            arr.push(list.text)
          }
          LazmDataSel += list.value || list.ball
          balls[idx][sonIdx] = list.value || list.ball
          sonIdx++
        }
      })
      if (arr.length) {
        BetContentarr.push(arr)
      }
      LazmDataSel += ','
    })
    for (let i = 0; i < BetContentarr.length; i++) {
      BetContent += BetContentarr[i].join(',')
      if (i < BetContentarr.length - 1) {
        BetContent += ' '
      }
    }
  }
  if (text) {
    let reg = /,|，|;|；|\n|\s|、|\r|\./g
    // if (['lo2', 'lo6'].includes(activeLot.lotRoute)) {
    //   reg = /,|;|\n/g
    // }
    textarea = textarea.trim()
    let as = textarea.split(reg)
    _.each(as, (val, idx) => {
      if (val) {
        if (['lo2', 'lo4'].includes(lotType)) {
          let newVal = val.replace(/ /g, '')
          let aftVal = ''
          for (let i = 0; i < Math.ceil(newVal.length / 2); i++) {
            aftVal += newVal.slice(i * 2, i * 2 + 2) + ' '
          }
          val = aftVal.slice(0, aftVal.length - 1)
        }
      }
      LazmDataSel += val + ','
      textareas[idx] = val
    })
  }
  if (bit) {
    let bitMap = ['0', '1', '2', '3', '4']
    _.each(bit, (bitVal, bitIdx) => {
      if (checkbox.indexOf(bitVal.position) > -1) {
        BetContentarr.push(bitVal.name)
        place.push(bitMap[bitIdx])
      }
    })
    if (BetContentarr.length) {
      BetContent = '[' + BetContentarr.join(',') + ']' + LazmDataSel
    }
    places.push(place)
  }
  let dataSel = [].concat(places).concat(balls).concat(textareas)
  LazmDataSel = LazmDataSel.slice(0, LazmDataSel.length - 1)
  return Promise.resolve({dataSel, LazmDataSel, BetContent})
}
