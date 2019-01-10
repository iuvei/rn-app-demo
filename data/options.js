import day from 'dayjs'

export const TableRow = 15

// 分红类型
export const bounceTypes = [
  {value: 0, name: '彩票'}
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
// 分红的派发状态(solo)
export const contractDistributeStatus = [
  {value: '', name: '全部'},
  {value: 2, name: '审核未通过'},
  {value: 3, name: '审核通过'},
  {value: 4, name: '已修改'},
  {value: 5, name: '未领取'},
  {value: 6, name: '已领取'}
]
// 工资的派发状态(solo)
export const salaryDistributeStatus = [
  {value: '', name: '全部'},
  {value: 0, name: '未派送'},
  {value: 1, name: '已派送'}
]
// 分红是否满足发放
export const issuingCondition = [
  {value: '', name: '全部'},
  {value: 1, name: '是'},
  {value: 0, name: '否'}
]
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
    text: '最近三天',
    value() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 2)
      end.setTime(end.getTime())
      return [start, end]
    }
  }, {
    text: '最近七天',
    value() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
      end.setTime(end.getTime())
      return [start, end]
    }
  }
]

export const shortcutsDays = [
  {
    text: '今天',
    value() {
      const endTime = new Date()
      const startTime = new Date()
      return {startTime, endTime}
    }
  }, {
    text: '三天',
    value() {
      const endTime = new Date()
      const startTime = new Date()
      startTime.setTime(startTime.getTime() - 3600 * 1000 * 24 * 2)
      endTime.setTime(endTime.getTime())
      return {startTime, endTime}
    }
  }, {
    text: '七天',
    value() {
      const endTime = new Date()
      const startTime = new Date()
      startTime.setTime(startTime.getTime() - 3600 * 1000 * 24 * 6)
      endTime.setTime(endTime.getTime())
      return {startTime, endTime}
    }
  }
]

export const shortcut = [
  {
    text: '今天',
    value() {
      const end = new Date()
      const start = new Date()
      return [start, end]
    }
  }, {
    text: '最近七天',
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

// 获取今天日期 东七区
export const getToday = () => {
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime())
  end.setTime(end.getTime())
  return [start, end]
}

// 东七区日期处理成表格适用
export const handlerDate = (time) => {
  let y = time.getFullYear()
  // 获取当前月份的日期
  let m = time.getMonth() + 1
  let d = time.getDate()
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
    time = shortcut[0].value()
  } else if (day === 3) {
    time = (function () {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
      end.setTime(end.getTime() + 3600 * 1000 * 24 * 1)
      return [start, end]
    })()
  } else if (day === 7) {
    time = shortcut[1].value()
  } else if (day === 30) {
    time = shortcut[2].value()
  } else if (day === 90) {
    time = shortcut[3].value()
  }
  return [handlerDate(time[0]), handlerDate(time[1])]
}

// 彩种开启状态
export const lotteryStatus = [
  {value: 0, name: '启动'},
  {value: 1, name: '显示'},
  {value: 2, name: '禁用'}
]

// 订单状态
export const orderStatus = [
  {value: '', label: '所有状态', color: '#999'},
  {value: 1, label: '未开奖', color: '#999'},
  {value: 3, label: '未中奖', color: '#018000'},
  {value: 2, label: '已中奖', color: '#ef3155'},
  {value: -1, label: '系统自动撤单', color: '#999'},
  {value: -2, label: '用户手动撤单', color: '#999'},
  {value: -3, label: '后台手动撤单', color: '#999'}
]
// 追号订单状态
export const chaseOrderStatus = [
  {value: '', name: '所有状态'},
  {value: 0, name: '进行中', color: 'green'},
  {value: 1, name: '系统终止', color: 'red'},
  {value: 2, name: '已经完成', color: '#999'}
]
// 是否中奖即停止
export const haltAddition = [
  {value: 0, name: '是'},
  {value: 1, name: '否'}
]
// suc fail
export const statusSF = [
  {value: 0, name: '成功'},
  {value: 1, name: '失败'}
]

