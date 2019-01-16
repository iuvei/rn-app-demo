import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import UIListView from '../../../components/UIListView'
import {WingBlank, Flex, InputItem} from '@ant-design/react-native'
import QueryDate from '../../../components/QueryDate'
import dayjs from 'dayjs'
import {toFixed4} from '../../../utils/MathUtils'

class FlatListItem extends PureComponent {
  render () {
    let {
      dgcastAmount,
      rechargeActualAmount,
      withdrawActualAmount,
      realConsumeAmount,
      bonusAmount,
      rebateAmount,
      waterAmount,
      activityAmount,
      profitAmount,
    } = this.props.item
    return (
      <View style={styles.table}>
        <Flex direction={'row'} justify={'space-between'}>
          <View style={styles.column}>
            <Text style={styles.title}>代购额:</Text>
            <Text style={styles.value}>{toFixed4(dgcastAmount)}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>充值:</Text>
            <Text style={styles.value}>{toFixed4(rechargeActualAmount)}</Text>
          </View>
        </Flex>
        <Flex direction={'row'} justify={'space-between'}>
          <View style={styles.column}>
            <Text style={styles.title}>提现:</Text>
            <Text style={styles.value}>{toFixed4(withdrawActualAmount)}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>消费:</Text>
            <Text style={styles.value}>{toFixed4(realConsumeAmount)}</Text>
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

export default class BaccaratReport extends React.Component {
  static navigationOptions = {
    title: '百家乐报表'
  }

  constructor (props) {
    super(props)
    let end = dayjs().format('YYYY-MM-DD')
    let start = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    this.state = {
      KeyName: 'BaccaratReport',
      api: '/frontReport/count/bjlMineReport',
      isShow: false,
      params: {
        orderType: 2, // 0彩票,1游戏，2 百家乐
        pageNumber: 1,
        pageSize: 10,
        startTime: start,
        endTime: end
      }
    }
  }

  renderItem = (item, index) => {
    return (
      <FlatListItem
        item={item}
        index={index}/>
    )
  }

  onSearch = async () => {
    await this.setState({isShow: true}, () => {
      this.setState({isShow: false})
    })
  }

  handleDate = async ({startTime, endTime}) => {
    await this.setState(prevState => ({
      params: {...prevState.params, startTime, endTime}
    }))
    this.onSearch()
  }

  handlePickerBack = (val) => {
    this.setState(prevState => ({
      params: {...prevState.params, ...val}
    }))
  }

  render () {
    let {api, params, KeyName, isShow} = this.state
    return (
      <View style={styles.container}>
        <WingBlank>
          <QueryDate handleDate={this.handleDate}/>
        </WingBlank>
        {isShow ? null :
          <UIListView
            ref={ref => this.BaccaratReport = ref}
            api={api}
            KeyName={`KeyName-${KeyName}`}
            params={params}
            renderItem={this.renderItem}
            beforeUpdateList={({res}, fn) => {
              let dataList = res.data ? [res.data] : []
              let {currentPage, total} = res.data
              let NullData = Math.ceil(total / 10) < currentPage
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
  table: {
    padding: 10
  },
  capital: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gold'
  },
  title: {
    fontSize: 16,
    color: '#999'
  },
  value: {
    fontSize: 16,
    color: '#333'
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginRight: 8
  }
})
