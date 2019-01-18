import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import UIListView from '../../components/UIListView'
import {
  Button,
  Flex
} from '@ant-design/react-native'
import { orderStatus } from '../../data/options'
import { withNavigation } from 'react-navigation'

const TableRow = 20

class FlatListItem extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    let {item, index} = this.props
    let {orderId, ruleName, lotterName, orderIssue, castAmount, castCodes} = item
    let statusarr = orderStatus.filter(obj => {
      return obj.value === item.status
    })
    return (
      <TouchableHighlight onPress={() => this.props.onPressFunc(item)}>
        <View style={{padding: 10, backgroundColor: '#fff', position: 'relative'}}>
          <Text style={{fontSize: 15, lineHeight: 24}}>{lotterName}</Text>
          <Flex>
            <Text style={{width: 150, color: '#666', fontSize: 14, lineHeight: 22}}>期号: <Text
              style={{color: '#1689e6'}}>{orderIssue}</Text></Text>
            <Text style={{width: 150, color: '#666', fontSize: 14, lineHeight: 22}}>{ruleName}</Text>
          </Flex>
          <Text style={{color: '#666', fontSize: 14, lineHeight: 22}} note>投注金额: <Text
            style={{color: '#1689e6'}}>{castAmount}</Text></Text>
          <Text style={{color: '#666', fontSize: 14, lineHeight: 22}} note>投注号码: <Text
            style={{color: '#1689e6'}}>{castCodes}</Text></Text>
          <Button type="ghost" size="small"
                  style={{position: 'absolute', top: 6, right: 8, borderColor: statusarr[0].color}}><Text
            style={{color: statusarr[0].color}}>{statusarr[0].label}</Text></Button>
        </View>
      </TouchableHighlight>
    )
  }

}

class BetSimpleHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      KeyName: 'BetSimpleHistory',
      api: '/frontReport/getOrderStatistics',
      params: {
        userId: '',
        orderId: '',
        proxyType: 0, // 0自己、1直接下级、2所有下级，默认0
        orderType: 0, // 0彩票,1游戏
        orderIssue: '', // 期号
        lotterCode: '', // 必传
        startTime: '',
        endTime: '',
        status: '',
        pageNumber: 1,
        isAddition: 0, // 是否追号：0 否、1 是
        pageSize: 10,
        isOuter: '' // 0 否 1 是
      },
      lotterList: []
    }
  }

  // componentDidMount() {
  //   this.onSearch()
  // }

  componentWillReceiveProps(np) {
    let {intoHistory} = np
    if (this.props.intoHistory !== intoHistory) {
      this.setState({
        params: {
          ...this.state.params,
          orderType: np.navParams.type
        }
      }, () => {
        this.onSearch()
      })
    }
  }

  // renderItem
  // item, index, separators
  renderItem = (item, index) => {
    return (
      <FlatListItem
        item={item}
        index={index}
        onPressFunc={(Item) => {
          this.onPressItem(Item)
        }}/>
    )
  }

  // 点击单元表格
  onPressItem = (item) => {
    // 跳转详情页
    // this.props.navigation.navigate('OrderDetail', {detail: item})
    // 点击一项改变数据重置数据
  }

  onSearch = async () => {
    this.BetSimpleHistory.listView.refresh()
  }

  render() {
    let {api, params, KeyName, lotterList} = this.state

    return (
      <View style={styles.container}>
        <view>
        </view>
        <UIListView
          ref={ref => this.BetSimpleHistory = ref}
          api={api}
          KeyName={`KeyName-${KeyName}`}
          params={params}
          renderItem={this.renderItem}
          beforeUpdateList={({res}, fn) => {
            let dataList = res.data && res.data.orderInfoList ? res.data.orderInfoList : []
            let {pageNumber, pageSize, totalCount} = res.data
            let NullData = Math.ceil(totalCount / pageSize) < pageNumber
            fn(NullData ? [] : {dataList})
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 5,
    backgroundColor: '#f0f0f0'
  },
  spa: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
  }
})

const mapStateToProps = (state, props) => {
  let {navParams} = state.classic
  return {navParams}
}

export default withNavigation(
  connect(mapStateToProps)(BetSimpleHistory)
)