// 投注模式
export const modeInfo = [
  {value: 0, name: '元', money: 1},
  {value: 1, name: '角', money: 0.1},
  {value: 2, name: '分', money: 0.01},
  {value: 3, name: '厘', money: 0.001}
]

// 追号状态
export const chaseStatus = [
  {value: '', name: '全部状态'},
  {value: 1, name: '未开奖', color: '#999'},
  {value: 2, name: '已中奖', color: 'red'},
  {value: 3, name: '未中奖', color: 'green'},
  {value: -1, name: '已撤单', color: '#999'}
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

export const TeamTime = [
  {value: 0, name: '默认'},
  {value: 60 * 60 * 24 * 1000, name: '1天内'},
  {value: 7 * 60 * 60 * 24 * 1000, name: '7天内'},
  {value: 30 * 60 * 60 * 24 * 1000, name: '一个月内'},
  {value: 90 * 60 * 60 * 24 * 1000, name: '三个月内'},
  {value: 180 * 60 * 60 * 24 * 1000, name: '六个月内'}
]

// 账户类别
export const AccountType = [
  {value: '', name: '全部账户'},
  {value: 1, name: '彩票账户'},
  {value: 2, name: '百家乐账户'}
]

// 在线状态
export const OnlineStatus = [
  {value: 1, name: '在线'},
  {value: 2, name: '未登录'},
  {value: 3, name: '离线'}
]

// 会员等级
export const UserVipLevel = [
  {value: 0, name: '普通会员'},
  {value: 1, name: '青铜 VIP'},
  {value: 2, name: '紫晶 VIP'},
  {value: 3, name: '白金 VIP'},
  {value: 4, name: '黄金 VIP'},
  {value: 5, name: '钻石 VIP'},
  {value: 6, name: '至尊 VIP'}
]

export const Greeting = () => {
  let hour = day().hour()
  if (hour >= 0 && hour < 12) {
    return '早上好'
  }
  if (hour >= 12 && hour < 18) {
    return '下午好'
  }
  if (hour >= 18 || hour < 0) {
    return '晚上好'
  }
}

// 等级
export const PlanLevel = [
  {value: 0, name: '菜鸟'},
  {value: 1, name: '学徒'},
  {value: 2, name: '出师'},
  {value: 3, name: '操盘'},
  {value: 4, name: '大师'},
  {value: 5, name: '宗师'},
  {value: 6, name: '大神'}
]

// 银行卡状态
export const CardStatus = [
  {value: -1, name: '删除'},
  {value: 0, name: '有效'},
  {value: 1, name: '审核中'},
  {value: 2, name: '注销'}
]

// 充值类型
export const RechargeType = [
  {value: '', label: '全部'},
  {value: 1, label: '网银充值'},
  {value: 2, label: '转账汇款'},
  {value: 0, label: '系统充值'}
]

// 充值状态 取款状态 转账状态
export const ReWiTrStatus = [
  {value: '', label: '全部'},
  {value: -5, label: '删除'},
  {value: -4, label: '锁定'},
  {value: -3, label: '失败'},
  {value: -2, label: '拒绝'},
  {value: -1, label: '取消申请'},
  {value: 0, label: '已提交'},
  {value: 1, label: '处理中'},
  {value: 2, label: '待审核'},
  {value: 3, label: '审核中'},
  {value: 4, label: '审核通过'},
  {value: 5, label: '已完成'}
]

// 账单类型
export const BillType = [
  {value: '', name: '全部类别'},
  {value: 1000, name: '存款'},
  {value: 1001, name: '取款'},
  {value: 1002, name: '取款退回'},
  {value: 1100, name: '转入'},
  {value: 1101, name: '转出'},
  {value: 1102, name: '上下级转账'},
  {value: 1200, name: '优惠活动'},
  {value: 1300, name: '消费'},
  {value: 1301, name: '派奖'},
  {value: 1302, name: '消费返点'},
  {value: 1303, name: '取消订单'},
  {value: 1304, name: '修正奖金'},
  {value: 1400, name: '代理返点'},
  {value: 1500, name: '分红'},
  {value: 1600, name: '管理员增'},
  {value: 1601, name: '管理员减'},
  {value: 1700, name: '积分兑换'},
  {value: 1800, name: '支付佣金'},
  {value: 1801, name: '获得佣金'},
  {value: 1900, name: '会员返水'}
]

// 个人账变类型
export const userAccountChangeType = [
  {value: '', label: '全部'},
  {value: 1, label: '充值'},
  {value: 2, label: '提款'},
  {value: 3, label: '转账'},
  {value: 4, label: '购买'},
  {
    value: 5,
    label: '撤单'
  },
  {value: 6, label: '中奖'},
  {value: 8, label: '返点'},
  {value: 9, label: '修正资金'},
  {
    value: 10,
    label: '百家乐转账到系统'
  },
  {value: 11, label: '百家乐返水'},
  {value: 12, label: '百家乐返点'},
  {value: 13, label: '百家乐活动'}, {
    value: 14,
    label: '活动彩金'
  },
  {value: 15, label: '提现失败退款'},
  {value: 16, label: '上级取款'},
  {value: 17, label: '下级充值'},
  {
    value: 18,
    label: '抢红包'
  },
  {value: 19, label: '日分红'}, {value: 20, label: '日工资'}, {value: 21, label: '契约日工资'}, {
    value: 22,
    label: '契约分红'
  }, {value: 23, label: '平台分红'}, {value: 24, label: '充值手续费'}, {value: 25, label: '提现手续费'}, {
    value: 26,
    label: '修正彩票分红'
  }, {value: 27, label: '修正真人分红'}, {value: 28, label: '修正体育分红'}, {value: 29, label: '修正电子分红'}, {
    value: 30,
    label: '修正棋牌分红'
  }, {value: 31, label: '修正彩票返水'}, {value: 32, label: '修正百家乐返水'}, {value: 33, label: '修正活动奖金'}, {
    value: 34,
    label: '修正百家乐活动奖金'
  }, {value: 35, label: '修正分红'}, {value: 36, label: '修正红包账户'}, {value: 37, label: '修正日工资'}, {
    value: 38,
    label: '修正契约日工资'
  }, {value: 39, label: '修正日分红'}, {value: 40, label: '修正平台分红'}, {value: 41, label: '修正契约分红'}, {
    value: 42,
    label: '修正首冲送'
  }, {value: 43, label: '修正消费送'}, {value: 44, label: '修正三级亏损佣金'}, {value: 46, label: '系统转百家乐'}, {
    value: 47,
    label: '系统转百家乐失败退款'
  }, {value: 48, label: '日佣金'}, {value: 49, label: '修正日佣金'}, {value: 50, label: '系统转久发'}, {
    value: 51,
    label: '久发转系统'
  }, {value: 52, label: '系统转久发失败退款'}
]

// 信息收发类型
export const MessageType = [
  {value: 0, name: '建议反馈'},
  {value: 1, name: '已收消息'},
  {value: 2, name: '已发消息'}
]

// 信息收发状态
export const MessageStatus = [
  {value: 0, name: '正常'},
  {value: 1, name: '已读'},
  {value: -1, name: '已删除'}
]

// 系统信息通知类型
export const SysMessageType = [
  {value: 0, name: '系统通知'},
  {value: 1, name: '到账通知'},
  {value: 2, name: '提现通知'},
  {value: 5, name: 'VIP活动通知'}
]

// 第三方支付类别
export const LotteryPaymentThridType = [
  {value: 'ips', name: '环讯支付'},
  {value: 'baofoo', name: '宝付支付'},
  {value: 'newpay', name: '新生支付'},
  {value: 'ecpss', name: '汇潮支付'},
  {value: 'yeepay', name: '易宝支付'},
  {value: 'mobao', name: '摩宝支付'},
  {value: 'gopay', name: '国付宝支付'},
  {value: 'pay41', name: '通汇支付'}
]

// 链接有效期
export const urlTime = [
  {name: '1天', value: 1 * 24},
  {name: '7天', value: 7 * 24},
  {name: '30天', value: 30 * 24},
  {name: '90天', value: 90 * 24},
  {name: '180天', value: 180 * 24},
  {name: '永久有效', value: 0}
]

// 返点类型
export const rebateInfo = [
  {name: '彩票返点', value: 0},
  // {name: '彩票私反', value: 1},
  {name: '快乐彩返点', value: 1}
  // {name: '百家乐返点', value: 3}
]
// 0 彩票返点、1 快乐彩返点、2 百家乐真人返点、3 百家乐体育返点、4 百家乐电子返点、5 百家乐彩票返点'
export const backPointRebate = [
  {name: '彩票返点', value: 0},
  {name: '快乐彩返点', value: 1},
  {name: '百家乐真人返点', value: 2},
  {name: '百家乐体育返点', value: 3},
  {name: '百家乐电子返点', value: 4},
  {name: '百家乐彩票返点', value: 5}
]
// 返水类型
export const waterInfo = [
  // {name: '彩票返水', value: 0},
  {name: '快乐彩返水', value: 1},
  {name: '百家乐返水', value: 2},
  {name: '真人返水', value: 3},
  {name: '电子返水', value: 4},
  {name: '体育返水', value: 5}
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
  {name: '百家乐电子返水', value: 4},
  {name: '百家乐彩票返水', value: 5}
]

export const questions = [
  {label: '您的出生地是?', loc: 0, value: '您的出生地是?'},
  {label: '您小学班主任的名字是?', loc: 0, value: '您小学班主任的名字是?'},
  {label: '您中学班主任的名字是?', loc: 0, value: '您中学班主任的名字是?'},
  {label: '您高中班主任的名字是?', loc: 0, value: '您高中班主任的名字是?'},
  {label: '您大学班主任的名字是?', loc: 0, value: '您大学班主任的名字是?'},
  {label: '您的小学校名是?', loc: 0, value: '您的小学校名是?'},
  {label: '您母亲的姓名是?', loc: 0, value: '您母亲的姓名是?'},
  {label: '您母亲的生日是?', loc: 0, value: '您母亲的生日是?'},
  {label: '您父亲的姓名是?', loc: 0, value: '您父亲的姓名是?'},
  {label: '您父亲的生日是?', loc: 0, value: '您父亲的生日是?'},
  {label: '您配偶的姓名是?', loc: 0, value: '您配偶的姓名是?'},
  {label: '您配偶的生日是?', loc: 0, value: '您配偶的生日是?'},
  {label: '对您影响最大的人名字是?', loc: 0, value: '对您影响最大的人名字是?'},
  {label: '您最喜欢的运动是?', loc: 0, value: '您最喜欢的运动是?'},
  {label: '您的学号（或工号）是?', loc: 0, value: '您的学号（或工号）是?'},
  {label: '您最喜欢的明星名字是?', loc: 0, value: '您最喜欢的明星名字是?'},
  {label: '您最熟悉的童年好友名字是?', loc: 0, value: '您最熟悉的童年好友名字是?'}
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

// 个人中心菜单
export const menuData = [
  {
    title: '个人中心',
    name: 'personal',
    icon: 'per_you_lefticon',
    noarraw: true,
    children: [
      {to: 'AccountOverview', tit: '账户总览'}
    ]
  },
  {
    title: '财务中心',
    name: 'finance',
    icon: 'per_fina_lefticon',
    children: [
      {to: 'Recharge', tit: '充值'},
      {to: 'Withdrawal', tit: '提现'},
      {to: 'Transfer', tit: '转账'},
      {to: 'RechargeHistory', tit: '充值记录'},
      {to: 'WithdrawalHistory', tit: '提现记录'},
      {to: 'TransferHistory', tit: '转账记录'},
      {to: 'BjltransferHistory', tit: '百家乐转账记录'},
      {to: 'AccountHistory', tit: '账变记录'}
    ]
  },
  {
    title: '游戏记录',
    icon: 'per_history_lefticon',
    name: 'gameHistory',
    children: [
      {to: 'BetHistory', tit: '游戏记录'},
      {to: 'ChaseHistory', tit: '追号记录'},
      {to: 'LotteryReports', tit: '彩票报表'},
      {to: 'BackPointHistory', tit: '返点记录'},
      {to: 'BaccaratReport', tit: '百家乐报表'},
      {to: 'ActivityHistory', tit: '活动记录'}
    ]
  },
  {
    title: '用户管理',
    icon: 'per_users_lefticon',
    name: 'userManage',
    diff: 'teamDiff',
    children: [
      {to: 'MemberManage', tit: '会员管理'},
      {to: 'OrdinaryAccounts', tit: '普通开户'},
      {to: 'LinkAccounts', tit: '链接开户'},
      {to: 'LinkManage', tit: '链接管理'},
      {to: 'ContractWages', tit: '契约分红'},
      {to: 'SalaryContract', tit: '契约工资'}
    ]
  },
  {
    title: '代理中心',
    name: 'teamOverview',
    icon: 'per_agent_lefticon',
    diff: 'teamDiff',
    children: [
      {to: 'TeamOverview', tit: '团队总览'},
      {to: 'TeamAccountChange', tit: '团队账变'},
      {to: 'TeamRechargeWithdrawal', tit: '团队充提'},
      {to: 'TeamReport', tit: '团队报表'},
      {to: 'TeamLotteryReport', tit: '团队彩票报表'},
      {to: 'TeamBet', tit: '团队投注'},
      {to: 'TeamBaccaratReport', tit: '团队百家乐报表'}
      // {to: 'BackManage', tit: '个人分红'},
      // {to: 'DailyDividend', tit: '日分红报表'},
    ]
  },
  {
    title: '平台服务',
    name: 'inbox',
    icon: 'social_windows',
    children: [
      {to: 'Baccarat', tit: '百家乐'},
      {to: 'OfficialNews', tit: '官方公告'},
      {to: 'Messages', tit: '消息中心'}
    ]
  }
]

export const orderTypes = [
  {
    label: '彩票',
    id: 1,
    value: 0
  }, {
    label: '快乐彩',
    id: 2,
    value: 1
  }, {
    label: '百家乐',
    id: 3,
    value: 2
  }
]

// 最近开奖记录根据activePlay.code做相应的显示
export const showOpenCodeListRule = (code) => {
  switch (code) {
    case 'lo1_5x_fs':
    case 'lo1_5x_ds':
    case 'lo1_5x_zh':
    case 'lo1_5x_120':
    case 'lo1_5x_60':
    case 'lo1_5x_30':
    case 'lo1_5x_20':
    case 'lo1_5x_10':
    case 'lo1_5x_5':
    case 'lo1_dxds_hz':
      return [0, 1, 2, 3, 4]
      break
    case 'lo1_q4_fs':
    case 'lo1_q4_ds':
    case 'lo1_q4_zh':
    case 'lo1_q4_24':
    case 'lo1_q4_12':
    case 'lo1_q4_6':
    case 'lo1_q4_4':
      return [0, 1, 2, 3]
      break
    case 'lo1_h4_fs':
    case 'lo1_h4_ds':
    case 'lo1_h4_zh':
    case 'lo1_h4_24':
    case 'lo1_h4_12':
    case 'lo1_h4_6':
    case 'lo1_h4_4':
      return [1, 2, 3, 4]
      break
    case 'lo1_q3_fs':
    case 'lo1_q3_ds':
    case 'lo1_q3_3':
    case 'lo1_q3_z3td':
    case 'lo1_q3_6':
    case 'lo1_q3_z6td':
    case 'lo1_q3_hh':
    case 'lo1_bd_q31m':
    case 'lo1_bd_q32m':
    case 'lo1_kd_q3kd':
    case 'lo1_hz_zhixqs':
    case 'lo1_hz_zuxqs':
    case 'lo1_hz_wsqs':
    case 'lo2_3x_q3fs':
    case 'lo2_3x_q3ds':
    case 'lo2_3x_zuq3fs':
    case 'lo2_3x_zuq3dt':
    case 'lo2_bd_q3w':
      return [0, 1, 2]
      break
    case 'lo1_z3_fs':
    case 'lo1_z3_ds':
    case 'lo1_z3_3':
    case 'lo1_z3_z3td':
    case 'lo1_z3_6':
    case 'lo1_z3_z6td':
    case 'lo1_z3_hh':
    case 'lo1_bd_z31m':
    case 'lo1_bd_z32m':
    case 'lo1_kd_z3kd':
    case 'lo1_hz_zhixzs':
    case 'lo1_hz_zuxzs':
    case 'lo1_hz_wszs':
    case 'lo2_3x_z3fs':
    case 'lo2_3x_z3ds':
    case 'lo2_3x_zuz3fs':
    case 'lo2_3x_zuz3dt':
    case 'lo2_bd_z3w':
      return [1, 2, 3]
      break
    case 'lo1_h3_fs':
    case 'lo1_h3_ds':
    case 'lo1_h3_3':
    case 'lo1_h3_z3td':
    case 'lo1_h3_6':
    case 'lo1_h3_z6td':
    case 'lo1_h3_hh':
    case 'lo1_bd_h31m':
    case 'lo1_bd_h32m':
    case 'lo1_kd_h3kd':
    case 'lo1_hz_zhixhs':
    case 'lo1_hz_zuxhs':
    case 'lo1_hz_wshs':
    case 'lo2_3x_h3fs':
    case 'lo2_3x_h3ds':
    case 'lo2_3x_zuh3fs':
    case 'lo2_3x_zuh3dt':
    case 'lo2_bd_h3w':
      return [2, 3, 4]
    case 'lo1_2x_q2fs':
    case 'lo1_2x_q2ds':
    case 'lo1_2x_zuq2fs':
    case 'lo1_2x_zuq2ds':
    case 'lo1_kd_q2kd':
    case 'lo1_dxds_q2':
    case 'lo1_hz_zhixqe':
    case 'lo1_lh_wq':
    case 'lo1_h_wq':
    case 'lo2_2x_q2fs':
    case 'lo2_2x_q2ds':
    case 'lo2_2x_zuq2fs':
    case 'lo2_2x_zuq2dt':
      return [0, 1]
      break
    case 'lo1_lh_wb':
    case 'lo1_h_wb':
      return [0, 2]
      break
    case 'lo1_lh_ws':
    case 'lo1_h_ws':
      return [0, 3]
      break
    case 'lo1_lh_wg':
    case 'lo1_h_wg':
      return [0, 4]
      break
    case 'lo1_lh_qb':
    case 'lo1_h_qb':
      return [1, 2]
      break
    case 'lo1_lh_qs':
    case 'lo1_h_qs':
      return [1, 3]
      break
    case 'lo1_lh_qg':
    case 'lo1_h_qg':
      return [1, 4]
      break
    case 'lo1_lh_bs':
    case 'lo1_h_bs':
      return [2, 3]
      break
    case 'lo1_lh_bg':
    case 'lo1_h_bg':
      return [2, 4]
      break
    case 'lo1_lh_sg':
    case 'lo1_h_sg':
    case 'lo1_2x_h2fs':
    case 'lo1_2x_h2ds':
    case 'lo1_2x_zuh2fs':
    case 'lo1_2x_zuh2ds':
    case 'lo1_kd_h2kd':
    case 'lo1_dxds_h2':
    case 'lo1_hz_zhixhe':
    case 'lo2_2x_h2fs':
    case 'lo2_2x_h2ds':
    case 'lo2_2x_zuh2fs':
    case 'lo2_2x_zuh2dt':
      return [3, 4]
      break
    default:
      return []
  }
}
