import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import UIListView from '../../../components/UIListView'
import {Button, WingBlank, Flex, Modal} from '@ant-design/react-native'
import QueryDate from '../../../components/QueryDate'
import dayjs from 'dayjs'
import {connect} from "react-redux"
import {getTeamCount} from '../../../api/member'
import {toFixed4} from '../../../utils/MathUtils'

class FlatListItem extends PureComponent {
  constructor (props) {
    super(props)
  }

  render () {
    let {item, showDetails, onPress, highUser, index} = this.props
    let {activity, bonus, userName, orderBuy, rebate, profit, userId} = item
    let flag = userName !== '总计' && userName !== highUser && index !== 0
    return (
      <TouchableHighlight style={{padding: 10}} onPress={() => {
        showDetails(item)
      }}>
        <View>
          <Flex>
            {
              flag ? <Text style={styles.light} onPress={() => {
                onPress(userId, userName)
              }}>{userName}</Text> : <Text style={styles.dark}>{userName}</Text>
            }
          </Flex>
          <Flex direction={'row'} justify={'space-between'}>
            <Flex direction={'row'} justify={'space-between'}>
              <Text style={styles.title}>消费:</Text>
              <Text style={styles.value}>{toFixed4(orderBuy)}</Text>
            </Flex>
            <Flex direction={'row'} justify={'space-between'}>
              <Text style={styles.title}>中奖:</Text>
              <Text style={styles.value}>{toFixed4(bonus)}</Text>
            </Flex>
          </Flex>
          <Flex direction={'row'} justify={'space-between'}>
            <Flex direction={'row'} justify={'space-between'}>
              <Text style={styles.title}>盈亏:</Text>
              <Text style={styles.value}>{toFixed4(profit)}</Text>
            </Flex>
            <Flex direction={'row'} justify={'space-between'}>
              <Text style={styles.title}>返点:</Text>
              <Text style={styles.value}>{toFixed4(rebate)}</Text>
            </Flex>
          </Flex>
          <Flex direction={'row'} justify={'space-between'}>
            <Flex direction={'row'} justify={'space-between'}>
              <Text style={styles.title}>活动:</Text>
              <Text style={styles.value}>{toFixed4(activity)}</Text>
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
      previousId: [],
      previousUser: [],
      api: '/frontReport/system/webComplexReport',
      summary: {},
      params: {
        userName: '',
        userId: props.loginInfo?.userId,
        currencyCode: 'CNY',
        startTime: start,
        endTime: end,
        formType: 0,
        pageSize: 10,
        pageNum: 1
      }
    }
  }

  // 返回上一级
  goBack = async () => {
    let {previousId, previousUser} = this.state
    let userId = previousId.pop()
    let userName = previousUser.pop()
    await this.setState({isShow: true}, () => {
      this.setState({isShow: false, params: {...this.state.params, userId, userName}, previousId, previousUser})
    })
    this.getTeamCount()
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
    let highUser = this.props.loginInfo?.acc?.user?.loginName
    return (
      <FlatListItem
        item={item}
        highUser={highUser}
        index={index}
        onPress={this.onPress}
        showDetails={this.showDetails}/>
    )
  }

  componentWillUnmount(){
    this.setState = () => () => {}
  }

  // 查询下级团队报表信息，
  onPress = async (userId, userName) => {
    let {params, previousId, previousUser} = this.state
    await this.setState({
      params: {...params, userId, userName},
      previousId: [...previousId, params.userId],
      previousUser: [...previousUser, params.userName]
    })
    this.onSearch()
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
    let {api, params, KeyName, isShow, summary, visible, details, previousId} = this.state
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
              <Text>{toFixed4(details.rechargeAmount)}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>取款金额:</Text>
              <Text>{toFixed4(details.withdrawAmount)}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>消费量:</Text>
              <Text>{toFixed4(details.orderBuy)}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>中奖:</Text>
              <Text>{toFixed4(details.bonus)}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>盈亏:</Text>
              <Text>{toFixed4(details.profit)}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>返点:</Text>
              <Text>{toFixed4(details.rebate)}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>活动:</Text>
              <Text>{toFixed4(details.activity)}</Text>
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
            beforeUpdateList={({res, params}, fn) => {
              let dataList = res.data && res.data.pageColumns ? res.data.pageColumns : []
              let {total} = res.data.pageInfo
              let NullData =  params.pageNumber > Math.ceil(total / 20)
              // 或在这里增加 其他状态码的处理Alter
              fn(NullData ? [] : {dataList})
            }}
          />
        }
        {
          previousId.length > 0 ?
            <Button type={'primary'} style={{margin: 10}} onPress={this.goBack}>返回上级</Button> : null
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
  light: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gold'
  },
  dark: {
    fontSize: 18,
    fontWeight: 'bold',
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
