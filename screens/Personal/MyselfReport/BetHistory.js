import React, {PureComponent} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import UIListView from '../../../components/UIListView'
// List Item
import {Button, WingBlank} from '@ant-design/react-native'

const TableRow = 20

class FlatListItem extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    let {item, index} = this.props
    let {orderId, ruleName} = item
    return (
      <View style={{padding: 10}}>
        <Text>序号: {index}</Text>
        <Text>RowID: {orderId}</Text>
        <Text note>Data: {ruleName}</Text>
      </View>
    )
  }

}

class BetHistory extends React.Component {
  static navigationOptions = {
    title: '游戏记录'
  }

  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
      KeyName: 'BetHistory',
      api: '/frontReport/getOrderStatistics',
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

  // 点击单元表格
  onPressItem = (type, item) => {
    let Row = this.BetHistory.listView.getRows().slice()
    Row.find(rows => rows.orderId === item.orderId).ruleName = '自定义'
    this.BetHistory.listView.updateDataSource(Row)
  }

  onSearch = async () => {
    await this.setState({isShow: true}, () => {
      this.setState({isShow: false})
    })
  }

  render() {
    let {api, params, KeyName, isShow} = this.state
    return (
      <View style={styles.container}>
        <WingBlank>
          <Button
            type="ghost"
            onPress={() => this.onSearch()}
            style={{marginTop: 4}}>查询</Button>
        </WingBlank>
        {isShow ? null :
          <UIListView
            ref={ref => this.BetHistory = ref}
            api={api}
            KeyName={`KeyName-${KeyName}`}
            params={params}
            renderItem={this.renderItem}
            // 第一个参数 params 第二个子组件的将要请求的第N页
            beforeHttpGet={async ({params, page}, fn) => {
              // 解决父级数据数据源同步问题，然后数据给到子组件本身
              await this.setState({
                params: Object.assign({}, params, {
                  pageNumber: page
                })
              })
              let handlerParams = this.state.params
              fn(handlerParams, true)
            }}
            // 返回数据空或者处理后的数据源
            beforeUpdateList={({res}, fn) => {
              let dataList = res.data && res.data.orderInfoList ? res.data.orderInfoList : []
              let {pageNumber, pageSize, totalCount} = res.data
              let NullData = Math.ceil(totalCount / pageSize) < pageNumber
              // 或在这里增加 其他状态码的处理Alter
              fn(NullData ? [] : {dataList})
            }}
          />
        }
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
