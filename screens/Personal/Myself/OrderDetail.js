import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native'
import {
  Flex,
  Button
} from '@ant-design/react-native'
import { orderStatus } from '../../../data/options'

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
        {key: 'status', title: '状态', after: ''},
        {key: 'orderId', title: '订单编号'},
        {key: 'lotterName', title: '彩种'},
        {key: 'ruleName', title: '玩法'},
        {key: 'castMode', title: '资金模式'},
        // {key: 'rewardLevel', title: '奖级'},
        {key: 'money', title: '投注金额'},
        {key: 'rewardAndRebate', title: '奖金/返点'},
        {key: 'profit', title: '盈亏金额'},
        {key: 'orderTime', title: '加入时间'},
        {key: 'orderIssue', title: '期号'},
        // {key: 'nums', title: '注数', desc: '注'},
        {key: 'castMultiple', title: '倍数', desc: '倍'},
        // {key: 'stopTime', title: '截止时间'},
        {key: 'bonus', title: '中奖金额'},
        {key: 'openCode', title: '开奖号码'}
      ]
    }
  }

  render() {
    let detailInfo = this.props.navigation.getParam('detail', {})
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
            this.state.keyList.map(item => {
              return (
                <View style={{backgroundColor: '#fff', width: '98%'}} key={item.title}>
                  <Flex>
                    <Text style={{width: 100, paddingLeft: 20, color: '#a4a4a4', lineHeight: 32, fontSize: 14}}>{item.title}</Text>
                    <Text style={{flex: 1, textAlign: 'right', color: '#585858', paddingRight: 16, lineHeight: 32, fontSize: 14}}>{detailInfo[item.key]}</Text>
                  </Flex>
                  <Image source={require('../../../assets/images/detail_dashed.png')} style={{width: '100%', height: 0.5}} />
                </View>
            )})
          }
          <View style={{backgroundColor: '#fff', paddingTop: 16, width: '98%', alignItems: 'center'}}>
            <Button type="warning" size="small" style={{width: 90}}>
              撤销订单
            </Button>
          </View>
          <Image source={require('../../../assets/images/detail_bottom.png')} style={{width: '98%'}}/>
        </View>
      </ScrollView>
    )
  }
}

export default OrderDetail

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#f0f0f0',
    alignItems: 'center'
  }
})
