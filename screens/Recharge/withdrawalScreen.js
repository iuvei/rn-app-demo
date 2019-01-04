import React from 'react'
import {connect} from 'react-redux'
import {ScrollView, StyleSheet, ImageBackground, Text, View, Dimensions} from 'react-native'
import {Picker, Button, List, InputItem, Modal, Toast } from '@ant-design/react-native'
import {MyIconFont} from '../../components/MyIconFont'
import {RechargeChannelIconMap} from '../../constants/glyphMapHex'
import {
  AsetAllBalance,
  AsetUserBankCards,
  AsetIsAllowWithdraw,
  AsetUserConsume
} from '../../actions/member'
import {getUserBankcards, isAllowWithdraw, getUserConsume} from '../../api/basic'
import { commitWithdrawal } from '../../api/member'

const height = Dimensions.get('window').height

class Withdrawal extends React.Component {
  static navigationOptions = {
    // header: null
    title: '提现'
  }

  constructor(props) {
    super(props)
    this.state = {
      curBankItem: {},
      pickerdata: [],
      showSonOrders: false,
      isLoading: false,
      amount: '',
      totalFee: 0,
      actualWithdraw: 0,
      currencyCode: 'CNY',
      payType: 1, // 支付类型0充值 1提现
      pwd: '', // 资金密码
      pwdType: 0, // 密码类型（0交易密码 1谷歌验证码）
      sonOrderList: [] // 拆单-子订单集合
    }
    props.AsetAllBalance(props.loginInfo.acc.user.userId)
    getUserBankcards({userId: props.loginInfo.acc.user.userId}).then(res => {
      if (res.code === 0) {
        this.props.AsetUserBankCards(res.data)
      } else {
        this.props.AsetUserBankCards({
          userBankCards: [],
          bankTime: 6
        })
      }
    })
    isAllowWithdraw().then(res => {
      if (res.code === 0) {
        this.props.AsetIsAllowWithdraw({sign: res.data.sign, message: res.message})
      } else {
        this.props.AsetIsAllowWithdraw({sign: false, message: ''})
      }
    })
    getUserConsume().then(res => {
      if (res.code === 0) {
        this.props.AsetUserConsume(Object.assign({}, res.data, {code: 0}))
      } else {
        this.props.AsetUserConsume({code: res.code, message: res.message})
      }
    })
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    let { userBankInfo } = nextProps
    let curBankItem = {}
    let arr = userBankInfo.userBankCards.map((item, idx) => {
      if (idx === 0) {
        curBankItem = Object.assign({}, item, {value: 0, label: item.bankName + '  ' + String(item.bankCard).slice(-5, -1)})
      }
      return {value: idx, label: item.bankName + '  ' + String(item.bankCard).slice(-5, -1), ...item}
    })
    this.setState({
      pickerdata: [].concat(arr),
      curBankItem: Object.assign({}, curBankItem)
    })
  }

  // 银行卡绑定时间判断
  checkBankTime = (bankItem) => {
    let b = false
    if (bankItem.bankCard) {
      let { bankTime } = this.props.userBankInfo
      // 判断绑定时间距离现在有没有超过 6 小时
      // 6 小时改为字段 bankTime
      let time = (new Date()).getTime()
      let space = Number(bankTime) * 60 * 60 * 1000
      if (time - bankItem.createTime <= space) {
        Toast.info(`新绑定银行卡${bankTime}小时后才可以发起提现，请您换一张银行卡提现`)
        b = true
      }
    }
    return b
  }

