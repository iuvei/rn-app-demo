import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import UIListView from '../../../components/UIListView'
import { Flex, SegmentedControl, Button, Modal } from '@ant-design/react-native'
import { RechargeType, ReWiTrStatus } from '../../../data/options'
import QueryDate from '../../../components/QueryDate'
import QueryPickerOne from '../../../components/QueryPickerOne'
import { connect } from "react-redux";
import { formatTime, toFixed4 } from "../../../utils/MathUtils";

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
      <TouchableHighlight onPress={() => this.props.onPressFun(item)}>
      <View style={{padding: 10, backgroundColor: '#fff'}}>
          <Flex justify="space-between">
            <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>
              <Text>{type}金额：</Text>
              <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{toFixed4(item["amount"])}</Text>
            </Text>
            <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{this.formateKey(RechargeType, item["type"])}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>手续费：{toFixed4(item["fee"])}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>操作日期：{formatTime(item["time"])}</Text>
            <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>状态：{this.formateKey(ReWiTrStatus, item["status"])}</Text>
          </Flex>
        </View>
      </TouchableHighlight>
    )
  }

}
class PersonalScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: <SegmentedControl
        values={['充值', '提现']}
        tintColor={'#f39b52'}
        style={{ height: 30, width: 160, backgroundColor: '#ffffff',borderRadius:4}}
        onValueChange={navigation.getParam('onValueChange')}
      />,
      headerRight: <Button style={{marginRight: 14}} type="primary" size="small" onPress={navigation.getParam('onSearch')}>
        <Text style={{color: '#fff'}}>查询</Text>
      </Button>
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      item: {},
      show: false,
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
    this.formateKey = (arr, key) => {
      let rst = arr.filter(item => item.value === key)
      return rst.length ? rst[0].label : '--'
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

  componentWillUnmount(){
    this.setState = () => () => {}
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
        onPressFun={(Item) =>
          this.onPressItem(Item)
        }/>
    )
  }

  onPressItem = (item) => {
    this.setState({
      item: item,
      show: true
    })
  }

  closeReModal = () => {
    this.setState({
      item: {},
      show: false
    })
  }

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
    let {api, params, KeyName, show, item, changeType} = this.state
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
            let dataList = res.data && res.data.data ? res.data.data : []
            let {pageNumber, pageSize, totalCount} = res.data
            let NullData = Math.ceil(totalCount / pageSize) < pageNumber
            // 或在这里增加 其他状态码的处理Alter
            fn(NullData ? [] : {dataList})
          }}/>
        <Modal
          title="详情"
          transparent
          visible={show}
          footer={[{ text: '关闭', onPress: () => this.closeReModal() }]}
        >
          <View style={{padding: 10, backgroundColor: '#fff'}}>
            <Flex justify="space-between">
              <Text>金额</Text>
              <Text>{toFixed4(item["amount"])}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>手续费</Text>
              <Text>{toFixed4(item["fee"])}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>实际金额</Text>
              <Text>{toFixed4(item["actualAmount"])}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>实际手续费</Text>
              <Text>{toFixed4(item["actualFee"])}</Text>
            </Flex>
            {
              changeType === '充值' ? <Flex justify="space-between">
                <Text>类型</Text>
                <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{this.formateKey(RechargeType, item["type"])}</Text>
              </Flex> : null
            }
            <Flex justify="space-between">
              <Text>状态</Text>
              <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{this.formateKey(ReWiTrStatus, item["status"])}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>操作日期</Text>
              <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{formatTime(item["time"])}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>银行卡</Text>
              <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{item["bankCard"] || '--'}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>描述</Text>
              <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{item["remark"] || '--'}</Text>
            </Flex>
          </View>
        </Modal>
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
