import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import UIListView from '../../../components/UIListView'
import { Flex, Button, Tabs, InputItem, Toast } from '@ant-design/react-native'
import QueryDate from '../../../components/QueryDate'
import QueryPickerOne from '../../../components/QueryPickerOne'
import { connect } from "react-redux"
import { contractStatus } from '../../../data/options'
import { AsetMyDaywageRule } from "../../../actions/member"
import { updateDividendRule, distributedContractDayWage } from '../../../api/member'

class ContractDaywage extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: '契约工资',
      headerRight: <Button style={{marginRight: 14}} type="ghost" size="small" onPress={navigation.getParam('onSearch')}>
        <Text style={{color: '#fff'}}>查询</Text>
      </Button>
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      KeyName: 'ContractDaywage',
      column: [
        {key: 'totalConsumption', name: '总消费量'},
        {key: 'totalCharge', name: '总充值量'},
        {key: 'totalProfitLoss', name: '总盈亏量'},
        {key: 'activeDayConsumption', name: '活跃日消费量'},
        {key: 'activeDayCharge', name: '活跃日充值量'},
        {key: 'activePeople', name: '活跃人数'},
        // {key: 'activeDay', name: '活跃天数'}, // 如果是契约日工资不用显示该字段
        {key: 'dividendProportion', name: '分红比例'},
        {key: 'dividendType', name: '分红类型', formatter(v) {
          return v < 5 ? '契约分红' : '契约日工资'
        }},
        {key: 'status', name: '状态', formatter(v) {
          return contractStatus[v].name
        }}
      ],
      // 下级日工资单 column
      columnDownuser: [
        {key: 'loginName', name: '用户名'},
        {key: 'dividendAmount', name: '分红金额'},
        {key: 'actualDividendProportion', name: '分红比例'},
        {key: 'dividendStartTime', name: '开始时间'},
        {key: 'dividendEndTime', name: '结束时间'},
        {key: 'isSatisfy', name: '是否满足分红', formatter(v) {
          if (v === 1) {
            return '满足'
          } else if (v === 0) {
            return '不满足'
          }
        }},
        {key: 'dividendProportion', name: '分红比例'},
        {key: 'status', name: '状态', formatter(v) {
          if (v === 3) {
            return '未派发'
          } else if (v === 4) {
            return '已派发'
          }
        }},
      ],
      params: {
        loginName: '',
        isSatisfy: '',
        status: '',
        dividendStartTime: '',
        dividendEndTime: ''
      },
      activeTab: 0
    }
  }
  
  componentWillUnmount(){
    this.setState = () => () => {}
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSearch: this.onSearch })
  }

  onSearch = async () => {
    if (this.state.activeTab === 1) {
      this.ContractDaywage.listView.refresh()
    } else if (this.state.activeTab === 0) {
      this.props.AsetMyDaywageRule()
    }
  }

  handleDate = ({startTime, endTime}) => {
    this.setState(prevState => ({
      params: Object.assign({}, {...prevState.params, dividendStartTime: startTime, dividendEndTime: endTime})
    }))
  }

  handlePickerBack = (val) => {
    this.setState(prevState => ({
      params: {...prevState.params, ...val}
    }))
  }

  distributedContract = ({dataItem}) => {
    let { id } = dataItem
    distributedContractDayWage({id}).then(res => {
      if (res.code === 0) {
        Toast.success(res.message)
      } else {
        Toast.fail(res.message)
      }
      this.onSearch()
    })
  }

  renderItem = (dataItem, idx, column, w) => {
    return <View key={idx} style={{backgroundColor: '#fff', margin: 10, padding: 10}}>
      {
        column.map(item => {
          return <Flex key={item.key + idx}>
              <Flex.Item>
                <Text style={{color: '#333', fontSize: 14, lineHeight: 20}}>{item.name}</Text>
              </Flex.Item>
              <Flex.Item>
                <Text style={{color: '#333', fontSize: 14, lineHeight: 20, textAlign: 'right'}}>{item.formatter ? item.formatter(dataItem[item.key]) : dataItem[item.key]}</Text>
              </Flex.Item>
            </Flex>
          })
      }
      { (w === 'my' && dataItem.status === 0) &&
        <Flex>
          <Flex.Item style={{paddingHorizontal: 20}}>
              <Button size="small" onPress={() => this.editContract({dataItem, isConfrim: false})}>拒绝</Button>
          </Flex.Item>
          <Flex.Item style={{paddingHorizontal: 20}}><Button size="small" onPress={() => this.editContract({dataItem, isConfrim: true})}>确认</Button></Flex.Item>
        </Flex>
      }
      {
        (w === 'downuser' && dataItem.status === 3 && Number(dataItem.isSatisfy) === 1) &&
        <Flex>
          <Flex.Item style={{paddingHorizontal: 20}}>
          </Flex.Item>
          <Flex.Item style={{paddingHorizontal: 20}}><Button size="small" onPress={() => this.distributedContract({dataItem})}>派发</Button></Flex.Item>
        </Flex>
      }
    </View>
  }

  editContract = ({dataItem, isConfrim}) => {
    let { id } = dataItem
    updateDividendRule({dividendType: 1, id, status: isConfrim ? 1 : 2}).then(res => {
      if (res.code === 0) {
        let str = isConfrim ? '确认成功' : '拒绝成功'
        Toast.success(res.message || str)
      } else {
        Toast.fail(res.message || '撤销失败，请重试')
      }
      this.onSearch()
    })
  }

  render() {
    const tabs = [
      {title: '我的'},
      {title: '下级'}
    ]

    return (
      <View style={{flex: 1}}>
        <Tabs tabs={tabs} onChange={(tab, index) => {
          if (index === 0) {
            this.props.AsetMyDaywageRule()
          }
          this.setState({
            activeTab: index
          })
        }}>
          <ScrollView>
            {
              this.props.myDaywageRule.map((dataItem, idx) => {
                return this.renderItem(dataItem, idx, this.state.column, 'my')
              })
            }
          </ScrollView>
          <View style={styles.container}>
            <View>
              <QueryDate handleDate={this.handleDate}/>
              <View>
                <Flex justify="between" style={{height: 30}}>
                  <Flex.Item>
                    <QueryPickerOne
                      data={[
                        {value: '', label: '全部'},
                        {value: 3, label: '未派发'},
                        {value: 4, label: '已派发'}
                      ]}
                      queryName={'status'}
                      handlePickerBack={this.handlePickerBack}/>
                  </Flex.Item>
                  <Flex.Item style={{marginHorizontal: 16}}>
                    <QueryPickerOne
                      data={[
                        {value: '', label: '全部'},
                        {value: 1, label: '满足 '},
                        {value: 0, label: '不满足 '}
                      ]}
                      queryName={'isSatisfy'}
                      handlePickerBack={this.handlePickerBack}/>
                  </Flex.Item>
                  <Flex.Item>
                    <View style={{backgroundColor: '#fff', height: 25, lineHeight: 25}}>
                      <InputItem
                        style={{lineHeight: 25, height: 25, borderBottomWidth: 0}}
                        value={this.state.params.loginName}
                        onChange={val => {
                          this.setState(prevState => ({
                            params: {...prevState.params, loginName: val}
                          }))
                        }}
                        placeholder="输入账号"
                      >
                      </InputItem>
                    </View>
                  </Flex.Item>
                </Flex>
              </View>
          </View>
            <UIListView
              ref={ref => this.ContractDaywage = ref}
              api={'/user/dividend/getContractDayWageList'}
              KeyName={`KeyName-${this.state.KeyName}`}
              params={this.state.params}
              renderItem={(item, index) => this.renderItem(item, index, this.state.columnDownuser, 'downuser')}
              // 第一个参数 params 第二个子组件的将要请求的第N页
              // beforeHttpGet={async ({params, page}, fn) => {
              //   // 解决父级数据数据源同步问题，然后数据给到子组件本身
              //   await this.setState({
              //     params: Object.assign({}, params, {
              //       pageNumber: page
              //     })
              //   })
              //   let handlerParams = this.state.params
              //   fn(handlerParams, true)
              // }}
              // 返回数据空或者处理后的数据源
              beforeUpdateList={({res}, fn) => {
                let dataList = res.data && res.data ? res.data : []
                let {pageNumber, pageSize, totalCount} = res.data
                let NullData = Math.ceil(totalCount / pageSize) < pageNumber
                // 或在这里增加 其他状态码的处理Alter
                fn(NullData ? [] : {dataList})
              }}
            />
          </View>
        </Tabs>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let { myDaywageRule } = state.member
  return { myDaywageRule }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AsetMyDaywageRule: () => dispatch(AsetMyDaywageRule())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractDaywage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 5,
    backgroundColor: '#f0f0f0',
  }
})
