import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView
} from 'react-native'
import UIListView from '../../../components/UIListView'
import {
  Button,
  Flex,
  InputItem,
  Modal
} from '@ant-design/react-native'
import QueryDate from '../../../components/QueryDate'
import QueryPickerOne from '../../../components/QueryPickerOne'
import { orderTypes, orderStatus } from '../../../data/options'

const TableRow = 20
const userList = [
  {label: '自己', value: 0},
  {label: '下级', value: 1},
  {label: '某个下级', value: 2}
]

class FlatListItem extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    let {item, index} = this.props
    let {orderId, ruleName, lotterName, orderIssue, castAmount, castCodes, loginName} = item
    let statusarr = orderStatus.filter(obj => {
      return obj.value === item.status
    })
    return (
      <TouchableHighlight onPress={() => this.props.onPressFunc(item)}>
        <View style={{padding: 10, backgroundColor: '#fff', position: 'relative'}}>
          <Text style={{fontSize: 15, lineHeight: 24}}>用户名：{loginName} - {lotterName}</Text>
          <Flex>
            <Text style={{width: 150, color: '#666', fontSize: 14, lineHeight: 22}}>期号: <Text style={{color: '#1689e6'}}>{orderIssue}</Text></Text>
            <Text style={{width: 150, color: '#666', fontSize: 14, lineHeight: 22}}>{ruleName}</Text>
          </Flex>
          <Text style={{color: '#666', fontSize: 14, lineHeight: 22}} note>投注金额: <Text style={{color: '#1689e6'}}>{castAmount}</Text></Text>
          <Text style={{color: '#666', fontSize: 14, lineHeight: 22}} note ellipsizeMode={'tail'} numberOfLines={1}>投注号码: <Text style={{color: '#1689e6'}}>{castCodes}</Text></Text>
          <Button type="ghost" size="small"
            style={{position: 'absolute', top: 6, right: 8, borderColor: statusarr[0].color}}><Text style={{color: statusarr[0].color}}>{statusarr[0].label}</Text></Button>
        </View>
      </TouchableHighlight>
    )
  }

}

