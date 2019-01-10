import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Keyboard } from 'react-native'
import UIListView from '../../../components/UIListView'
import { Flex, SegmentedControl, Button } from '@ant-design/react-native'
import dayjs from "dayjs"
import { RechargeType, ReWiTrStatus } from '../../../data/options'
import QueryDate from '../../../components/QueryDate'
import QueryPickerOne from '../../../components/QueryPickerOne'
import { connect } from "react-redux";

class FlatListItem extends PureComponent {
  constructor(props) {
    super(props)
    this.formateKey = (arr, key) => {
      let rst = arr.filter(item => item.value === key)
      return rst.length ? rst[0].label : '--'
    }
  }

  render() {
    let {item, index, type} = this.props
    return (
      <View style={{padding: 15, backgroundColor: '#fff'}}>
          <Flex justify="space-between">
            <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>
              <Text>{type}金额：</Text>
              <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{item["amount"]}</Text>
            </Text>
            <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{this.formateKey(RechargeType, item["type"])}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>手续费：{item["fee"] ? item["fee"].toFixed(4) : '0.0000'}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>银行卡号：{item["bankCard"] || '--'}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>操作日期：{dayjs(item["time"]).format('YYYY-MM-DD HH:mm:ss')}</Text>
            <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>状态：{this.formateKey(ReWiTrStatus, item["status"])}</Text>
          </Flex>
        </View>
    )
  }

}
class PersonalScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: <SegmentedControl
        values={['充值', '提现']}
        tintColor={'#caa9eb'}
        style={{ height: 30, width: 160 }}
        onValueChange={navigation.getParam('onValueChange')}
      />,
      headerRight: <Button style={{marginRight: 14}} type="primary" size="small" onPress={navigation.getParam('onSearch')}>
        <Text style={{color: '#fff'}}>查询</Text>
      </Button>,
      headerStyle: {backgroundColor:'#9a67cb'}
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      KeyName: 'WithdrawHistory',
      changeType: '充值',
      api: '/frontReport/capitalBase/queryRechargeRecords',
      params: {
        type: '',
        status: '',
        userId: props.loginInfo['acc'].user.userId,
        accountId: 0,
        startTime: '',
        endTime: '',
        pageNumber: 1,
        pageSize: 10,
        orderId: ''
      },
    }
  }

  onValueChange = value => {
    let tableAPI = ''
    if (value === '充值') {
      tableAPI = '/frontReport/capitalBase/queryRechargeRecords'
    } else {
      tableAPI = '/frontReport/capitalBase/queryWithdrawRecords'
    }
    this.setState({
      changeType: value,
      api:tableAPI
    }, ()=> this.WithdrawHistory.listView.refresh())
  }

  onSearch = () => {
    this.WithdrawHistory.listView.refresh()
  }

  renderItem = (item, index) => {
    return (
      <FlatListItem
        item={item}
        index={index}
        type={this.state.changeType}
        onPress={(Type, Item) =>
          this.onPressItem(Type, Item)
        }/>
    )
  }

  onPressItem = (type, item) => {}

  handleDate = ({startTime, endTime}) => {
    this.setState(prevState => ({
      params: Object.assign({}, {...prevState.params, startTime, endTime})
    }))
  }

  handlePickerBack = (val) => {
    this.setState(prevState => ({
      params: {...prevState.params, ...val}
    }))
  }

  componentDidMount() {

    this.props.navigation.setParams({
      onValueChange: this.onValueChange,
      onSearch: this.onSearch
    })
  }

  render() {
    let {api, params, KeyName} = this.state
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
            </Flex>
          </View>
        </View>
        <UIListView
          ref={ref => this.WithdrawHistory = ref}
          api={api}
          KeyName={`KeyName-${KeyName}`}
          params={params}
          renderItem={this.renderItem}
          beforeUpdateList={({res}, fn) => {
            console.log(res.data)
            let dataList = res.data && res.data.data ? res.data.data : []
            let {pageNumber, pageSize, totalCount} = res.data
            let NullData = Math.ceil(totalCount / pageSize) < pageNumber
            // 或在这里增加 其他状态码的处理Alter
            fn(NullData ? [] : {dataList})
          }}/>
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

const mapStateToProps = (state, props) => {
  let {loginInfo} = state.common
  return {loginInfo}
}
export default connect(mapStateToProps)(PersonalScreen)
