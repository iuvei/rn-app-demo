import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import {
  Flex,
  Button
} from '@ant-design/react-native'
import UIListView from '../../../components/UIListView'
import QueryDate from '../../../components/QueryDate'
import QueryPickerOne from '../../../components/QueryPickerOne'
import { ReWiTrStatus } from '../../../data/options'

const TableRow = 20

class FlatListItem extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    let {item, index} = this.props
    let {actualAmount, actualFee, amount, fee, inAccountId, outAccountId, remark, status, time, transferId} = item
    let statusobj = ReWiTrStatus.filter(v => {
      return v.value === status
    })[0]

    return (
      <TouchableHighlight onPress={() => this.props.onPressFunc(item)}>
        <View style={{padding: 10, backgroundColor: '#fff', position: 'relative'}}>
          <Text style={{fontSize: 15, lineHeight: 24}}>{remark}</Text>
          <Flex>
            <Text style={{width: 150, color: '#666', fontSize: 14, lineHeight: 22}}>操作金额: <Text style={{color: '#1689e6'}}>{amount}</Text></Text>
            <Text style={{width: 150, color: '#666', fontSize: 14, lineHeight: 22}}>{statusobj.label}</Text>
          </Flex>
          <Text style={{color: '#666', fontSize: 14, lineHeight: 22}} note>实际手续费: <Text style={{color: '#1689e6'}}>{actualFee}</Text></Text>
          <Text style={{color: '#666', fontSize: 14, lineHeight: 22}} note>手续费: <Text style={{color: '#1689e6'}}>{fee}</Text></Text>
          <Text style={{color: '#666', fontSize: 14, lineHeight: 22}} note>时间: <Text style={{color: '#1689e6'}}>{time}</Text></Text>
        </View>
      </TouchableHighlight>
    )
  }
}

class BaccaratTransfer extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: '转账记录',
      headerRight: <Button style={{marginRight: 14}} type="ghost" size="small" onPress={navigation.getParam('onSearch')}>
        <Text style={{color: '#fff'}}>查询</Text>
      </Button>
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      KeyName: 'BaccaratTransfer',
      api: '/frontReport/capitalBase/findBjlTransferRecords',
      params: {
        userId: props.loginInfo.acc.user.userId,
        orderId: '',
        inAccountId: '',
        outAccountId: '',
        status: '',
        startTime: '',
        endTime: '',
        pageNumber: 1,
        pageSize: 10
      },
      inAccounts: [
        {value: '', label: '转入账户'},
        {value: '', label: '系统账户'} // -1查不到
      ],
      outAccounts: [
        {value: '', label: '转出账户'},
        {value: '', label: '系统账户'}
      ]
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSearch: this.onSearch })
    let { userPlatformInfo } = this.props
    let arr = []
    for (let i = 0; i < userPlatformInfo.length; i++) {
      let item = userPlatformInfo[i]
      if (item.partnerStatus === 0) {
        arr.push({...item, label: item.partnerName, value: item.partnerCode})
      }
    }
    this.setState(prevState => ({
      inAccounts: prevState.inAccounts.concat(arr),
      outAccounts: prevState.outAccounts.concat(arr)
    }))
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
    // 点击一项改变数据重置数据
    // let Row = this.BetHistory.listView.getRows().slice()
    // Row.find(rows => rows.orderId === item.orderId).ruleName = '自定义'
    // this.BetHistory.listView.updateDataSource(Row)
  }

  onSearch = async () => {
    this.BaccaratTransfer.listView.refresh()
  }

  handlePickerBack = (val) => {
    this.setState(prevState => ({
      params: {...prevState.params, ...val}
    }))
  }


  render() {
    let {api, params, KeyName, inAccounts, outAccounts} = this.state

    return (
      <View style={styles.container}>
        <View>
            <QueryDate handleDate={this.handleDate}/>
            <View>
              <Flex justify="between" style={{height: 30}}>
                <Flex.Item>
                  <QueryPickerOne
                    data={ReWiTrStatus}
                    queryName={'status'}
                    handlePickerBack={this.handlePickerBack}/>
                </Flex.Item>
                <Flex.Item style={{marginHorizontal: 16}}>
                  <QueryPickerOne
                    data={inAccounts}
                    queryName={'inAccountId'}
                    handlePickerBack={this.handlePickerBack}/>
                </Flex.Item>
                <Flex.Item>
                  <QueryPickerOne
                    data={outAccounts}
                    queryName={'outAccountId'}
                    handlePickerBack={this.handlePickerBack}/>
                </Flex.Item>
              </Flex>
            </View>
        </View>
        <UIListView
          ref={ref => this.BaccaratTransfer = ref}
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
            let dataList = res.data && res.data.data ? res.data.data : []
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

const mapStateToProps = (state, props) => {
  let { loginInfo, userPlatformInfo } = state.common
  return { loginInfo, userPlatformInfo }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaccaratTransfer)

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
