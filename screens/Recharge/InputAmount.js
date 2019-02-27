import React from 'react'
import { connect } from 'react-redux'
import { isNaN } from 'lodash'
import { View, Text, Platform } from 'react-native'
import { List, InputItem, Button, Toast } from '@ant-design/react-native'
import { styleUtil } from '../../utils/ScreenUtil'
import RechargeTutorial from './RechargeTutorial'
import { platformKey, prependUrl } from '../../api.config'
import { commitRecharge } from '../../api/member'
class InputAmount extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      amount: '',
      orderAmount: '',
      rechargeFee: '',
      isLoading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      amount: '',
      orderAmount: '',
      rechargeFee: '',
      isLoading: false,
      returnUrl: 'https://www.baidu.com',
      channelType: Platform.OS,
      isQuick: 'N'
    })
  }
  
  componentWillUnmount(){
    this.setState = () => () => {}
  }

  /**
   * 提交充值
   */
  submitFunc = async () => {
    let {returnUrl, channelType, isQuick, amount, orderAmount, rechargeFee} = this.state
    let {activeAccount} = this.props
    let minRechargeMoney = activeAccount.coinCode ? 100 : 50
    // if (!this.checkBindPay()) return
    let pattern = /^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/
    let msg = '请输入正确的充值金额，最多两位小数!'
    if (activeAccount.isFloat) {
      pattern = /^(([1-9]\d*)(\.\d[1-9]))$|(0\.\d[1-9])$/
      msg = '请输入正确的充值金额，必须是两位小数，且末尾不能是0!'
    }
    if (!pattern.test(Number(amount))) {
      Toast.info(msg)
    } else {
      if (amount < minRechargeMoney) {
        Toast.info(`最小充值 ${minRechargeMoney} 元`)
        return
      }
      this.setState({
        isLoading: true
      }, () => {
        let {bankCode, payChannelAlias, payChannelCode, coinCode} = activeAccount
        commitRecharge({bankCode, channelType, isQuick, orderAmount, payChannelAlias, payChannelCode, rechargeFee, returnUrl, amount, coinCode}).then((res) => {
          if (res.code === 0) {
            let tmprecinfo = Object.assign({}, res.data, {amount: amount})
            this.setState({
              amount: '',
              isLoading: false,
              orderAmount: '',
              rechargeFee: ''
            })
            let qrCodeSrc = prependUrl + '/capital/capitalBase/queryQrCode?platformKey=' + platformKey + '&payChannelCode=' + activeAccount.payChannelCode + '&bankCode=' + activeAccount.bankCode + '&time=' + new Date().getTime()
            this.props.navigation.navigate('RechargeSuccess', {recinfo: tmprecinfo, qrCodeSrc: qrCodeSrc, bankCode: activeAccount.bankCode})
          } else {
            if (res.message.indexOf('}') !== -1) {
              Toast.info(JSON.parse(res.message).Message || '充值服务异常')
            } else {
              Toast.info(res.message || '充值服务异常')
            }
            this.setState({
              amount: '',
              isLoading: false,
              orderAmount: '',
              rechargeFee: ''
            })
          }
        })
      })
    }
  }

  render() {
    let {amount, orderAmount, rechargeFee, isLoading} = this.state
    let {activeAccount} = this.props

    return (
      <View>
        <List>
          <InputItem
            value={amount}
            type="number"
            onChange={value => {
              if (!isNaN(Number(value))) {
                if (activeAccount.feeRate > 0) {
                  let fee = Number(value) * activeAccount.feeRate / 100
                  let tmp = {
                    amount: String(value),
                    orderAmount: String(Number(Number(value) - fee).toFixed(2)),
                    rechargeFee: String(Number(fee).toFixed(2))
                  }
                  this.setState(tmp)
                } else {
                  let tmp = {
                    amount: String(value),
                    orderAmount: String(value),
                    rechargeFee: ''
                  }
                  this.setState(tmp)
                }
              }
            }}
            placeholder="请输入充值金额"
          >
            充值金额
          </InputItem>
          <List.Item
            extra={orderAmount}
          >
            实际到账
          </List.Item>
          {
            activeAccount.feeRate > 0 &&
              <List.Item
                extra={rechargeFee}
              >
                手续费
              </List.Item>
          }
        </List>
        <View style={styleUtil({paddingLeft: 15, paddingTop: 30, paddingRight: 15})}>
          {
            Boolean(activeAccount.coinCode) &&
            <RechargeTutorial/>
          }
          <Button type="primary" loading={isLoading} onPress={this.submitFunc} style={{marginTop: 15}}>下一步</Button>
        </View>
        <View>
          <View style={styleUtil({padding: 12})}>
            <Text style={styleUtil({color: '#a4a4a4', lineHeight: 25})}>充值金额：单笔最低充值金额为 <Text style={{color: '#f15a23'}}>{activeAccount.coinCode ? 100 : 50}</Text> 元{activeAccount.signleLimit > 0 ? <Text>, 最高 <Text style={{color: '#f15a23'}}>{activeAccount.signleLimit}</Text> 元</Text> : null}</Text>
            {activeAccount.feeRate > 0 ? <Text style={styleUtil({color: '#a4a4a4', lineHeight: 25})}>充值手续费费率 <Text style={{color: '#f15a23'}}>{ activeAccount.feeRate || 0 }%</Text></Text> : null}
            {activeAccount.dayLimit > 0 ? <Text style={styleUtil({color: '#a4a4a4', lineHeight: 25})}>充值金额：单日最高 <Text style={{color: '#f15a23'}}>{ activeAccount.dayLimit }</Text> 元</Text> : null}
            <Text style={styleUtil({color: '#a4a4a4', lineHeight: 25})}>充值限时：请在 <Text style={{color: '#f15a23'}}>30</Text> 分钟内完成充值</Text>
            { Boolean(activeAccount.isFloat) && <Text style={{color: '#f15a23', lineHeight: 25, fontSize: 12}}>说明：充值金额必须是两位小数，且末尾不能是0</Text> }
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let {activeAccount} = state.member
  return {activeAccount}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(InputAmount)
