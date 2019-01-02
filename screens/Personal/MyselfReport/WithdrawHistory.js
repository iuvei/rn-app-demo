import React from 'react'
import {View, Text, StyleSheet} from 'react-native'


const TableRow = 20
export default class PersonalScreen extends React.Component {
  static navigationOptions = {
    title: '存取款记录'
  }

  constructor(props) {
    super(props)
    this.state = {
      KeyName: 'BetHistory',
      api: '/order/getOrderStatistics',
      params: {
        userId: '',
        orderId: '',
        proxyType: 0, // 0自己、1直接下级、2所有下级，默认0
        orderType: 0, // 0彩票,1游戏
        orderIssue: '', // 期号
        lotterCode: '', // 必传
        startTime: '2018-12-13',
        endTime: '2019-01-01',
        status: '',
        pageNumber: 1,
        isAddition: 0, // 是否追号：0 否、1 是
        pageSize: 10,
        isOuter: '' // 0 否 1 是
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>hello personal</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
})
