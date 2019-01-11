import React, {PureComponent} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import UIListView from '../../../components/UIListView'
import {WingBlank, Flex, InputItem} from '@ant-design/react-native'
import QueryDate from '../../../components/QueryDate'
import dayjs from 'dayjs'
import {toFixed4, formatDate} from '../../../utils/MathUtils'

class FlatListItem extends PureComponent {
  render () {
    let {
      lotterName,
      profitLoss,
      purchaseAmount,
      rebateAmount,
      withdrawAmount,
      bonus,
      bettingAmount,
      teamRebateAmount,
    } = this.props.item
    return (
      <View style={styles.table}>
        <Flex><Text style={styles.capital}>{lotterName}</Text></Flex>
        <Flex direction={'row'} justify={'space-between'}>
          <View style={styles.column}>
            <Text style={styles.title}>团队返点:</Text>
            <Text style={styles.value}>{teamRebateAmount}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>盈亏:</Text>
            <Text style={styles.value}>{toFixed4(profitLoss)}</Text>
          </View>
        </Flex>
        <Flex direction={'row'} justify={'space-between'}>
          <View style={styles.column}>
            <Text style={styles.title}>代购额:</Text>
            <Text style={styles.value}>{toFixed4(purchaseAmount)}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>个人返点:</Text>
            <Text style={styles.value}>{toFixed4(rebateAmount)}</Text>
          </View>
        </Flex>
        <Flex direction={'row'} justify={'space-between'}>
          <View style={styles.column}>
            <Text style={styles.title}>撤单:</Text>
            <Text style={styles.value}>{toFixed4(withdrawAmount)}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>奖金:</Text>
            <Text style={styles.value}>{toFixed4(bonus)}</Text>
          </View>
        </Flex>
        <Flex direction={'row'} justify={'space-between'}>
          <View style={styles.column}>
            <Text style={styles.title}>投注:</Text>
            <Text style={styles.value}>{toFixed4(bettingAmount)}</Text>
          </View>
          <View style={styles.column}>
          </View>
        </Flex>
      </View>
    )
  }
}

export default class TeamBaccaratReport extends React.Component {
  static navigationOptions = {
    title: '团队百家乐报表'
  }

  constructor (props) {
    super(props)
    let end = formatDate()
    let start = formatDate(dayjs().subtract(1, 'day'))
    this.state = {
      KeyName: 'TeamBaccaratReport',
      api: '/frontReport/reportform/getUserLotteryReport',
      isShow: false,
      params: {
        lotterCode: '',
        pageNumber: 1,
        pageSize: 10,
        reportType: 0,
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
          <Flex direction={'row'} style={{height: 30}}>
            <InputItem style={{flex: 1}} placeholder={'请输入账号'}
                       onChange={value => this.setState({params: {...params, userName: value}})}/>
            <Flex.Item />
          </Flex>
        </WingBlank>
        {isShow ? null :
          <UIListView
            ref={ref => this.TeamBaccaratReport = ref}
            api={api}
            KeyName={`KeyName-${KeyName}`}
            params={params}
            renderItem={this.renderItem}
            beforeUpdateList={({res}, fn) => {
              let dataList = res.data && res.data.pageColumns ? res.data.pageColumns : []
              let {currentPage, total} = res.data.pageInfo
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
