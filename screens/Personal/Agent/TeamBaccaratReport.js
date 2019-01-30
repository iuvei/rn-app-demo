import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import UIListView from '../../../components/UIListView'
import {Button, WingBlank, Flex, Modal} from '@ant-design/react-native'
import QueryDate from '../../../components/QueryDate'
import dayjs from 'dayjs'
import {connect} from "react-redux"
import {toFixed4} from '../../../utils/MathUtils'

class FlatListItem extends PureComponent {
  constructor (props) {
    super(props)
  }

  render () {
    let {item, onPress, highUser, index} = this.props
    let {
      rechargeActualAmount,
      withdrawActualAmount,
      realConsumeAmount,
      dgcastAmount,
      bonusAmount,
      rebateAmount,
      waterAmount,
      activityAmount,
      profitAmount,
      userId, userName
    } = item
    let flag = userName !== '合计' && userName !== highUser && index !== 0
    return (
      <View style={{padding: 10}}>
        <Flex>
          {
            flag ? <Text style={styles.light} onPress={() => {
              onPress(userId, userName)
            }}>{userName}</Text> : <Text style={styles.dark}>{userName}</Text>
          }
        </Flex>
        <Flex direction={'row'} justify={'space-between'}>
          <View style={styles.column}>
            <Text style={styles.title}>充值:</Text>
            <Text style={styles.value}>{toFixed4(rechargeActualAmount)}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>提现:</Text>
            <Text style={styles.value}>{toFixed4(withdrawActualAmount)}</Text>
          </View>
        </Flex>
        <Flex direction={'row'} justify={'space-between'}>
          <View style={styles.column}>
            <Text style={styles.title}>消费量:</Text>
            <Text style={styles.value}>{toFixed4(realConsumeAmount)}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>代购额:</Text>
            <Text style={styles.value}>{toFixed4(dgcastAmount)}</Text>
          </View>
        </Flex>
        <Flex direction={'row'} justify={'space-between'}>
          <View style={styles.column}>
            <Text style={styles.title}>中奖:</Text>
            <Text style={styles.value}>{toFixed4(bonusAmount)}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>返点:</Text>
            <Text style={styles.value}>{toFixed4(rebateAmount)}</Text>
          </View>
        </Flex>
        <Flex direction={'row'} justify={'space-between'}>
          <View style={styles.column}>
            <Text style={styles.title}>返水:</Text>
            <Text style={styles.value}>{toFixed4(waterAmount)}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>活动:</Text>
            <Text style={styles.value}>{toFixed4(activityAmount)}</Text>
          </View>
        </Flex>
        <Flex direction={'row'} justify={'space-between'}>
          <View style={styles.column}>
            <Text style={styles.title}>盈亏:</Text>
            <Text style={styles.value}>{toFixed4(profitAmount)}</Text>
          </View>
          <View style={styles.column}>
          </View>
        </Flex>
      </View>
    )
  }
}

class TeamBaccaratReport extends React.Component {
  static navigationOptions = {
    title: '团队百家乐报表'
  }

  constructor (props) {
    super(props)
    let end = dayjs().format('YYYY-MM-DD')
    let start = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    this.state = {
      KeyName: 'TeamBaccaratReport',
      isShow: false,
      previousId: [],
      previousUser: [],
      api: '/frontReport/count/bjlReport',
      summary: {},
      params: {
        userName: '',
        currencyCode: 'CNY',
        startTime: start,
        endTime: end,
        formType: 0,
        pageSize: 50,
        pageNumber: 1
      }
    }
  }
  
  componentWillUnmount(){
    this.setState = () => () => {}
  }

  // 返回上一级
  goBack = async () => {
    let {previousId, previousUser} = this.state
    let userId = previousId.pop()
    let userName = previousUser.pop()
    await this.setState({isShow: true}, () => {
      this.setState({isShow: false, params: {...this.state.params, userId, userName}, previousId, previousUser})
    })
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
        onPress={this.onPress}/>
    )
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

  onSearch = async () => {
    await this.setState({isShow: true}, () => {
      this.setState({isShow: false})
    })
  }

  render () {
    let {api, params, KeyName, isShow, previousId} = this.state
    return (
      <View style={styles.container}>
        <WingBlank>
          <QueryDate handleDate={this.handleDate}/>
        </WingBlank>
        {isShow ? null :
          <UIListView
            ref={ref => this.TeamBaccaratReport = ref}
            api={api}
            KeyName={`KeyName-${KeyName}`}
            params={params}
            renderItem={this.renderItem}
            beforeUpdateList={({res, params}, fn) => {
              let dataList = res.data && res.data.pageColumns ? res.data.pageColumns : []
              let {total} = res.data.pageInfo
              let NullData =  params.pageNumber > Math.ceil(total / 50)
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
    fontSize: 18,
    color: '#999',
    flex: 2
  },
  column: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  value: {
    fontSize: 18,
    color: '#333',
    flex: 3
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
)(TeamBaccaratReport)
