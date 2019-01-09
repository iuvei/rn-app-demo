import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import UIListView from '../../../components/UIListView'
import {Button, WingBlank, Flex, Modal} from '@ant-design/react-native'
import QueryDate from '../../../components/QueryDate'
import dayjs from 'dayjs'
import {connect} from "react-redux"
import {getTeamCount} from '../../../api/member'

class FlatListItem extends PureComponent {
  constructor (props) {
    super(props)
  }

  render () {
    let {item, showDetails} = this.props
    let {activity, bonus, userName, buyAmount, rebate, profit} = item
    return (
      <TouchableHighlight style={{padding: 10, paddingRight: 60}} onPress={() => {
        showDetails(item)
      }}>
        <View>
          <Flex><Text>{userName}</Text></Flex>
          <Flex direction={'row'} justify={'space-between'}>
            <Flex direction={'row'} justify={'space-between'}>
              <Text style={styles.title}>消费:</Text>
              <Text style={styles.value}>{buyAmount}</Text>
            </Flex>
            <Flex direction={'row'} justify={'space-between'}>
              <Text style={styles.title}>中奖:</Text>
              <Text style={styles.value}>{bonus}</Text>
            </Flex>
          </Flex>
          <Flex direction={'row'} justify={'space-between'}>
            <Flex direction={'row'} justify={'space-between'}>
              <Text style={styles.title}>盈亏:</Text>
              <Text style={styles.value}>{profit}</Text>
            </Flex>
            <Flex direction={'row'} justify={'space-between'}>
              <Text style={styles.title}>返点:</Text>
              <Text style={styles.value}>{rebate}</Text>
            </Flex>
          </Flex>
          <Flex direction={'row'} justify={'space-between'}>
            <Flex direction={'row'} justify={'space-between'}>
              <Text style={styles.title}>活动:</Text>
              <Text style={styles.value}>{activity}</Text>
            </Flex>
          </Flex></View>
      </TouchableHighlight>
    )
  }
}

class TeamReport extends React.Component {
  static navigationOptions = {
    title: '团队报表'
  }

  constructor (props) {
    super(props)
    let end = dayjs().format('YYYY-MM-DD')
    let start = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    this.state = {
      KeyName: 'TeamReport',
      isShow: false,
      visible: false,
      details: {},
      api: '/report/system/webComplexReport',
      summary: {},
      params: {
        userName: '',
        userId: props.loginInfo.userId,
        currencyCode: 'CNY',
        startTime: start,
        endTime: end,
        formType: 0,
        pageSize: 10,
        pageNum: 1
      }
    }
  }

  handleDate = async ({startTime, endTime}) => {
    await this.setState(prevState => ({
      params: {...prevState.params, startTime, endTime}
    }))
    this.onSearch()
  }

  // renderItem
  // item, index, separators
  renderItem = (item, index) => {
    return (
      <FlatListItem
        item={item}
        index={index}
        showDetails={this.showDetails}/>
    )
  }

  showDetails = (item) => {
    this.setState({
      visible: true,
      details: item
    })
  }

  onSearch = async () => {
    this.getTeamCount()
    await this.setState({isShow: true}, () => {
      this.setState({isShow: false})
    })
  }

  getTeamCount = async () => {
    let res = await getTeamCount(this.state.params)
    if (res.code === 0) {
      this.setState({
        summary: {...res.data, userName: '总计'}
      })
    }
  }

  render () {
    let {api, params, KeyName, isShow, summary, visible, details} = this.state
    return (
      <View style={styles.container}>
        <WingBlank>
          <QueryDate handleDate={this.handleDate}/>
        </WingBlank>
        <View style={{backgroundColor: '#E4F0FF'}}><FlatListItem item={summary} showDetails={this.showDetails}/></View>
        <Modal transparent visible={visible} title={<Text style={{fontSize: 20, color: '#1789e6'}}>详情</Text>}
               onClose={() => this.setState({visible: false})}>
          <View style={{marginTop: 10}}>
            <View style={styles.popColumn}>
              <Text>充值金额:</Text>
              <Text>{details.rechargeAmount}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>取款金额:</Text>
              <Text>{details.withdrawAmount}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>消费量:</Text>
              <Text>{details.buyAmount}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>中奖:</Text>
              <Text>{details.bonus}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>盈亏:</Text>
              <Text>{details.profit}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>返点:</Text>
              <Text>{details.rebate}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>活动:</Text>
              <Text>{details.activity}</Text>
            </View>
            <Button style={{marginTop: 10}} onPress={() => this.setState({visible: false})}>确定</Button>
          </View>
        </Modal>
        {isShow ? null :
          <UIListView
            ref={ref => this.TeamReport = ref}
            api={api}
            KeyName={`KeyName-${KeyName}`}
            params={params}
            renderItem={this.renderItem}
            beforeUpdateList={({res}, fn) => {
              let dataList = res.data && res.data.pageColumns ? res.data.pageColumns : []
              let {currentPage, total} = res.data.pageInfo
              let NullData = Math.ceil(total / 10) < currentPage
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
    backgroundColor: '#fff'
  },
  title: {
    marginRight: 25,
    fontSize: 18,
    color: '#999'
  },
  value: {
    fontSize: 18,
    color: '#333'
  },
  popColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingRight: 20,
    paddingLeft: 20,
    borderColor: '#dedede',
    borderBottomWidth: 0.5
  }
})


const mapStateToProps = (state) => {
  let {loginInfo} = state.common
  return ({
    loginInfo
  })
}

export default connect(
  mapStateToProps
)(TeamReport)
