import React from 'react'
import { connect } from 'react-redux'
import { isNaN } from 'lodash'
import { View, AsyncStorage } from 'react-native'
import { List, InputItem } from '@ant-design/react-native'
import { styleUtil } from '../../utils/ScreenUtil'
class InputAmount extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      amount: '',
      orderAmount: '',
      rechargeFee: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rechargeTime !== this.props.rechargeTime) {
      this.setState({
        amount: '',
        orderAmount: '',
        rechargeFee: ''
      })
      AsyncStorage.setItem('RechargeMoney', JSON.stringify({
        amount: '',
        orderAmount: '',
        rechargeFee: ''
      }))
    }
  }

  render() {
    let {amount, orderAmount, rechargeFee} = this.state
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
                  AsyncStorage.setItem('RechargeMoney', JSON.stringify(tmp))
                } else {
                  let tmp = {
                    amount: String(value),
                    orderAmount: String(value),
                    rechargeFee: ''
                  }
                  this.setState(tmp)
                  AsyncStorage.setItem('RechargeMoney', JSON.stringify(tmp))
                }
              }
            }}
            placeholder="请输入充值金额"
          >
            充值金额
          </InputItem>
        </List>
        <View style={styleUtil({height: 22, backgroundColor: '#f0f0f0'})}></View>
        <List>
          <List.Item
            extra={orderAmount}
          >
            实际到账
          </List.Item>
        </List>
        <View style={styleUtil({height: 22, backgroundColor: '#f0f0f0'})}></View>
        {
          activeAccount.feeRate > 0 &&
          <List>
            <List.Item
              extra={rechargeFee}
            >
              手续费
            </List.Item>
          </List>
        }
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
