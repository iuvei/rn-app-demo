// 契约状态
export const contractStatus = [
  {value: 0, name: '确认中'},
  {value: 1, name: '已确认'},
  {value: 2, name: '已拒绝'},
  {value: 3, name: '已撤销'},
  {value: 4, name: '撤销确认中'},
  {value: 5, name: '拒绝撤销'},
  {value: 6, name: '已删除'}
]
// 分红的派发状态
export const bonusStatus = [
  {value: '', name: '全部'},
  {value: 0, name: '未派送'},
  {value: 1, name: '已派送'},
  {value: 2, name: '审核未通过'},
  {value: 3, name: '审核通过'},
  {value: 4, name: '已修改'},
  {value: 5, name: '未领取'},
  {value: 6, name: '已领取'}
]
// 分红是否满足发放
export const issuingCondition = [
  {value: '', name: '全部'},
  {value: 1, name: '是'},
  {value: 0, name: '否'}
]
export const strategyType = [
  {value: 0, name: '半月分红不累计'},
  {value: 1, name: '分红累计一月'}
]
// 分红类型
export const bounceTypes = [
  {value: 0, name: '彩票'}
]
// 团队管理
export const UserType = [
  {value: 0, name: '玩家'},
  {value: 1, name: '代理'}
]

export const UrlUserType = [
  {value: 0, name: '玩家'},
  {value: 1, name: '代理'}
]

// 获取今天日期 东七区
export const getToday = () => {
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime())
  end.setTime(end.getTime())
  return [start, end]
}
// 日期下拉选项
export const shortcuts = [
  {
    text: '今天',
    value() {
      const end = new Date()
      const start = new Date()
      return [start, end]
    }
  }, {
    text: '最近一周',
    value() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
      end.setTime(end.getTime())
      return [start, end]
    }
  }, {
    text: '最近一个月',
    value() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 31)
      end.setTime(end.getTime() + 3600 * 1000 * 24 * 1)
      return [start, end]
    }
  }, {
    text: '最近三个月',
    value() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 92)
      end.setTime(end.getTime() + 3600 * 1000 * 24 * 1)
      return [start, end]
    }
  }
]

export const shortcutsDays = [
  {
    text: '今天',
    value() {
      const end = new Date()
      const start = new Date()
      return [start, end]
    }
  }, {
    text: '三天',
    value() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 2)
      end.setTime(end.getTime())
      return [start, end]
    }
  }, {
    text: '七天',
    value() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
      end.setTime(end.getTime())
      return [start, end]
    }
  }
]

// 东七区日期处理成表格适用
export const handlerDate = (day) => {
  let y = day.getFullYear()
  // 获取当前月份的日期
  let m = day.getMonth() + 1
  let d = day.getDate()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  return y + '-' + m + '-' + d
}
// 获取格式化后的时间
export const getfilterTime = (day) => {
  let time = []
  if (!day) {
    time = getToday()
  } else if (day === 1) {
    time = shortcuts[0].value()
  } else if (day === 7) {
    time = shortcuts[1].value()
  } else if (day === 30) {
    time = shortcuts[2].value()
  } else if (day === 90) {
    time = shortcuts[3].value()
  }
  return [handlerDate(time[0]), handlerDate(time[1])]
}
// 账变类型
export const userAccountChangeType = [
  {value: '', name: '全部'},
  {value: 1, name: '充值'},
  {value: 2, name: '提款'},
  {value: 3, name: '转账'},
  {value: 4, name: '购买'},
  {
    value: 5,
    name: '撤单'
  },
  {value: 6, name: '中奖'},
  {value: 8, name: '返点'},
  {value: 9, name: '修正资金'},
  {
    value: 10,
    name: '百家乐转账到系统'
  },
  {value: 11, name: '百家乐返水'},
  {value: 12, name: '百家乐返点'},
  {value: 13, name: '百家乐活动'}, {
    value: 14,
    name: '活动彩金'
  },
  {value: 15, name: '提现失败退款'},
  {value: 16, name: '上级取款'},
  {value: 17, name: '下级充值'},
  {
    value: 18,
    name: '抢红包'
  },
  {value: 19, name: '日分红'}, {value: 20, name: '日工资'}, {value: 21, name: '契约日工资'}, {
    value: 22,
    name: '契约分红'
  }, {value: 23, name: '平台分红'}, {value: 24, name: '充值手续费'}, {value: 25, name: '提现手续费'}, {
    value: 26,
    name: '修正彩票分红'
  }, {value: 27, name: '修正真人分红'}, {value: 28, name: '修正体育分红'}, {value: 29, name: '修正电子分红'}, {
    value: 30,
    name: '修正棋牌分红'
  }, {value: 31, name: '修正彩票返水'}, {value: 32, name: '修正百家乐返水'}, {value: 33, name: '修正活动奖金'}, {
    value: 34,
    name: '修正百家乐活动奖金'
  }, {value: 35, name: '修正分红'}, {value: 36, name: '修正红包账户'}, {value: 37, name: '修正日工资'}, {
    value: 38,
    name: '修正契约日工资'
  }, {value: 39, name: '修正日分红'}, {value: 40, name: '修正平台分红'}, {value: 41, name: '修正契约分红'}, {
    value: 42,
    name: '修正首冲送'
  }, {value: 43, name: '修正消费送'}, {value: 44, name: '修正三级亏损佣金'}, {value: 46, name: '系统转百家乐'}, {
    value: 47,
    name: '系统转百家乐失败退款'
  }, {value: 48, name: '日佣金'}, {value: 49, name: '修正日佣金'}, {value: 50, name: '系统转久发'}, {
    value: 51,
    name: '久发转系统'
  }, {value: 52, name: '系统转久发失败退款'}
]

