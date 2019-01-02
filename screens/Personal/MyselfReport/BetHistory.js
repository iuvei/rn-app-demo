import React from 'react'
import {View, Text, StyleSheet, Alert} from 'react-native'
import ExampleScroll from '../../ExampleScroll/index'
// List Item
import FlatListItem from '../../../screens/ExampleScroll/itemContainer/flatListItem'

const TableRow = 20

class BetHistory extends React.Component {
  static navigationOptions = {
    title: '游戏记录'
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

  // renderItem
  // item, index, separators
  renderItem = (item, index) => {
    return (
      <FlatListItem
        item={item}
        index={index}
        onPress={(Type, Item) =>
          this.onPressItem(Type, Item)
        }/>
    )
  }

  renderHeader = () => {

  }
  // 点击单元表格
  onPressItem = (type, item) => {
    let Row = this.BetHistory.getRows().slice()
    // console.log(Row)
    // if (Object.keys(Row).length) {
    Row.filter(rows => {
      if (rows.orderId === item.orderId) {
        rows.ruleName = '自定义'
      }
    })
    this.BetHistory.updateRows(Row, 1)
  }

  render() {
    let {api, params, KeyName} = this.state
    return (
      <View style={styles.container}>
        <ExampleScroll
          ref={ref => this.BetHistory = ref}
          api={api}
          KeyName={`KeyName-${KeyName}`}
          params={params}
          renderItem={this.renderItem}
          beforeUpdateList={({res}, fn) => {
            let dataList = res.data && res.data.orderInfoList ? res.data.orderInfoList : []
            fn({dataList})
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#fff'
  },
  spa: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
  }
})

export default BetHistory
