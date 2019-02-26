import React from 'react'
import { ScrollView, View, Text } from 'react-native' // , TouchableHighlight, KeyboardAvoidingView
import { InputItem, Flex, Button, Toast, List, Modal } from '@ant-design/react-native'
import { insertDividendRule, updateDividendRule } from '../api/member'
import UIListView from './UIListView'
import { contractStatus } from '../data/options'
// import { isNumber } from 'lodash'

class Contract extends React.Component {
  state = {
    // selectedId: 0,
    // contractList: [],
    // signed: false,
    // contract: {},
    // 下级日工资单 column
    columnWage: [
      {key: 'totalConsumption', name: '总消费量'},
      {key: 'totalCharge', name: '总充值量'},
      {key: 'totalProfitLoss', name: '总盈亏量'},
      {key: 'activeDayConsumption', name: '活跃日消费量'},
      {key: 'activeDayCharge', name: '活跃日充值量'},
      {key: 'activePeople', name: '活跃人数'},
      // {key: 'activeDay', name: '活跃天数'}, // 如果是契约日工资不用显示该字段
      {key: 'dividendProportion', name: '工资比例'},
      {key: 'dividendType', name: '分红类型', formatter(v) {
        return v < 5 ? '契约分红' : '契约日工资'
      }},
      {key: 'status', name: '状态', formatter(v) {
        return contractStatus[v].name
      }}
    ],
    columnDividend: [
      {key: 'totalConsumption', name: '总消费量'},
      {key: 'totalCharge', name: '总充值量'},
      {key: 'totalProfitLoss', name: '总盈亏量'},
      {key: 'activeDayConsumption', name: '活跃日消费量'},
      {key: 'activeDayCharge', name: '活跃日充值量'},
      {key: 'activePeople', name: '活跃人数'},
      {key: 'activeDay', name: '活跃天数'}, // 如果是契约日工资不用显示该字段
      {key: 'dividendProportion', name: '分红比例'},
      {key: 'dividendType', name: '分红类型', formatter(v) {
        return v < 5 ? '契约分红' : '契约日工资'
      }},
      {key: 'status', name: '状态', formatter(v) {
        return contractStatus[v].name
      }}
    ],
    visible: false,
    formData: {
      currencyCode: 'CNY',
      totalConsumption: '', // 总消费量
      totalCharge: '', // 总充值量
      totalProfitLoss: '', // 总盈亏
      activeDayConsumption: '', // 活跃日消费量
      activeDayCharge: '', // 活跃日充值量
      activePeople: '', // 活跃人数
      activeDay: '', // 活跃天数(契约日工资不传)
      dividendProportion: '', // 分红比例
      status: 0 // 状态(默认传0)
    },
    isEdit: false
  }

  async componentDidMount () {
    let {subUserInfo} = this.props
    // let res = await getUserContract({
    //   userId: subUserInfo.userId,
    //   type: 1
    // })
    // if (res.data && res.data.length > 0) {
    //   res.data.forEach(item => {
    //     let obj = {
    //       id: item.id,
    //       status: item.status,
    //       strategy: item.strategy,
    //       contract: JSON.parse(item.contractContent)
    //     }
    //     this.state.contractList.push(obj)
    //   })
    // }
  }

  // renderSigned = () => {
  //   let {signed, contract} = this.state
  //   return (
  //     <View>
  //       <List>
  //         <InputItem
  //           value={contract.money}
  //           placeholder="满足天数"
  //           onChange={value => {
  //             this.setState({
  //               chargeData: {
  //                 ...contract,
  //                 money: value
  //               }
  //             })
  //           }}>
  //           满足天数
  //         </InputItem>
  //       </List>
  //     </View>
  //   )
  // }
  
  componentWillUnmount(){
    this.setState = () => () => {}
  }

  renderItem = (dataItem, idx, column) => {
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
      { (dataItem.status === 0 || dataItem.status === 1) &&
        <Flex>
          <Flex.Item style={{paddingHorizontal: 20}}>
              <Button size="small" onPress={() => this.editContract({dataItem, isEdit: false})}>撤销</Button>
          </Flex.Item>
          <Flex.Item style={{paddingHorizontal: 20}}><Button size="small" onPress={() => this.editContract({dataItem, isEdit: true})}>修改</Button></Flex.Item>
        </Flex>
      }
    </View>
  }

  onSearch = () => {
    this.downUserRule.listView.refresh()
  }

  editContract = ({dataItem, isEdit}) => {
    let { dividendType } = this.props
    let { id } = dataItem
    if (!isEdit) {
      updateDividendRule({dividendType, id, status: 4}).then(res => {
        if (res.code === 0) {
          Toast.success(res.message || '撤销成功')
        } else {
          Toast.fail(res.message || '撤销失败，请重试')
        }
        this.onSearch()
      })
      return
    } else {
      this.setState(prevState => ({
        formData: {...prevState.formData, ...dataItem},
        visible: true,
        isEdit: true
      }))
    }
  }

  addContract = () => {
    let formData = JSON.parse(JSON.stringify(this.state.formData))
    let { dividendType, subUserInfo } = this.props
    let { loginName, userId, pid } = subUserInfo
    if (dividendType === 5) {
      delete formData.activeDay
    }
    // let {} = formData
    insertDividendRule({...formData, dividendType, userId, loginName, ownerId: pid}).then(res => {
      if (res.code === 0) {
        this.onSearch()
        Toast.success(res.message)
      } else {
        Toast.fail(res.message || '添加失败，请稍后重试')
      }
      this.setState({
        visible: false
      })
    })
  }