// 订单状态
export const orderStatus = [
  {value: '', name: '所有状态'},
  {value: 1, name: '未开奖', color: '#999'},
  {value: 3, name: '未中奖', color: 'green'},
  {value: 2, name: '已中奖', color: 'red'},
  {value: -1, name: '系统自动撤单', color: '#999'},
  {value: -2, name: '用户手动撤单', color: '#999'},
  {value: -3, name: '后台手动撤单', color: '#999'}
]

// 投注模式
export const modelInfo = [
  {value: 'yuan', name: '元'},
  {value: 'jiao', name: '角'},
  {value: 'fen', name: '分'},
  {value: 'li', name: '厘'}
]
// 充值类型
export const RechargeType = [
  {value: '', name: '全部'},
  {value: 1, name: '网银充值'},
  {value: 2, name: '转账汇款'},
  {value: 0, name: '系统充值'}
]

// 充值状态 取款状态 转账状态
export const ReWiTrStatus = [
  {value: '', name: '全部'},
  {value: -5, name: '删除'},
  {value: -4, name: '锁定'},
  {value: -3, name: '失败'},
  {value: -2, name: '拒绝'},
  {value: -1, name: '取消申请'},
  {value: 0, name: '已提交'},
  {value: 1, name: '处理中'},
  {value: 2, name: '待审核'},
  {value: 3, name: '审核中'},
  {value: 4, name: '审核通过'},
  {value: 5, name: '已完成'}
]

// 追号状态
export const chaseStatus = [
  {value: '', name: '全部状态'},
  {value: 1, name: '未开奖', color: '#999'},
  {value: 2, name: '已中奖', color: 'red'},
  {value: 3, name: '未中奖', color: 'green'},
  {value: -1, name: '已撤单', color: '#999'}
]