  /** @description
   * 拆单和计算手续费
   */
  sonOrderAndFee(amount) {
    let {canWithdrawBalance} = this.props.userBalanceInfoYE
    let {minMoney, maxMoney, freeTimes, alredTimes, maxFee, minFee, feeScale} = this.props.userConsume
    this.setState({
      totalFee: 0,
      actualWithdraw: 0,
      sonOrderList: []
    })
    let val = Math.floor(Number(amount || this.state.amount) * 10000) / 10000
    let newval = 0
    let totalFee = 0
    let sonOrderList = []
    if (Number(val) >= minMoney && Number(val) <= canWithdrawBalance) { // this.formData.payChannelCode !== '' &&
      console.log('计算拆单和手续费...')
      const freeTimesleft = freeTimes - alredTimes // 当前剩余免费次数
      // 拆单
      let orderCount = Math.ceil(val / maxMoney)  // 子订单个数
      for (let i = 0; i < orderCount; i++) {
        let obj = {
          SonOrder: '',
          amount: 0,
          originamount: 0,
          fee: 0
        }
        obj.SonOrder = 'wd_' + new Date().getTime()
        if ((i === orderCount - 1) && (val % maxMoney > 0)) {
          obj.amount = val % maxMoney
        } else {
          obj.amount = maxMoney
        }
        if (freeTimesleft >= orderCount || i < freeTimesleft) {
          obj.fee = 0
        } else {
          let fee = obj.amount * feeScale / 100
          obj.fee = fee > maxFee ? maxFee : (fee < minFee ? minFee : fee)
        }
        obj.originamount = obj.amount
        obj.amount -= obj.fee
        if (obj.originamount >= minMoney) {
          totalFee += obj.fee
          sonOrderList.push({
            SonOrder: obj.SonOrder,
            amount: Number(obj.amount).toFixed(4),
            originamount: Number(obj.originamount).toFixed(4),
            fee: Number(obj.fee).toFixed(4)
          })
          newval += obj.originamount
        } else {
          // this.$toast.success(`您当前输入金额拆单后最后一笔小于最小提款金额${this.minMoney}元，已为您优化提款金额`)
        }
      }
      this.setState({
        actualWithdraw: Number(newval - totalFee).toFixed(4),
        amount: String(newval),
        totalFee: Number(totalFee).toFixed(4),
        sonOrderList: sonOrderList
      })
    }
  }

  /** @description
   * 确认提现按钮
   */
  submitFunc = () => {
    // if (!this.checkBindPay()) return
    let {curBankItem, currencyCode, payType, pwd, pwdType, sonOrderList} = this.state
    let { bankCard } = curBankItem
    let { bankTime } = this.props.userBankInfo
    if (this.checkBankTime(curBankItem)) {
      Toast.info(`新绑定银行卡${bankTime}小时后才可以发起提现，请您换一张银行卡提现`)
      return
    }
    // 判断当前时间是否在 09:00:00 至 第二天 03:00:00 时间段
    let now = new Date()
    let hour = (now.getUTCHours() + 8) % 24 // 东八区
    console.log('北京时间小时 === ', hour)
    this.setState({
      isLoading: true
    })
    if (hour > 8 || hour < 3) {
      commitWithdrawal({bankCard, currencyCode, payType, pwd, pwdType, sonOrderList}).then((res) => {
        this.setState({
          isLoading: false,
          amount: '',
          totalFee: '',
          pwd: '',
          actualWithdraw: '',
          sonOrderList: []
        })
        let error = res.code === 0
        // this.AgetUserSecurityLevel()
        error ? Toast.success('提现申请已提交') : Toast.fail(res.message)
        // this.AgetUserBalance()
        // this.AgetUserConsume()
      })
    } else {
      Toast.info('提现时间：从北京时间 09:00:00 至 第二天 03:00:00 （24小时制）')
    }
  }