  init = () => {
    this.setState(prevState => ({
      formData: {
        currencyCode: 'CNY',
        totalConsumption: '', // 总消费量
        totalCharge: '', // 总充值量
        totalProfitLoss: '', // 总盈亏
        activeDayConsumption: '', // 活跃日消费量
        activeDayCharge: '', // 活跃日充值量
        activePeople: '', // 活跃人数
        activeDay: '', // 活跃天数(契约日工资不传)
        dividendProportion: '', // 分红比例
        status: 0 // 状态(默认传0)
      }
    }))
  }

  render () {
    let {subUserInfo, dividendType} = this.props
    let params = {
      userId: subUserInfo.userId,
      dividendType: dividendType
    }

    return (
      // <SegmentedControl selectedIndex={this.state.selectedId} values={['已签', '新增']}
      //                   style={{}} onChange={e => {
      //   this.setState({selectedId: e.nativeEvent.selectedSegmentIndex})
      // }}/>
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{width: '100%', borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0'}}>
          <Button type="primary" style={{height: 36, marginHorizontal: 25, marginVertical: 10}}
            onPress={() => {
              this.setState({
                visible: true,
                isEdit: false
              })
              this.init()
            }}>新增契约{dividendType === 5 ? '日工资' : '分红'}</Button>
        </View>
        <UIListView
          ref={ref => this.downUserRule = ref}
          api={'/user/dividend/getDividendRule'}
          KeyName={`KeyName-downUserRule`}
          params={params}
          renderItem={(item, index) => this.renderItem(item, index, dividendType === 5 ? this.state.columnWage : this.state.columnDividend)}
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
        <Modal
          popup
          maskClosable
          closable
          visible={this.state.visible}
          animationType="slide-down"
          onClose={() => {
            this.setState({
              visible: false
            })
          }}
        >
          <View style={{ paddingTop: 30, paddingHorizontal: 20, paddingBottom: 10 }}>
            <ScrollView style={{height: 255}}>
              <List>
                <InputItem
                  type="number"
                  value={this.state.formData.totalConsumption + ''}
                  onChange={value => {
                    this.setState(prevState => ({
                      formData: {...prevState.formData, totalConsumption: value},
                    }))
                  }}
                  labelNumber={6}
                  placeholder="总消费量"
                >
                  总消费量
                </InputItem>
                <InputItem
                  type="number"
                  value={this.state.formData.totalCharge + ''}
                  onChange={value => {
                    this.setState(prevState => ({
                      formData: {...prevState.formData, totalCharge: value},
                    }))
                  }}
                  labelNumber={6}
                  placeholder="总充值量"
                >
                  总充值量
                </InputItem>
                <InputItem
                  type="number"
                  value={this.state.formData.totalProfitLoss + ''}
                  onChange={value => {
                    this.setState(prevState => ({
                      formData: {...prevState.formData, totalProfitLoss: value},
                    }))
                  }}
                  labelNumber={6}
                  placeholder="总盈亏"
                >
                  总盈亏
                </InputItem>
                <InputItem
                  type="number"
                  value={this.state.formData.activeDayConsumption + ''}
                  onChange={value => {
                    this.setState(prevState => ({
                      formData: {...prevState.formData, activeDayConsumption: value},
                    }))
                  }}
                  labelNumber={6}
                  placeholder="活跃日消费量"
                >
                  活跃日消费量
                </InputItem>
                <InputItem
                  type="number"
                  value={this.state.formData.activeDayCharge + ''}
                  onChange={value => {
                    this.setState(prevState => ({
                      formData: {...prevState.formData, activeDayCharge: value},
                    }))
                  }}
                  labelNumber={6}
                  placeholder="活跃日充值量"
                >
                  活跃日充值量
                </InputItem>
                <InputItem
                  type="number"
                  value={this.state.formData.activePeople + ''}
                  onChange={value => {
                    this.setState(prevState => ({
                      formData: {...prevState.formData, activePeople: value},
                    }))
                  }}
                  labelNumber={6}
                  placeholder="活跃人数"
                >
                  活跃人数
                </InputItem>
                {
                  dividendType === 1 &&
                  <InputItem
                    type="number"
                    value={this.state.formData.activeDay + ''}
                    onChange={value => {
                      this.setState(prevState => ({
                        formData: {...prevState.formData, activeDay: value},
                      }))
                    }}
                    labelNumber={6}
                    placeholder="活跃天数"
                  >
                    活跃天数
                  </InputItem>
                }
                <InputItem
                  type="number"
                  value={this.state.formData.dividendProportion + ''}
                  onChange={value => {
                    this.setState(prevState => ({
                      formData: {...prevState.formData, dividendProportion: value},
                    }))
                  }}
                  labelNumber={6}
                  placeholder="工资比例"
                >
                  工资比例
                </InputItem>
              </List>
            </ScrollView>
          </View>
          <Flex>
            <Flex.Item style={{paddingHorizontal: 30}}>
              <Button size="small" style={{marginBottom: 10, height: 40}} onPress={() => this.setState({visible: false})}>关闭</Button>
            </Flex.Item>
            <Flex.Item style={{paddingHorizontal: 30}}>
              <Button type="primary" style={{marginBottom: 10, height: 40}} onPress={this.addContract}>
                <Text>{this.state.isEdit ? '修改' : '新增'}</Text>
              </Button>
            </Flex.Item>
          </Flex>
        </Modal>
      </ScrollView>
    )
  }
}

export default Contract