class TeamChaseHistory extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: '团队追号记录',
      headerRight: <Button style={{marginRight: 14}} type="ghost" size="small" onPress={navigation.getParam('onSearch')}>
        <Text style={{color: '#fff'}}>查询</Text>
      </Button>
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      KeyName: 'TeamChaseHistory',
      api: '/frontReport/getOrderStatistics',
      params: {
        userId: '',
        proxyType: 0,  // 0自己、1直接下级、2所有下级，默认0
        orderType: 0, // 0彩票,1游戏
        orderId: '',
        lotterCode: '',
        startTime: '',
        endTime: '',
        status: '', // -1已撤单,1未开奖,2已中奖,3未中奖
        pageNumber: 1,
        isAddition: '', //  是否追号：0 否、1 是
        pageSize: 10,
        pageTotal: 0,
        isOuter: '',  // 是否外盘                       （0 否、1 是）
        loginName: ''
      },
      lotterList: [],
      detailInfo: null,
      popVisible: false,
      keyList: [
        {
          key: 'loginName',
          name: '用户名：'
        },
        {
          key: 'lotterName',
          name: '彩种：'
        },
        {
          key: 'ruleName',
          name: '玩法：'
        },
        {
          key: 'castCodes',
          name: '投注号码：'
        },
        {
          key: 'openCode',
          name: '开奖号码：'
        },
        {
          key: 'orderId',
          name: '单号：'
        },
        {
          key: 'orderTime',
          name: '下单时间：',
          callbackTxt: 'moment'
        },
        {
          key: 'castAmount',
          name: '投注金额：',
          number: true
        },
        {
          key: 'bonus',
          name: '中奖金额：',
          number: true
        },
        {
          key: 'status',
          name: '状态：',
          formatter: (v) => {
            let statusobj = orderStatus.filter(obj => {
              return obj.value === v
            })[0]
            return statusobj.label
          }
        }
      ]
    }
  }
  
  componentWillUnmount(){
    this.setState = () => () => {}
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
    this.setState(prevState => ({
      popVisible: true,
      detailInfo: Object.assign({}, item)
    }))
    // 跳转详情页
    // this.props.navigation.navigate('OrderDetail', {detail: item})
    // 点击一项改变数据重置数据
    // let Row = this.TeamChaseHistory.listView.getRows().slice()
    // Row.find(rows => rows.orderId === item.orderId).ruleName = '自定义'
    // this.TeamChaseHistory.listView.updateDataSource(Row)
  }

  onSearch = async () => {
    this.TeamChaseHistory.listView.refresh()
  }

  handlePickerBack = (val) => {
    this.setState(prevState => ({
      params: {...prevState.params, ...val}
    }))
  }

  onClosePop = () => {
    this.setState({
      popVisible: false
    })
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
    let {api, params, KeyName, lotterList, keyList, detailInfo} = this.state
    let tmmlotterlist  = []
    if (params.orderType === 1) {
      tmmlotterlist = lotterList.filter(item => {
        return item.realCategory === 'kl8' || item.realCategory === 'xyc'
      })
    } else if (params.orderType === 0) {
      tmmlotterlist = lotterList.filter(item => {
        return item.realCategory !== 'kl8' && item.realCategory !== 'xyc'
      })
    }

    return (
      <View style={styles.container}>
        <View>
            <QueryDate handleDate={this.handleDate}/>
            <View>
              <Flex justify="between" style={{height: 30}}>
                <Flex.Item>
                  <QueryPickerOne
                    data={orderTypes}
                    queryName={'orderType'}
                    handlePickerBack={this.handlePickerBack}/>
                </Flex.Item>
                <Flex.Item style={{marginHorizontal: 16}}>
                  <QueryPickerOne
                    data={orderStatus}
                    queryName={'status'}
                    handlePickerBack={this.handlePickerBack}/>
                </Flex.Item>
                <Flex.Item>
                  {
                    tmmlotterlist.length > 0 &&
                    <QueryPickerOne
                      data={tmmlotterlist}
                      queryName={'lotterCode'}
                      handlePickerBack={this.handlePickerBack}/>
                  }
                </Flex.Item>
              </Flex>
              <Flex justify="between" style={{height: 30}}>
                <Flex.Item style={{paddingRight: 8}}>
                  <QueryPickerOne
                    data={userList}
                    queryName={'proxyType'}
                    handlePickerBack={this.handlePickerBack}/>
                </Flex.Item>
                <Flex.Item style={{paddingLeft: 8}}>
                  <View style={{backgroundColor: '#fff', height: 25, lineHeight: 25}}>
                    <InputItem
                      style={{lineHeight: 25, height: 25, borderBottomWidth: 0}}
                      value={params.loginName}
                      onChange={val => {
                        this.setState(prevState => ({
                          params: {...prevState.params, loginName: val}
                        }))
                      }}
                      placeholder="输入账号"
                    >
                    </InputItem>
                  </View>
                </Flex.Item>
              </Flex>
            </View>
        </View>
        <UIListView
          ref={ref => this.TeamChaseHistory = ref}
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
        {
          detailInfo &&
          <Modal
            transparent={false}
            visible={this.state.popVisible}
            animationType="slide-down"
            onClose={this.onClosePop}
          >
            <View style={{ paddingVertical: 10, paddingTop: 50 }}>
              {
                keyList.map((item, idx) => {
                  return (
                    <View style={{backgroundColor: '#fff', width: '98%'}} key={item.name}>
                      <Flex>
                        <Text style={{width: 100, paddingLeft: 20, color: '#a4a4a4', lineHeight: 32, fontSize: 14}}>{item.name}</Text>
                        <Text style={{flex: 1, textAlign: 'right', color: '#585858', paddingRight: 16, lineHeight: 32, fontSize: 14}}>{item.formatter ? item.formatter(detailInfo[item.key]) : detailInfo[item.key]}</Text>
                      </Flex>
                      <Image source={require('../../../assets/images/detail_dashed.png')} style={{width: '100%', height: 0.5}} />
                    </View>
                  )
                })
              }
            </View>
            <Button type="primary" onPress={this.onClosePop} style={{borderRadius: 0}}>
              关闭
            </Button>
          </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(TeamChaseHistory)
