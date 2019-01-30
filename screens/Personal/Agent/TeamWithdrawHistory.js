import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Keyboard, TouchableHighlight } from 'react-native'
import { Flex, Button, InputItem, Modal } from '@ant-design/react-native';
import UIListView from '../../../components/UIListView'
import {toFixed4, formatTime} from '../../../utils/MathUtils'
import QueryDate from '../../../components/QueryDate'
import QueryPickerOne from '../../../components/QueryPickerOne'
import { connect } from "react-redux";

class FlatListItem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      changeList2: [
        {value: '1', label: '充值'},
        {value: '-1', label: '提款'}
      ],
      status: [
        {value: -5, label: '删除'},
        {value: -4, label: '锁定'},
        {value: -3, label: '失败'},
        {value: -2, label: '拒绝'},
        {value: -1, label: '取消申请'},
        {value: 0, label: '已提交'},
        {value: 1, label: '处理中'},
        {value: 2, label: '待审核'},
        {value: 3, label: '审核中'},
        {value: 4, label: '审核通过'},
        {value: 5, label: '已完成'}
      ],
    }
    this.formateKey = (arr, key) => {
      let rst = arr.filter(item => item.value === key)
      return rst.length ? rst[0].label : '--'
    }
  }

  render() {
    let {item, index} = this.props
    return (
      <TouchableHighlight onPress={() => this.props.onPressFun(item)}>
      <View style={{padding: 10, backgroundColor: '#fff'}}>
        <Text>账号：{item.loginName}</Text>
        <Flex justify="space-between">
          <Text>
            <Text>申请金额：</Text>
            <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{toFixed4(item.amount)}</Text>
          </Text>
          <Text>
            <Text>手续费：</Text>
            <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{toFixed4(item.fee)}</Text>
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text>
            <Text>币种代码：</Text>
            <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{item.currencyCode}</Text>
          </Text>
          <Text>
            <Text>类型：</Text>
            <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{this.formateKey(this.state.changeList2,item.type)}</Text>
          </Text>
          <Text>
            <Text>状态：</Text>
            <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{this.formateKey(this.state.status,item.status)}</Text>
          </Text>
        </Flex>
      </View>
      </TouchableHighlight>
    )
  }

}
class PersonalScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: '团队存取款记录',
      headerRight: <Button style={{marginRight: 14}} type="ghost" size="small" onPress={navigation.getParam('onSearch')}>
        <Text style={{color: '#fff'}}>查询</Text>
      </Button>
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      item: {},
      KeyName: 'TeamWithdrawHistory',
      api: '/frontReport/getTeamReWiLog',
      changeList: [
        {value: 1, label: '充值'},
        {value: -1, label: '提款'}
      ],
      changeList2: [
        {value: '1', label: '充值'},
        {value: '-1', label: '提款'}
      ],
      userList: [
        {label: '自己', value: 0},
        {label: '下级', value: 1},
        {label: '某个下级', value: 2}
      ],
      status: [
        {value: -5, label: '删除'},
        {value: -4, label: '锁定'},
        {value: -3, label: '失败'},
        {value: -2, label: '拒绝'},
        {value: -1, label: '取消申请'},
        {value: 0, label: '已提交'},
        {value: 1, label: '处理中'},
        {value: 2, label: '待审核'},
        {value: 3, label: '审核中'},
        {value: 4, label: '审核通过'},
        {value: 5, label: '已完成'}
      ],
      params: {
        userId: props.loginInfo['acc'].user.userId,
        loginName: '',
        selectType: 0,
        startTime: '',
        endTime: '',
        changeType: 1,
        pageNumber: 1,
        pageSize: 10,
        orderId: '',
        currencyCode: 'CNY'
      },
    }
    this.formateKey = (arr, key) => {
      let rst = arr.filter(item => item.value === key)
      return rst.length ? rst[0].label : '--'
    }
  }

  handleDate = ({startTime, endTime}) => {
    this.setState(prevState => ({
      params: Object.assign({}, {...prevState.params, startTime, endTime})
    }))
  }
  
  componentWillUnmount(){
    this.setState = () => () => {}
  }

  handlePickerBack = (val) => {
    this.setState(prevState => ({
      params: {...prevState.params, ...val}
    }))
  }

  onSearch = () => {
    this.TeamWithdrawHistory.listView.refresh()
  }

  renderItem = (item, index) => {
    return (
      <FlatListItem
        item={item}
        index={index}
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

  componentDidMount() {
    this.props.navigation.setParams({ onSearch: this.onSearch })
  }

  render() {
    let {api, params, KeyName, item, show} = this.state
    return (
      <View style={styles.container}>
        <View>
          <QueryDate handleDate={this.handleDate}/>
          <View>
            <Flex justify="between" style={{height: 30}}>
              <Flex.Item>
                <QueryPickerOne
                  data={this.state.changeList}
                  queryName={'changeType'}
                  handlePickerBack={this.handlePickerBack}/>
              </Flex.Item>
              <Flex.Item style={{marginHorizontal: 16}}>
                <QueryPickerOne
                  data={this.state.userList}
                  queryName={'selectType'}
                  handlePickerBack={this.handlePickerBack}/>
              </Flex.Item>
              <Flex.Item>
                <InputItem
                  value={this.state.params.loginName}
                  onChange={value => {
                    this.setState(prevState => ({
                      params: {...prevState.params, loginName: value}
                    }))
                  }}
                  onSubmitEditing={Keyboard.dismiss}
                  placeholder="输入账号" />
              </Flex.Item>
            </Flex>
          </View>
        </View>
        <UIListView
          ref={ref => this.TeamWithdrawHistory = ref}
          api={api}
          KeyName={`KeyName-${KeyName}`}
          params={params}
          renderItem={this.renderItem}
          beforeUpdateList={({res}, fn) => {
            let dataList = res.data && res.data.teamReWiList ? res.data.teamReWiList : []
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
              <Text>账号</Text>
              <Text>{item.loginName}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>申请金额：</Text>
              <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{toFixed4(item.amount)}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>账变前金额：</Text>
              <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{toFixed4(item["oldBalance"])}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>账变后金额：</Text>
              <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{toFixed4(item["newBalance"])}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>实际申请金额：</Text>
              <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{toFixed4(item["actualAmount"])}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>实际手续费：</Text>
              <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{toFixed4(item["actualFee"])}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>账变金额：</Text>
              <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{toFixed4(item["changeAmount"])}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>手续费：</Text>
              <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{toFixed4(item.fee)}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>币种代码：</Text>
              <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{item.currencyCode}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>类型：</Text>
              <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{this.formateKey(this.state.changeList2,item.type)}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>创建时间：</Text>
              <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{formatTime(item["createTime"])}</Text>
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