  render() {
    let { submitFunc } = this
    let { isAllowWithdraw, userConsume, userBalanceInfoYE} = this.props
    let {curBankItem, amount, totalFee, actualWithdraw, pwd, isLoading, sonOrderList, showSonOrders, pickerdata} = this.state

    if (isAllowWithdraw.local) {
      return <View></View>
    }

    if (!isAllowWithdraw.sign || userConsume.code !== 0) {
      return (
        <View style={{backgroundColor: '#fff'}}>
          <Text style={{color: '#f15a23', fontSize: 14, lineHeight: 30, textAlign: 'center'}}>温馨提示：您当前不可提现，如有疑问请联系客服</Text>
          {
            !isAllowWithdraw.sign && <Text style={{color: '#f15a23', fontSize: 14, lineHeight: 30, textAlign: 'center'}}>{isAllowWithdraw.message}</Text>
          }
          <Text style={{color: '#f15a23', fontSize: 14, lineHeight: 30, textAlign: 'center'}}>{userConsume.message}</Text>
        </View>
      )
    }

    if (userConsume.status === 1) {
      return (
        <View style={{backgroundColor: '#fff'}}>
          <Text style={{color: '#f15a23', fontSize: 14, lineHeight: 30, textAlign: 'center'}}>温馨提示：{userConsume.remark}</Text>
        </View>
      )
    }

    if (userConsume.status === 0) {
      return (
        <ScrollView style={{height: height}}>
          <ImageBackground source={require('../../assets/images/withdraw_bg1.jpg')}
            style={{width: '100%', height: 120, alignItems: 'center', paddingTop: 26}}>
            <Text style={{fontSize: 32, color: '#ffffff'}}>{userBalanceInfoYE.canWithdrawBalance}</Text>
            <Text style={{fontSize: 14, color: '#ffffff'}}>可提金额(元)</Text>
          </ImageBackground>
          {
            curBankItem.bankCard ?
            <List>
              <Picker
                data={pickerdata}
                cols={1}
                value={[curBankItem.value]}
                onChange={(val) => {
                  this.setState({
                    curBankItem: pickerdata[val[0]]
                  })
                }}
              >
                <List.Item
                  arrow="horizontal"
                  thumb={
                    curBankItem.bankCode ?
                      <MyIconFont name={'icon_' + RechargeChannelIconMap[curBankItem.bankCode]} size={30}/> : null
                  }
                ></List.Item>
              </Picker>
            </List> :
            <View style={{backgroundColor: '#fff'}}>
              <Text style={{color: '#f15a23', fontSize: 14, lineHeight: 30, textAlign: 'center'}}>请您先前往绑卡页面添加银行卡！</Text>
            </View>
          }
          <View style={{padding: 12}}>
            <Text style={{color: '#a4a4a4', lineHeight: 24, fontSize: 12}}>提现限制：您今天已提现 <Text
              style={{color: '#f15a23'}}>{userConsume.alredTimes}</Text> 次；今日已提金额：<Text
              style={{color: '#f15a23'}}>{userConsume.alredMoney}</Text>
              元；单笔最小额提现：<Text style={{color: '#f15a23'}}>{userConsume.minMoney}</Text> 元；单笔最大额提现：<Text
                style={{color: '#f15a23'}}>{userConsume.maxMoney}</Text> 元。
              系统消费比例限制为：<Text style={{color: '#f15a23'}}>{userConsume.feeRatio}%</Text>。您的彩票所需消费量为：<Text
                style={{color: '#f15a23'}}>{userConsume.consumeQuota}</Text> 元</Text>
            <Text style={{color: '#a4a4a4', lineHeight: 24, fontSize: 12}}>手续费说明：每日免费提现次数为 <Text
              style={{color: '#f15a23'}}>{userConsume.freeTimes}</Text> 次，您已经免费提现 <Text
              style={{color: '#f15a23'}}>{userConsume.alredTimes < userConsume.freeTimes ? userConsume.alredTimes : userConsume.freeTimes}</Text> 次，
              超出后将按单笔 <Text style={{color: '#f15a23'}}>{userConsume.feeScale} %</Text> 的比例收取手续费，单笔最小手续费 <Text
                style={{color: '#f15a23'}}>{userConsume.minFee}</Text> 元，单笔最高手续费 <Text
                style={{color: '#f15a23'}}>{userConsume.maxFee}</Text> 元</Text>
          </View>
          <List>
            <InputItem
              value={amount}
              onChange={value => {
                this.setState({
                  amount: value
                })
                this.sonOrderAndFee(Number(value))
              }
              }
              placeholder="请输入充值金额"
            >
              提款金额
            </InputItem>
            <List.Item
              extra={totalFee}
            >
              手续费
            </List.Item>
            <List.Item
              extra={actualWithdraw}
            >
              实际到账
            </List.Item>
            <List.Item
              extra={<Button type="primary" size="small" onPress={() => {
                this.setState({
                  showSonOrders: true
                })
              }}>查看拆单</Button>}
            >
              您当前提款可能产生拆单
            </List.Item>
            <InputItem
              value={pwd}
              onChange={value => {
                this.setState({
                  pwd: value
                })
              }
              }
              placeholder="请输入资金密码"
              type="password"
            >
              资金密码
            </InputItem>
          </List>
          <View style={{paddingLeft: 15, paddingTop: 30, paddingRight: 15}}>
            <Button type="primary" disabled={sonOrderList.length === 0 || !pwd || !curBankItem.bankCard} loading={isLoading}
                    onPress={submitFunc}>提 现</Button>
          </View>
          <View style={{height: 200, padding: 12, alignItems: 'center'}}>
            <Text style={{fontSize: 12, color: '#a4a4a4'}}>提现时间：北京时间 <Text
              style={{color: '#f15a23'}}>09:00:00</Text> 至 第二天 <Text
              style={{color: '#f15a23'}}>03:00:00</Text> (24小时制) </Text>
          </View>
          <Modal
            popup
            closable={true}
            maskClosable={true}
            visible={showSonOrders}
            animationType="slide-up"
            onClose={() => {
              this.setState({
                showSonOrders: false
              })
            }}
          >
            <View style={{ paddingVertical: 10 }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{width: '10%', textAlign: 'center', color: '#555', lineHeight: 32}}>索引</Text>
                <Text style={{width: '35%', textAlign: 'center', color: '#555', lineHeight: 32}}>取款金额</Text>
                <Text style={{width: '35%', textAlign: 'center', color: '#555', lineHeight: 32}}>实际到账</Text>
                <Text style={{width: '20%', textAlign: 'center', color: '#555', lineHeight: 32}}>手续费</Text>
              </View>
              {
                sonOrderList.map((item, idx) => {
                  return <View style={{flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: '#cacaca'}} key={idx}>
                    <Text style={{width: '10%', textAlign: 'center', color: '#555', lineHeight: 32}}>{idx+1}</Text>
                    <Text style={{width: '35%', textAlign: 'center', color: '#555', lineHeight: 32}}>{item.originamount}</Text>
                    <Text style={{width: '35%', textAlign: 'center', color: '#555', lineHeight: 32}}>{item.amount}</Text>
                    <Text style={{width: '20%', textAlign: 'center', color: '#555', lineHeight: 32}}>{item.fee}</Text>
                  </View>
                })
              }
              {
                sonOrderList.length === 0 &&
                <View style={{lineHeight: 50, borderTopWidth: 0.5, borderTopColor: '#cacaca'}}>
                  <Text style={{lineHeight: 50, textAlign: 'center', color: '#a4a4a4'}}>暂无数据</Text>
                </View>
              }
            </View>
          </Modal>
        </ScrollView>
      )
    }
  }
}

const mapStateToProps = (state, props) => {
  let {loginInfo} = state.common
  let {userBankInfo, userBalanceInfoYE, isAllowWithdraw, userConsume} = state.member
  return {
    loginInfo,
    userBankInfo,
    userBalanceInfoYE,
    isAllowWithdraw,
    userConsume
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AsetAllBalance: data => dispatch(AsetAllBalance(data)),
    AsetUserBankCards: data => dispatch(AsetUserBankCards(data)),
    AsetIsAllowWithdraw: data => dispatch(AsetIsAllowWithdraw(data)),
    AsetUserConsume: data => dispatch(AsetUserConsume(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Withdrawal)

const styles = StyleSheet.create({})

