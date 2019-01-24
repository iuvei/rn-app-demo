import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import UIListView from './UIListView'
// List Item
import {
  Button,
  Flex,
} from '@ant-design/react-native'
import { orderStatus } from '../data/options'
import { rulesNameMap } from '../data/nor-lot/basic-info'

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
            <Text style={{width: 150, color: '#666', fontSize: 14, lineHeight: 22}}>期号: <Text style={{color: '#1689e6'}}>{orderIssue}</Text></Text>
            <Text style={{width: 150, color: '#666', fontSize: 14, lineHeight: 22}}>{ruleName}</Text>
          </Flex>
          <Text style={{color: '#666', fontSize: 14, lineHeight: 22}} note>投注金额: <Text style={{color: '#1689e6'}}>{castAmount}</Text></Text>
          <Text style={{color: '#666', fontSize: 14, lineHeight: 22}} note>投注号码: <Text style={{color: '#1689e6'}}>{rulesNameMap[castCodes] || castCodes}</Text></Text>
          <Button type="ghost" size="small"
            style={{position: 'absolute', top: 6, right: 8, borderColor: statusarr[0].color}}><Text style={{color: statusarr[0].color}}>{statusarr[0].label}</Text></Button>
        </View>
      </TouchableHighlight>
    )
  }

}

export default class BetListComp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
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

  componentWillReceiveProps(nextProps) {
    let { refreshTime } = nextProps
    if (refreshTime) {
      this.BetListComp.listView.refresh()
    }
  }

  // 点击单元表格
  onPressItem = (item) => { 
    // 跳转详情页
    this.props.onPressItem(item)
    // 点击一项改变数据重置数据
    // let Row = this.BetListComp.listView.getRows().slice()
    // Row.find(rows => rows.orderId === item.orderId).ruleName = '自定义'
    // this.BetListComp.listView.updateDataSource(Row)
  }

  render() {
    let {api, params, KeyName} = this.props

    return (
      <View style={{flex: 1}}>
        <UIListView
          ref={ref => this.BetListComp = ref}
          api={api}
          KeyName={`KeyName-${KeyName}`}
          params={params}
          renderItem={this.renderItem}
          // 第一个参数 params 第二个子组件的将要请求的第N页
          // beforeHttpGet={async ({params, page}, fn) => {
          //   // 解决父级数据数据源同步问题，然后数据给到子组件本身
          //   await this.setState({
          //     params: Object.assign({}, params, {
          //       pageNumber: page
          //     })
          //   })
          //   let handlerParams = this.state.params
          //   fn(handlerParams, true)
          // }}
          // 返回数据空或者处理后的数据源
          beforeUpdateList={({res}, fn) => {
            let dataList = res.data && res.data.orderInfoList ? res.data.orderInfoList : []
            let {pageNumber, pageSize, totalCount} = res.data
            let NullData = Math.ceil(totalCount / pageSize) < pageNumber
            // 或在这里增加 其他状态码的处理Alter
            fn(NullData ? [] : {dataList})
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
})
