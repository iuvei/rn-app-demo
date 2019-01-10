import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import UIListView from '../../../components/UIListView'
import {WingBlank, Flex, Modal,Button} from '@ant-design/react-native'
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
    let {item, showDetails} = this.props
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
    } = item
    return (
      <TouchableHighlight onPress={() => {
        showDetails(item)
      }}>
        <View style={styles.table}>
          <Flex>
            {
              status === 0 ? <Text style={styles.capital}>成功</Text> :
                <Text style={styles.failed}>{'失败'}</Text>
            }
          </Flex>
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
      </TouchableHighlight>
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
      visible: false,
      details: {},
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
        index={index} showDetails={this.showDetails}/>
    )
  }

  showDetails = (item) => {
    this.setState({
      visible: true,
      details: item
    })
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
    let {api, params, KeyName, isShow, visible, details} = this.state
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
        <Modal transparent visible={visible} title={<Text style={{fontSize: 20, color: '#1789e6'}}>详情</Text>}
               onClose={() => this.setState({visible: false})}>
          <View style={{marginTop: 10}}>
            <View style={styles.popColumn}>
              <Text>订单号:</Text>
              <Text>{details.orderId}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>返点:</Text>
              <Text>{details.currentRebate}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>实际返点:</Text>
              <Text>{details.actualRebate}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>返点类型:</Text>
              <Text>{MAP_TYPE_NAME[details.rebateType]}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>返点金额:</Text>
              <Text>{toFixed4(details.rebateAmount)}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>状态:</Text>
              <Text>{details.status === 0 ? '成功' : '失败'}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>实际返点金额:</Text>
              <Text>{toFixed4(details.actualAmount)}</Text>
            </View>
            <View style={styles.popColumn}>
              <Text>操作时间:</Text>
              <Text>{formatTime(details.rebateTime)}</Text>
            </View>
            <Button style={{marginTop: 10}} onPress={() => this.setState({visible: false})}>确定</Button>
          </View>
        </Modal>
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
  failed: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red'
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
