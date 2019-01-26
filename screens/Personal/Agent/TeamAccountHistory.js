import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Keyboard } from 'react-native'
import UIListView from '../../../components/UIListView'
import { Flex, Button, InputItem } from '@ant-design/react-native';
import { connect } from "react-redux";
import {toFixed4, formatTime} from '../../../utils/MathUtils'
import QueryDate from '../../../components/QueryDate'
import QueryPickerOne from '../../../components/QueryPickerOne'
import { userAccountChangeType } from '../../../data/options'

class FlatListItem extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    let {item, index} = this.props
    return (
      <View style={{padding: 15, backgroundColor: '#fff'}}>
        <Flex justify="space-between">
          <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>
            <Text>操作金额：</Text>
            <Text style={{color: item["changeAmount"] > 0 ? 'red' : 'green'}}>{toFixed4(item["changeAmount"])}</Text>
          </Text>
          <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>{item["description"]}</Text>
        </Flex>
        <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>用户名：{item["loginName"]}</Text>
        <Flex justify="space-between">
          <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>操作日期：{formatTime(item["operateTime"])}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>操作前金额：{toFixed4(item["oldBalance"])}</Text>
          <Text style={{color: '#666', fontSize: 14, lineHeight: 22}}>操作后金额：{toFixed4(item["newBalance"])}</Text>
        </Flex>
      </View>
    )
  }

}
class PersonalScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: '团队帐变记录',
      headerRight: <Button style={{marginRight: 14}} type="ghost" size="small" onPress={navigation.getParam('onSearch')}>
        <Text style={{color: '#fff'}}>查询</Text>
      </Button>
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      KeyName: 'TeamAccountChangeHistory',
      api: '/frontReport/getBanlanceLog',
      params: {
        userId: props.loginInfo['acc'].user.userId,
        pageNumber: 1,
        pageSize: 10,
        selectType: 0,
        changeType: '',
        loginName: '',
        startTime: '',
        endTime: '',
      },
      userList: [
        {label: '自己', value: 0},
        {label: '下级', value: 1},
        {label: '某个下级', value: 2}
      ]
    }
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

  onPressItem = (type, item) => {}

  onSearch = () => {
    this.TeamAccountChangeHistory.listView.refresh()
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSearch: this.onSearch })
  }

  render() {
    let {userList} = this.state
    let {api, params, KeyName} = this.state
    return (
      <View style={styles.container}>
        <View>
          <QueryDate handleDate={this.handleDate}/>
          <View>
            <Flex justify="between" style={{height: 30}}>
              <Flex.Item>
                <QueryPickerOne
                  data={userList}
                  queryName={'selectType'}
                  handlePickerBack={this.handlePickerBack}/>
              </Flex.Item>
              <Flex.Item style={{marginHorizontal: 16}}>
                <QueryPickerOne
                  data={userAccountChangeType}
                  queryName={'changeType'}
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
          ref={ref => this.TeamAccountChangeHistory = ref}
          api={api}
          KeyName={`KeyName-${KeyName}`}
          params={params}
          renderItem={this.renderItem}
          beforeUpdateList={({res}, fn) => {
            let dataList = res.data && res.data.balanceLogList ? res.data.balanceLogList : []
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
