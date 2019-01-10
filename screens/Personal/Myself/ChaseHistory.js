import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import UIListView from '../../../components/UIListView'
// List Item
import {
  Button,
  Flex,
} from '@ant-design/react-native'
import QueryDate from '../../../components/QueryDate'
import QueryPickerOne from '../../../components/QueryPickerOne'

const chaseOrderStatus = [
  {value: '', label: '所有状态'},
  {value: 0, label: '进行中', color: 'green'},
  {value: 1, label: '系统终止', color: 'red'},
  {value: 2, label: '已经完成', color: '#999'}
]

const haltAdditionTxt = ['是', '否']

const TableRow = 20

class FlatListItem extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    let {item, index} = this.props
    let {ruleName, lotterName, orderIssue, castAmount, castCodes, haltAddition, } = item
    let statusarr = chaseOrderStatus.filter(obj => {
      return obj.value === item.status
    })
    return (
      <TouchableHighlight onPress={() => this.props.onPressFunc(item)}>
        <View style={{padding: 10, backgroundColor: '#fff', position: 'relative'}}>
          <Text style={{fontSize: 15, lineHeight: 24}}>{lotterName}</Text>
          <Flex>
            <Text style={{width: 150, color: '#666', fontSize: 14, lineHeight: 22}}>起始奖期: <Text style={{color: '#1689e6'}}>{orderIssue}</Text></Text>
            <Text style={{width: 150, color: '#666', fontSize: 14, lineHeight: 22}}>{ruleName}</Text>
          </Flex>
          <Text style={{color: '#666', fontSize: 14, lineHeight: 22}} note>投注金额: <Text style={{color: '#1689e6'}}>{castAmount}</Text></Text>
          <Text style={{color: '#666', fontSize: 14, lineHeight: 22}} note>投注号码: <Text style={{color: '#1689e6'}}>{castCodes}</Text></Text>
          <Text style={{color: '#666', fontSize: 14, lineHeight: 22}} note>中奖即停: <Text style={{color: '#1689e6'}}>{haltAdditionTxt[haltAddition]}</Text></Text>
          <Button type="ghost" size="small"
            style={{position: 'absolute', top: 6, right: 8, borderColor: statusarr[0].color}}><Text style={{color: statusarr[0].color}}>{statusarr[0].label}</Text></Button>
        </View>
      </TouchableHighlight>
    )
  }

}

class ChaseHistory extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: '追号记录',
      headerRight: <Button style={{marginRight: 14}} type="ghost" size="small" onPress={navigation.getParam('onSearch')}>
        <Text style={{color: '#fff'}}>查询</Text>
      </Button>
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
      KeyName: 'ChaseHistory',
      api: '/frontReport/getOrderBatchStatistics',
      params: {
        userId: '',
        batchNo: '',
        proxyType: 0,  // 0自己、1直接下级、2所有下级，默认0
        orderIssue: '', // 期号
        lotterCode: '', // 必传
        startTime: '',
        endTime: '',
        pageNumber: 1,
        isAddition: 1,  // 是否追号：0 否、1 是
        pageSize: 10,
        isOuter: '' // 0 否 1 是
      },
      lotterList: []
    }
  }

  handleDate = ({startTime, endTime}) => {
    this.setState(prevState => ({
      params: Object.assign({}, {...prevState.params, startTime, endTime})
    }))
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
    this.props.navigation.navigate('OrderDetail', {detail: item})
    // 点击一项改变数据重置数据
    // let Row = this.ChaseHistory.listView.getRows().slice()
    // Row.find(rows => rows.orderId === item.orderId).ruleName = '自定义'
    // this.ChaseHistory.listView.updateDataSource(Row)
  }

  onSearch = async () => {
    await this.setState({isShow: true}, () => {
      this.setState({isShow: false})
    })
  }

  handlePickerBack = (val) => {
    this.setState(prevState => ({
      params: {...prevState.params, ...val}
    }))
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSearch: this.onSearch })
    let { sysSortLottery } = this.props
    let arr = []
    sysSortLottery.forEach(item => {
      arr = arr.concat(item.gpLot, item.originLot)
    })
    let tmp = arr.map(item => {
      return {...item, value: item.lotterCode, label: item.lotterName}
    })
    tmp.unshift({value: '', label: '全部'})
    this.setState({
      lotterList: tmp
    })
  }

  render() {
    let {api, params, KeyName, isShow, lotterList} = this.state

    return (
      <View style={styles.container}>
        <View>
            <QueryDate handleDate={this.handleDate}/>
            <View>
              <Flex justify="between" style={{height: 30}}>
                <Flex.Item>
                  {
                    lotterList.length > 0 &&
                    <QueryPickerOne
                      data={lotterList}
                      queryName={'lotterCode'}
                      handlePickerBack={this.handlePickerBack}/>
                  }
                </Flex.Item>
              </Flex>
            </View>
        </View>
        {isShow ? null :
          <UIListView
            ref={ref => this.ChaseHistory = ref}
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
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 5,
    backgroundColor: '#f0f0f0',
  },
  spa: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
  }
})


const mapStateToProps = (state, props) => {
  let {sysSortLottery} = state.common
  return {sysSortLottery}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChaseHistory)
