import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import UIListView from '../../../components/UIListView'
import {WingBlank, Flex, InputItem} from '@ant-design/react-native'
import QueryDate from '../../../components/QueryDate'
import dayjs from 'dayjs'
import QueryPickerOne from '../../../components/QueryPickerOne'
import {toFixed4, formatTime} from '../../../utils/MathUtils'

const GAME_TYPE = [
  {
    label: '彩票返点',
    id: 1,
    value: 0
  }, {
    label: '快乐彩返点',
    id: 2,
    value: 1
  },
  {
    label: '百家乐真人返点',
    id: 3,
    value: 2
  }, {
    label: '百家乐体育返点',
    id: 4,
    value: 3
  },
  {
    label: '百家乐电子返点',
    id: 5,
    value: 4
  },
  {
    label: '百家乐彩票返点',
    id: 6,
    value: 5
  }
]

const MAP_TYPE_NAME = {
  0: '彩票返点',
  1: '快乐彩返点',
  2: '百家乐真人返点',
  3: '百家乐体育返点',
  4: '百家乐电子返点',
  5: '百家乐彩票返点',
}
class FlatListItem extends PureComponent {
  render () {
    let {
      actualAmount,
      actualRebate,
      currentRebate,
      id,
      orderId,
      rebateAmount,
      rebateTime,
      rebateType,
      status,
      userId
    } = this.props.item
    return (
      <View style={styles.table}>
        <Flex><Text style={styles.capital}>{status === 0 ? '成功' : '失败'}</Text></Flex>
        <Flex direction={'row'} justify={'space-between'}>
          <View style={styles.column}>
            <Text style={styles.title}>返点类型:</Text>
            <Text style={styles.value}>{MAP_TYPE_NAME[rebateType]}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>返点金额:</Text>
            <Text style={styles.value}>{toFixed4(rebateAmount)}</Text>
          </View>
        </Flex>
        <Flex direction={'row'} justify={'space-between'}>
          <View style={styles.column}>
            <Text style={styles.title}>实际返点金额:</Text>
            <Text style={styles.value}>{toFixed4(actualAmount)}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>个人返点:</Text>
            <Text style={styles.value}>{toFixed4(rebateAmount)}</Text>
          </View>
        </Flex>
        <Flex direction={'row'} justify={'space-between'}>
          <View style={styles.column}>
            <Text style={styles.title}>操作时间:</Text>
            <Text style={styles.value}>{formatTime(rebateTime)}</Text>
          </View>
          <View style={styles.column}>
          </View>
        </Flex>
      </View>
    )
  }
}

export default class RebateHistory extends React.Component {
  static navigationOptions = {
    title: '返点记录'
  }

  constructor (props) {
    super(props)
    let end = dayjs().format('YYYY-MM-DD')
    let start = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    this.state = {
      KeyName: 'RebateHistory',
      api: '/frontReport/capitalBase/queryRebateRecords',
      isShow: false,
      params: {
        orderId: '',
        pageNumber: 1,
        pageSize: 10,
        type: 0,
        startTime: start,
        endTime: end,
        userId: 20
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
          <Flex style={{marginTop: 6}} direction={'row'}>
            <Flex.Item>
              <QueryPickerOne
                data={GAME_TYPE}
                queryName={'type'}
                handlePickerBack={this.handlePickerBack}/>
            </Flex.Item>
            <Flex.Item></Flex.Item>
            <Flex.Item></Flex.Item>
          </Flex>
        </WingBlank>
        {isShow ? null :
          <UIListView
            ref={ref => this.RebateHistory = ref}
            api={api}
            KeyName={`KeyName-${KeyName}`}
            params={params}
            renderItem={this.renderItem}
            beforeUpdateList={({res}, fn) => {
              console.log(res)
              let dataList = res.data && res.data.data ? res.data.data : []
              let {pageNumber, totalCount} = res.data
              let NullData = Math.ceil(totalCount / 10) < pageNumber
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