//  密保问题
export const questions = [
  {value: '您的出生地是?', loc: 0, label: '您的出生地是?'},
  {value: '您小学班主任的名字是?', loc: 0, label: '您小学班主任的名字是?'},
  {value: '您中学班主任的名字是?', loc: 0, label: '您中学班主任的名字是?'},
  {value: '您高中班主任的名字是?', loc: 0, label: '您高中班主任的名字是?'},
  {value: '您大学班主任的名字是?', loc: 0, label: '您大学班主任的名字是?'},
  {value: '您的小学校名是?', loc: 0, label: '您的小学校名是?'},
  {value: '您母亲的姓名是?', loc: 0, label: '您母亲的姓名是?'},
  {value: '您母亲的生日是?', loc: 0, label: '您母亲的生日是?'},
  {value: '您父亲的姓名是?', loc: 0, label: '您父亲的姓名是?'},
  {value: '您父亲的生日是?', loc: 0, label: '您父亲的生日是?'},
  {value: '您配偶的姓名是?', loc: 0, label: '您配偶的姓名是?'},
  {value: '您配偶的生日是?', loc: 0, label: '您配偶的生日是?'},
  {value: '对您影响最大的人名字是?', loc: 0, label: '对您影响最大的人名字是?'},
  {value: '您最喜欢的运动是?', loc: 0, label: '您最喜欢的运动是?'},
  {value: '您的学号（或工号）是?', loc: 0, label: '您的学号（或工号）是?'},
  {value: '您最喜欢的明星名字是?', loc: 0, label: '您最喜欢的明星名字是?'},
  {value: '您最熟悉的童年好友名字是?', loc: 0, label: '您最熟悉的童年好友名字是?'}
]
// 百家乐返点
export const bjlRebateInfo = [
  {name: '百家乐返点', value: 2}
  // {name: '百家乐体育返点', value: 3},
  // {name: '百家乐电子返点', value: 4},
  // {name: '百家乐彩票返点', value: 5}
]
// 百家乐返水类型
export const bjlWaterInfo = [
  {name: '百家乐真人返水', value: 2},
  {name: '百家乐体育返水', value: 3},
  {name: '百家乐电子返水', value: 4}
]

// -1---已过期；0--进行中；1---未派发；2---未领取，3---待审核;4---已领取已审核
export const ActivityStatus = [
  {value: '', name: '全部'},
  {value: 0, name: '进行中'},
  {value: 1, name: '未派发'},
  {value: 2, name: '未领取'},
  {value: 3, name: '待审核'},
  {value: 4, name: '已领取已审核'},
  {value: -1, name: '已过期'}
]

// 充值页面充值渠道图标map
export const RechargeChannelIconMap = {
  alipay: 'alipay',
  ALIPAY_QR: 'alipay',
  AILPAY: 'alipay',
  ALIPAY: 'alipay',
  wechat: 'weixinzhifu',
  WECHAT_QR: 'weixinzhifu',
  WXPAY_QR: 'weixinzhifu',
  WECHAT: 'weixinzhifu',
  WXPAY: 'weixinzhifu',
  JDPAY: 'jingdongzhifu',
  jdpay: 'jingdongzhifu',
  jd: 'jingdongEqia',
  qq: 'qqqia',
  QQPAY: 'qqqianbao',
  qqpay: 'qqqianbao',
  // 银行
  ICBC: 'zhongguogongshangyinhang',
  ABC: 'zhongguonongyeyinhang',
  BCCB: 'beijingyinhang', // 北京银行
  BOB: 'beijingyinhang', // 北京银行
  CMBC: 'zhongguominshengyinhang',
  CITIC: 'zhongxinyinhang',
  CGB: 'guangfayinhang', // 广发银行
  GDB: 'guangfayinhang', // 广发银行
  CEB: 'zhongguoguangdayinhang',
  CCB: 'zhongguojiansheyinhang',
  BOS: 'shanghaiyinhang',
  SPDB: 'pufayinhang',
  BOCOM: 'jiaotongyinhang',
  PSBC: 'zhongguoyouzheng',
  BOC: 'zhongguoyinhang',
  HXB: 'huaxiayinhang',
  SRCB: 'shanghainongshangyinhang',
  unionpay: 'zhongguoyinlian',
  UNIONPAY: 'zhongguoyinlian',
  BHBC: 'bohaiyinhang',
  BJRCB: 'beijingnongcunshangyeyinhang',
  CIB: 'xingyeyinhang',
  CMB: 'zhaoshangyinhang',
  CZB: 'zheshangyinhang',
  NBCB: 'ningboyinhang',
  NJCB: 'nanjingyinhang',
  PAB: 'pinganyinhang',
  // 虚拟币
  bcb: 'bcb',
  dc: 'dc',
  eth: 'eth',
  btc: 'btc',
  etc: 'etc',
  usdx: 'usdx',
  ltc: 'ltc',
  dns: 'dns1'
  // 充值卡
}
