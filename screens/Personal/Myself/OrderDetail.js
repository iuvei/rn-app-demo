import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native'
import {
  Flex,
  Button,
  Modal,
  Toast
} from '@ant-design/react-native'
import { orderStatus } from '../../../data/options'
import { queryOrderDetails, doCancelOrder } from '../../../api/member'

class OrderDetail extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: '订单详情'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      keyList: [
        {key: 'orderId', title: '订单编号'},
        {key: 'lotterName', title: '彩种'},
        {key: 'ruleName', title: '玩法'},
        {key: 'castMode', title: '资金模式'},
        // {key: 'rewardLevel', title: '奖级'},
        {key: 'castAmount', title: '投注金额'},
        {key: 'rewardAndRebate', title: '奖金/返点'},
        {key: 'profit', title: '盈亏金额'},
        {key: 'orderTime', title: '加入时间'},
        {key: 'orderIssue', title: '期号'},
        // {key: 'nums', title: '注数', desc: '注'},
        {key: 'castMultiple', title: '倍数', desc: '倍'},
        // {key: 'stopTime', title: '截止时间'},
        {key: 'bonus', title: '中奖金额'},
        {key: 'openCode', title: '开奖号码'},
        {key: 'castCodes', title: '投注号码'},
      ],
      detailInfo: props.navigation.getParam('detail', {})
    }
    queryOrderDetails({userId: props.loginInfo.acc.user.userId, orderId: props.navigation.getParam('detail', {}).orderId}).then(res => {
      if (res.code === 0) {
        this.setState(prevState => ({
          detailInfo: {...prevState.detailInfo, ...res.data}
        }))
      }
    })
  }

  cancelOrder = () => {
    let {detailInfo} = this.state
    let {orderId, index} = detailInfo
    let formData = {orderId, userId: this.props.loginInfo.acc.user.userId}
    Modal.alert('您确认撤销这笔订单吗？', '', [
      {
        text: '取消',
        onPress: () => {console.log('cancel')},
        style: 'cancel',
      },
      { text: '确认', onPress: () => {
        doCancelOrder(formData).then((res) => {
          if (res.code === 0) {
            Toast.success('撤单成功')
            this.setState(prevState => ({
              detailInfo: {...prevState.detailInfo, status: -2, isRevoked: false}
            }))
            // this.AsetCancelOrder({time: new Date().getTime(), index: index})
            setTimeout(() => {
              // this.props.AsetAllBalance(this.props.loginInfo.acc.user.userId)
            }, 50)
          } else {
            Toast.fail(res.message || '网络异常')
          }
          // this.afterCancelOrder({res, orderItem})
        })
      } },
    ])
  }

  render() {
    let { detailInfo, keyList } = this.state
    let statusobj = orderStatus.filter(obj => {
      return obj.value === detailInfo.status
    })[0]

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{height: 9, width: '100%', backgroundColor: '#005baf', borderRadius: 10}}>
            <Image source={require('../../../assets/images/detail_top.png')} style={{height: 9, width: '100%'}}/>
          </View>
          <Text style={{fontSize: 20, lineHeight: 44, textAlign: 'center', color: statusobj.color, marginTop: -5, backgroundColor: '#fff', width: '98%'}}>{statusobj.label}</Text>
          {
            keyList.map(item => {
              return (
                <View style={{backgroundColor: '#fff', width: '98%'}} key={item.title}>
                  <Flex>
                    <Text style={{width: 100, paddingLeft: 20, color: '#a4a4a4', lineHeight: 32, fontSize: 14}}>{item.title}</Text>
                    <Text style={{flex: 1, textAlign: 'right', color: '#585858', paddingRight: 16, lineHeight: 32, fontSize: 14}}>{item.formatter ? item.formatter(detailInfo[item.key]) : detailInfo[item.key]}</Text>
                  </Flex>
                  <Image source={require('../../../assets/images/detail_dashed.png')} style={{width: '100%', height: 0.5}} />
                </View>
              )
            })
          }
          {
            Boolean(detailInfo.isRevoked) &&
            <View style={{backgroundColor: '#fff', paddingTop: 16, width: '98%', alignItems: 'center'}}>
              <Button type="warning" size="small" style={{width: 90}} onPress={this.cancelOrder}>
                撤销订单
              </Button>
            </View>
          }
          <Image source={require('../../../assets/images/detail_bottom.png')} style={{width: '98%'}}/>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, props) => {
  let {loginInfo} = state.common
  return {loginInfo}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#f0f0f0',
    alignItems: 'center'
  }
})
