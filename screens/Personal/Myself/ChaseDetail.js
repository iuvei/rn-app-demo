import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native'
import {
  Flex,
  Button,
  Tabs
} from '@ant-design/react-native'
import { doCancelOrder } from '../../../api/member'
import {queryOrderAdditions, getChaseOrderDetail} from '../../../api/lottery'
import { orderStatus } from '../../../data/options'

const chaseOrderStatus = [
  {value: '', label: '所有状态'},
  {value: 0, label: '进行中', color: 'green'},
  {value: 1, label: '系统终止', color: 'red'},
  {value: 2, label: '已经完成', color: '#999'}
]
const chaseorderdetailtabs = [
  { title: '详情' },
  { title: '记录' }
]

class ChaseDetail extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: '订单详情'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      keyList: [
        {key: 'batchNo', title: '批次号'},
        {key: 'createTime', title: '投注时间'},
        {key: 'lotterName', title: '游戏名称'},
        {key: 'openCode', title: '开奖号码'},
        {key: 'castCodes', title: '投注号码'},
        {key: 'ruleName', title: '玩法名称'},
        {key: 'orderIssue', title: '起始奖期 '},
        {key: 'haltAddition', title: '中将即停', formatter: function(v) {
          return ['是', '否'][v]
        }},
        {key: 'periodEd', title: '已完成期数'},
        {key: 'periodCancel', title: '已取消期数'},
        {key: 'periodIng', title: '进行中期数'},
        {key: 'periodAll', title: '所有期数'},
        {key: 'castAmount', title: '追号金额'},
        {key: 'castAmountEd', title: '已完成金额'},
        {key: 'castAmountCancel', title: '已取消金额'},
        {key: 'rewardBonus', title: '中奖金额'}
      ],
      columns: [
        {key: 'orderIssue', title: '期号', width: '30%'},
        {key: 'castMultiple', title: '倍数', width: '10%'},
        {key: 'castAmount', title: '投注金额（元）', width: '25%'},
        {
          key: 'status',
          title: '状态',
          render: ({item, index, value}) => {
            return value
          },
          width: '22%'
        },
        {
          key: 'status',
          title: '操作',
          render: ({item, index, value}) => {
            return value
          },
          width: '13%'
        }
      ],
      detailInfo: props.navigation.getParam('detail', {}),
      pageNumber: 1,
      pageSize: 15,
      lotterCode: '', // 必传
      startTime: '',
      endTime: '',
      batchNo: '',
      orderShareList: []
    }
    getChaseOrderDetail({pageSize: 15, pageNumber: 1, userId: props.loginInfo.acc.user.userId, batchNo: props.navigation.getParam('detail', {}).batchNo}).then(res => {
      if (res.code === 0) {
        this.setState(prevState => ({
          detailInfo: {...prevState.detailInfo, ...res.data.orderInfoList[0]}
        }))
      }
    })
  }

  componentDidMount() {
    queryOrderAdditions({userId: this.props.loginInfo.acc.user.userId, batchNo: this.props.navigation.getParam('detail', {}).batchNo}).then(res => {
      if (res.code === 0) {
        this.setState({
          orderShareList: Object.keys(res.data).length ? res.data : []
        })
      }
    })
  }

  render() {
    let { detailInfo, keyList, columns, orderShareList } = this.state
    let statusobj = chaseOrderStatus.filter(obj => {
      return obj.value === detailInfo.status
    })[0]

    return (
      <View style={{flex: 1}}>
        <Tabs tabs={chaseorderdetailtabs}>
          <ScrollView style={{}}>
            <View style={styles.container}>
              <View style={{height: 9, width: '100%', backgroundColor: '#005baf', borderRadius: 10}}>
                <Image source={require('../../../assets/images/detail_top.png')} style={{height: 9, width: '100%'}}/>
              </View>
              <Text style={{fontSize: 20, lineHeight: 44, textAlign: 'center', color: statusobj.color, marginTop: -5, backgroundColor: '#fff', width: '98%'}}>{statusobj.label}</Text>
              {
                keyList.map(item => {
                  return (
                    <View style={{backgroundColor: '#fff', width: '98%'}} key={item.title}>
                      <Flex>
                        <Text style={{width: 100, paddingLeft: 20, color: '#a4a4a4', lineHeight: 32, fontSize: 14}}>{item.title}</Text>
                        <Text style={{flex: 1, textAlign: 'right', color: '#585858', paddingRight: 16, lineHeight: 32, fontSize: 14}}>{item.formatter ? item.formatter(detailInfo[item.key]) : detailInfo[item.key]}</Text>
                      </Flex>
                      <Image source={require('../../../assets/images/detail_dashed.png')} style={{width: '100%', height: 0.5}} />
                    </View>
                )})
              }
              <View style={{backgroundColor: '#fff', paddingTop: 16, width: '98%', alignItems: 'center'}}>
                <Button type="warning" size="small" style={{width: 90}}>
                  撤销订单
                </Button>
              </View>
              <Image source={require('../../../assets/images/detail_bottom.png')} style={{width: '98%'}}/>
            </View>
          </ScrollView>
          <ScrollView style={{}}>
            <View>
              <Flex style={{backgroundColor: '#e9eaec'}}>
                <View style={{width: '30%'}}><Text style={styles.chaseListTitle}>期号</Text></View>
                <View style={{width: '10%'}}><Text style={styles.chaseListTitle}>倍数</Text></View>
                <View style={{width: '25%'}}><Text style={styles.chaseListTitle}>投注金额</Text></View>
                <View style={{width: '22%'}}><Text style={styles.chaseListTitle}>状态</Text></View>
                <View style={{width: '13%'}}><Text style={styles.chaseListTitle}>操作</Text></View>
              </Flex>
              {
                orderShareList.map((order, idx) => {
                  return (
                    <Flex key={order.orderId} style={{backgroundColor: '#fff'}}>
                      {
                        columns.map(col => {
                          return (
                            <View key={col.title} style={{width: col.width}}>
                              <Text style={styles.chaseListText}>{col.render ? col.render({item: order, value: order[col.key], index: idx}) : order[col.key]}</Text>
                            </View>
                          )
                        })
                      }
                    </Flex>
                  )
                })
              }
            </View>
          </ScrollView>
        </Tabs>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let {loginInfo} = state.common
  return {loginInfo}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChaseDetail)

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#f0f0f0',
    alignItems: 'center'
  },
  chaseListTitle: {
    lineHeight: 26,
    color: '#333',
    textAlign: 'center'
  },
  chaseListText: {
    color: '#666',
    lineHeight: 32,
    textAlign: 'center'
  }
})
