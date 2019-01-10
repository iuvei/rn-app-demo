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
  WhiteSpace
} from '@ant-design/react-native'
import { AsetUserPlatfrom } from '../../actions/common'

class Transfer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      outCode: '-1',
      toCode: '-1',
      amount: '',
      toObj: {},
      outObj: {},
      allAccs: []
    }
    console.log(props)
    props.AsetUserPlatfrom()
  }

  componentDidMount() {
    let { userPlatformInfo } = this.props
    let arr = [{label: '系统账户', value: -1}]
    for (let i = 0; i < userPlatformInfo.length; i++) {
      let item = userPlatformInfo[i]
      if (item.partnerStatus === 0) {
        arr.push({label: item.partnerName, value: item.partnerCode})
      }
    }
    this.setState({
      allAccs: arr
    })
  }

  render() {
    let {userBalanceInfoFD, userBalanceInfoFH, userBalanceInfoHD, userBalanceInfoHB} = this.props
    let { allAccs, amount, toObj, outObj }= this.state

    return (
      <View>
        <List>
          {
            Object.keys(userBalanceInfoFD).length &&
            <InputItem
              editable={false}
              labelNumber={6}
              value={userBalanceInfoFD.currentBalance + '元'}
              extra={userBalanceInfoFD.currentBalance > 0 &&
                <Button type="warning" size="small">转出主账户</Button>
              }
            >返点总额</InputItem>
          }
          {
            Object.keys(userBalanceInfoFH).length &&
            <InputItem
              editable={false}
              labelNumber={6}
              value={userBalanceInfoFH.currentBalance + '元'}
              extra={userBalanceInfoFH.currentBalance > 0 &&
                <Button type="warning" size="small">转出主账户</Button>
              }
            >分红总额</InputItem>
          }
          {
            Object.keys(userBalanceInfoHB).length &&
            <InputItem
              editable={false}
              labelNumber={6}
              value={userBalanceInfoHB.currentBalance + '元'}
              extra={userBalanceInfoHB.currentBalance > 0 &&
                <Button type="warning" size="small">转出主账户</Button>
              }
            >红包总额</InputItem>
          }
          {
            Object.keys(userBalanceInfoHD).length &&
            <InputItem
              editable={false}
              labelNumber={6}
              value={userBalanceInfoHD.currentBalance + '元'}
              extra={userBalanceInfoHD.currentBalance > 0 &&
                <Button type="warning" size="small">转出主账户</Button>
              }
            >活动总额</InputItem>
          }
          {
            Object.keys(userBalanceInfoHD).length &&
            <InputItem
              editable={false}
              labelNumber={6}
              value={userBalanceInfoHD.freezeBalance + '元'}
            >活动冻结总额</InputItem>
          }
        </List>
        <WhiteSpace size="sm" />
        <List
          renderHeader={<Text>百家乐转账</Text>}
        >
          {
            allAccs.length > 0 &&
            <Picker
              data={allAccs}
              cols={1}
              value={''}
              itemStyle={{color: '#333333', fontSize: 14, lineHeight: 32}}
              onChange={(val) => {
                let tmp = allAccs.filter(item => {
                  return item.partnerCode === val[0]
                })
                this.setState({
                  outCode: val[0],
                  outObj: tmp[0]
                })
              }}
            >
              <List.Item
                arrow="horizontal"
                extra={<Text>{outObj.label}</Text>}
              >转出账户</List.Item>
            </Picker>
          }
          {
            allAccs.length > 0 &&
            <Picker
              data={allAccs}
              cols={1}
              value={''}
              itemStyle={{color: '#333333', fontSize: 14, lineHeight: 32}}
              onChange={(val) => {
                let tmp = allAccs.filter(item => {
                  return item.partnerCode === val[0]
                })
                this.setState({
                  toCode: val[0],
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
          >
            金额
          </InputItem>
        </List>
        <View>
          <Button type="primary">
            确认
          </Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let { userPlatformInfo } = state.common
  let { userBalanceInfo, userBalanceInfoFD, userBalanceInfoFH, userBalanceInfoHD, userBalanceInfoHB } = state.member
  return {
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
    AsetUserPlatfrom: (data) => { dispatch(AsetUserPlatfrom(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transfer)
