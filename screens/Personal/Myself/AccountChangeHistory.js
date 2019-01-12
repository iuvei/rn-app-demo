import React, { PureComponent } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import UIListView from '../../../components/UIListView'
import { Flex, Button } from '@ant-design/react-native';
import { connect } from "react-redux";
import {toFixed4, formatTime} from '../../../utils/MathUtils'
import QueryDate from '../../../components/QueryDate'
import QueryPickerOne from '../../../components/QueryPickerOne'

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
      title: '个人账变记录',
      headerRight: <Button style={{marginRight: 14}} type="ghost" size="small" onPress={navigation.getParam('onSearch')}>
        <Text style={{color: '#fff'}}>查询</Text>
      </Button>
    }
  }

  constructor(props) {
    super(props)
    console.log(props.userBalanceInfo)
    this.state = {
      KeyName: 'AccountChangeHistory',
      api: '/frontReport/capitalBase/queryBalanceLogRecords',
      params: {
        userId: props.loginInfo['acc'].user.userId,
        accountId: props.userBalanceInfo["CNY"]['ye'].accountId,
        startTime: '',
        endTime: '',
        pageNumber: 1,
        pageSize: 10
      }
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

  onSearch = () => {
    this.AccountChangeHistory.listView.refresh()
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

  getUserBalanceIds () {
    let obj = this.props.userBalanceInfo["CNY"]
    let arr = []
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        switch (prop) {
          case 'ye':
            arr[0] = {label: '余额账户', value: obj[prop].accountId}
            break
          case 'fh':
            arr[1] = {label: '分红账户', value: obj[prop].accountId}
            break
          case 'fd':
            arr[2] = {label: '返点账户', value: obj[prop].accountId}
            break
          case 'hd':
            arr[3] = {label: '活动账户', value: obj[prop].accountId}
            break
          case 'hb':
            arr[4] = {label: '红包账户', value: obj[prop].accountId}
            break
        }
      }
    }
    let rst =  arr.filter(item => { return item !== undefined && item !== null && item !== '' })
    return rst
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSearch: this.onSearch })
  }

  render() {
    let {api, params, KeyName} = this.state
    let d = this.getUserBalanceIds()
    return (
      <View style={styles.container}>
        <View>
          <QueryDate handleDate={this.handleDate}/>
          <View>
            <Flex justify="between" style={{height: 30}}>
              <Flex.Item>
                <QueryPickerOne
                  data={d}
                  queryName={'accountId'}
                  handlePickerBack={this.handlePickerBack}/>
              </Flex.Item>
            </Flex>
          </View>
        </View>
        <UIListView
          ref={ref => this.AccountChangeHistory = ref}
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
  let {userBalanceInfo, activeAccount} = state.member
  return {loginInfo,userBalanceInfo, activeAccount}
}
export default connect(mapStateToProps)(PersonalScreen)
