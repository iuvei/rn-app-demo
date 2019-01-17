import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text
} from 'react-native'
import {
  InputItem,
  List,
  Button,
  WhiteSpace,
  Toast,
  Modal,
  Picker
} from '@ant-design/react-native'
import { AsetUserPlatfrom } from '../../actions/common'
import { AsetAllBalance } from '../../actions/member'
import {
  commissionTransfer,
  dividentTransfer,
  bacTransfer,
  activityTransfer,
  envelopeTransfer
} from '../../api/member'

class Transfer extends React.Component {
  static navigationOptions = {
    title: '转账'
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      outCode: '',
      toCode: '',
      amount: '',
      toObj: {},
      outObj: {},
      allAccs: []
    }
    props.AsetAllBalance(props.loginInfo.acc.user.userId)
    props.AsetUserPlatfrom()
  }

  componentWillReceiveProps(nextProps) {
    let { userPlatformInfo } = nextProps
    let arr = [{label: '系统账户', value: '系统账户', partnerCode: '-1', partnerName: '系统账户'}]
    for (let i = 0; i < userPlatformInfo.length; i++) {
      let item = userPlatformInfo[i]
      if (item.partnerStatus === 0) {
        arr.push({...item, label: item.partnerName, value: item.partnerName})
      }
    }
    this.setState({
      allAccs: arr
    })
  }

  submitFunc = () => {
    let { amount, toCode, outCode } = this.state
    let { loginInfo } = this.props
    if (outCode === '' || toCode === '') {
      Toast.info('请选择转出账户和转入账户')
      return
    }
    if (outCode === toCode) {
      Toast.info('转出账户和转入账户不能是同一个账户')
      return
    }
    let pattern = /^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/
    if (!pattern.test(amount)) {
      Toast.info('请输入正确的转账金额，最多两位小数!')
      return
    }
    this.setState({
      isLoading: true
    }, () => {
      bacTransfer({amount, toCode, outCode, userId: loginInfo.acc.user.userId}).then(res => {
        this.setState({
          isLoading: false
        })
        if (res.code === 0) {
          Toast.success(res.message || '转账成功')
        } else {
          if (res.message === 'Customer not exist' || res.message === 'Platform not exist') {
            Toast.fail('该百家乐平台暂未开通')
            return
          }
          Toast.fail(res.message || '网络异常，请稍后重试')
        }
      })
    })
  }

  toCommissionTransfer = () => {
    Modal.alert('您确认将返点余额转出到主账户吗？', '', [
      {
        text: '取消',
        onPress: () => {console.log('cancel')},
        style: 'cancel',
      },
      { text: '确认', onPress: () => {
        commissionTransfer().then((res) => {
          if (res.code === 0) {
            Toast.success('转出成功')
            setTimeout(() => {
              this.props.AsetAllBalance(this.props.loginInfo.acc.user.userId)
            }, 50)
          } else {
            Toast.fail(res.message || '网络异常')
          }
        })
      } },
    ])
  }

  toDividentTransferHb = () => {
    Modal.alert('您确认将红包余额转入到主账户吗？', '', [
      {
        text: '取消',
        onPress: () => {console.log('cancel')},
        style: 'cancel',
      },
      { text: '确认', onPress: () => {
        envelopeTransfer().then((res) => {
          if (res.code === 0) {
            Toast.success('转出成功')
            setTimeout(() => {
              this.props.AsetAllBalance(this.props.loginInfo.acc.user.userId)
            }, 50)
          } else {
            Toast.fail(res.message || '网络异常')
          }
        })
      } },
    ])
  }

  toDividentTransfer = () => {
    Modal.alert('您确认将分红余额转出到主账户吗？', '', [
      {
        text: '取消',
        onPress: () => {console.log('cancel')},
        style: 'cancel',
      },
      { text: '确认', onPress: () => {
        dividentTransfer().then((res) => {
          if (res.code === 0) {
            Toast.success('转出成功')
            setTimeout(() => {
              this.props.AsetAllBalance(this.props.loginInfo.acc.user.userId)
            }, 50)
          } else {
            Toast.fail(res.message || '网络异常')
          }
        })
      } },
    ])
  }

  toActivityTransfer = () => {
    Modal.alert('您确认将活动余额转出到主账户吗？', '', [
      {
        text: '取消',
        onPress: () => {console.log('cancel')},
        style: 'cancel',
      },
      { text: '确认', onPress: () => {
        if (this.props.userBalanceInfoHD.currentBalance - this.props.userBalanceInfoHD.freezeBalance > 0) {
          activityTransfer().then((res) => {
            if (res.code === 0) {
              Toast.success('转出成功')
              setTimeout(() => {
                this.props.AsetAllBalance(this.props.loginInfo.acc.user.userId)
              }, 50)
            } else {
              Toast.fail(res.message || '网络异常')
            }
          })
        } else {
          Toast.fail('活动可转出金额不足！！！')
        }
      } },
    ])
  }

  render() {
    let {userBalanceInfoFD, userBalanceInfoFH, userBalanceInfoHD, userBalanceInfoHB} = this.props
    let { allAccs, amount, toObj, outObj, isLoading }= this.state

    return (
      <View style={{flex: 1, backgroundColor: '#f0f0f0'}}>
        <WhiteSpace size="sm" />
        <List>
          {
            Object.keys(userBalanceInfoFD).length > 0  &&
            <InputItem
              editable={false}
              labelNumber={6}
              value={userBalanceInfoFD.currentBalance + '元'}
              extra={userBalanceInfoFD.currentBalance > 0 &&
                <Button type="warning" size="small" onPress={this.toCommissionTransfer}>转出主账户</Button>
              }
            >返点总额</InputItem>
          }
          {
            Object.keys(userBalanceInfoFH).length > 0  &&
            <InputItem
              editable={false}
              labelNumber={6}
              value={userBalanceInfoFH.currentBalance + '元'}
              extra={userBalanceInfoFH.currentBalance > 0 &&
                <Button type="warning" size="small" onPress={this.toDividentTransfer}>转出主账户</Button>
              }
            >分红总额</InputItem>
          }
          {
            Object.keys(userBalanceInfoHB).length > 0  &&
            <InputItem
              editable={false}
              labelNumber={6}
              value={userBalanceInfoHB.currentBalance + '元'}
              extra={userBalanceInfoHB.currentBalance > 0 &&
                <Button type="warning" size="small" onPress={this.toDividentTransferHb}>转出主账户</Button>
              }
            >红包总额</InputItem>
          }
          {
            Object.keys(userBalanceInfoHD).length > 0 &&
            <InputItem
              editable={false}
              labelNumber={6}
              value={userBalanceInfoHD.currentBalance + '元'}
              extra={userBalanceInfoHD.currentBalance > 0 &&
                <Button type="warning" size="small" onPress={this.toActivityTransfer}>转出主账户</Button>
              }
            >活动总额</InputItem>
          }
          {
            Object.keys(userBalanceInfoHD).length > 0  &&
            <InputItem
              editable={false}
              labelNumber={6}
              value={userBalanceInfoHD.freezeBalance + '元'}
            >活动冻结总额</InputItem>
          }
        </List>
        <List
          renderHeader={<Text style={{lineHeight: 36, color: '#a0a0a0', paddingLeft: 16}}>百家乐转账</Text>}
        >
          {
            allAccs.length > 0 &&
            <Picker
              data={allAccs}
              cols={1}
              value={[outObj.value,]}
              itemStyle={{color: '#333333', fontSize: 14, lineHeight: 32}}
              onChange={(val) => {
                let tmp = allAccs.filter(item => {
                  return item.value === val[0]
                })
                this.setState({
                  outCode: tmp[0].partnerCode,
                  outObj: tmp[0]
                })
              }}
            >
              <List.Item
                arrow="horizontal"
              >转出账户</List.Item>
            </Picker>
          }
          {
            allAccs.length > 0 &&
            <Picker
              data={allAccs}
              cols={1}
              value={[toObj.value,]}
              itemStyle={{color: '#333333', fontSize: 14, lineHeight: 32}}
              onChange={(val) => {
                let tmp = allAccs.filter(item => {
                  return item.value === val[0]
                })
                this.setState({
                  toCode: tmp[0].partnerCode,
                  toObj: tmp[0]
                })
              }}
            >
              <List.Item
                arrow="horizontal"
                extra={<Text>{toObj.label}</Text>}
              >转入账户</List.Item>
            </Picker>
          }
          <InputItem
            placeholder="请输入转账金额"
            value={amount}
            type="number"
            onChange={val => this.setState({
              amount: val
            })}
          >
            金额
          </InputItem>
        </List>
        <View style={{paddingHorizontal: 30, paddingVertical: 15, alignItems: 'center'}}>
          <Button type="primary" loading={isLoading} onPress={this.submitFunc} style={{width: '100%'}}>
            确认
          </Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let { userPlatformInfo, loginInfo } = state.common
  let { userBalanceInfo, userBalanceInfoFD, userBalanceInfoFH, userBalanceInfoHD, userBalanceInfoHB } = state.member
  return {
    loginInfo,
    userPlatformInfo,
    userBalanceInfo,
    userBalanceInfoFD,
    userBalanceInfoFH,
    userBalanceInfoHD,
    userBalanceInfoHB
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AsetUserPlatfrom: (data) => { dispatch(AsetUserPlatfrom(data)) },
    AsetAllBalance: (data) => { dispatch(AsetAllBalance(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transfer)
