import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import UIListView from '../../../components/UIListView'
import {WingBlank, Flex, InputItem} from '@ant-design/react-native'
import QueryDate from '../../../components/QueryDate'
import dayjs from 'dayjs'
import QueryPickerOne from '../../../components/QueryPickerOne'

const GAME_TYPE = [
  {
    label: '彩票',
    id: 1,
    value: 0
  }, {
    label: '快乐彩',
    id: 2,
    value: 1
  }
]

class FlatListItem extends PureComponent {
  render () {
    let {
      userName,
      lotterName,
      profitLoss,
      purchaseAmount,
      rebateAmount,
      withdrawAmount,
      bonus,
      bettingAmount,
      undrawnAmount,
    } = this.props.item
    return (
      <View style={styles.table}>
        <Flex><Text>{userName}</Text></Flex>
        <Flex direction={'row'} justify={'space-between'}>
          <View style={styles.column}>
            <Text style={styles.title}>彩种名:</Text>
            <Text style={styles.value}>{lotterName}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>盈亏:</Text>
            <Text style={styles.value}>{profitLoss}</Text>
          </View>
        </Flex>
        <Flex direction={'row'} justify={'space-between'}>
          <View style={styles.column}>
            <Text style={styles.title}>代购额:</Text>
            <Text style={styles.value}>{purchaseAmount}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>返点:</Text>
            <Text style={styles.value}>{rebateAmount}</Text>
          </View>
        </Flex>
        <Flex direction={'row'} justify={'space-between'}>
          <View style={styles.column}>
            <Text style={styles.title}>撤单:</Text>
            <Text style={styles.value}>{withdrawAmount}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>奖金:</Text>
            <Text style={styles.value}>{bonus}</Text>
          </View>
        </Flex>
        <Flex direction={'row'} justify={'space-between'}>
          <View style={styles.column}>
            <Text style={styles.title}>投注:</Text>
            <Text style={styles.value}>{bettingAmount}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>未开奖:</Text>
            <Text style={styles.value}>{!undrawnAmount ? '0.0000' : undrawnAmount}</Text>
          </View>
        </Flex>
      </View>
    )
  }
}

export default class TeamLotteryReport extends React.Component {
  static navigationOptions = {
    title: '团队彩种报表'
  }

  constructor (props) {
    super(props)
    let end = dayjs().format('YYYY-MM-DD')
    let start = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    this.state = {
      KeyName: 'TeamLotteryReport',
      api: '/frontReport/reportform/getTeamLotteryReport',
      isShow: false,
      params: {
        userName: '',
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
          <Flex direction={'row'}>
            <Flex.Item>
              <QueryPickerOne
                data={GAME_TYPE}
                queryName={'reportType'}
                handlePickerBack={this.handlePickerBack}/>
            </Flex.Item>
            <InputItem style={{flex: 1}} placeholder={'请输入账号'}
                       onChange={value => this.setState({params: {...params, userName: value}})}/>
          </Flex>
        </WingBlank>
        {isShow ? null :
          <UIListView
            ref={ref => this.TeamLotteryReport = ref}
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
  table: {
    padding: 10
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
