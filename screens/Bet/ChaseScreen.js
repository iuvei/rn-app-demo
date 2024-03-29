import React from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  View,
  Text,
  StyleSheet
} from 'react-native'
import {
  Tabs,
  WhiteSpace,
  Button,
  InputItem,
  Flex,
  Checkbox,
  Toast,
  List
} from '@ant-design/react-native'
import $Toast from '../../plugin/$Toast'
import { getChaseTime, toBuyLottery } from '../../api/lottery'
import { toCrypto } from '../../plugin/crypto'
import { stylesUtil, styleUtil } from '../../utils/ScreenUtil'
import { isInteger } from 'lodash'

const tabs = [
  { title: '利润率追号', value: 'lilv' },
  { title: '同倍追号', value: 'tongbei' },
  { title: '翻倍追号', value: 'fanbei' },
]

class ChaseScreen extends React.Component {
  static navigationOptions = {
    title: '追号'
  }

  constructor(props) {
    super(props)
    this.chasing = false
    this.state = {
      checkedAll: true,
      isLoading: false,
      orderList: props.navigation.getParam('orderList', []),
      buyCardInfo: props.navigation.getParam('buyCardInfo', {}),
      activeTab: 'lilv',

      chaseIssueTotal: '10',
      startMultiple: '1',
      bigMultiple: '100',
      lowIncome: '50',
      middleIssue: '1',
      nextType: 'cheng',
      nextMultiple: '2',
      total: '0.000',
      winStop: true,

      chaseList: [],
      showChaseList: []
    }
  }

  componentDidMount() {
  }

  componentWillUnmount(){
    this.setState = () => () => {}
  }

  getChaseList = ({size, showlen}) => {
    let {lotterCode} = this.props.navParams
    return getChaseTime({
      lotterCode,
      size
    }).then(res => {
      if (res.code === 0) {
        res.data.filter((item) => {
          item.multiple = 1
          item.money = 0.000
        })
        this.setState({
          chaseList: res.data
        })
        return Promise.resolve(res)
      } else {
        $Toast.fail(res.message)
      }
    }).catch(res => {
      return Promise.reject(res)
    })
  }

  beforeBuildOrder = () => {
    let { chaseIssueTotal } = this.state
    this.getChaseList({
      size: chaseIssueTotal,
      showlen: chaseIssueTotal
    }).then(res => {
      this.buildChaseOrder()
    })
  }

  getPrize = (buyCardData) => {
    let iwacPrize = 0
    buyCardData.filter(item => {
      let {model} = item
      let {chaseMin} = item.bonusPrize
      iwacPrize = iwacPrize + parseFloat(chaseMin) * model
    })
    return this.getFloat(iwacPrize, 4)
  }

  getFloat = (number, n) => {
    n = n ? parseInt(n) : 0
    if (n <= 0) return Math.round(number)
    number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n)
    return number
  }

  /**
   * 计算利润率
   * count 追号期数
   * sMultiple 开始倍数
   * maxMultiple 最大倍投
   * minProfit 最低利润率（百分比）
   * money 单倍金额
   * prize 单倍奖金
   */
  calculation = (count, sMultiple, maxMultiple, minProfit, money, prize, buyTotal) => {
    let result = []
    // 结果
    let totalMoney = 0
    let hisl = 0
    let fm = parseFloat(prize - buyTotal - buyTotal * minProfit)
    fm = this.getFloat(fm, 4)
    for (let i = 0; i < count; i++) {
      let ceil = Math.ceil(sMultiple * hisl * (1 + minProfit) / fm)
      let thisMutiple = fm === 0 ? sMultiple : ceil
      if (thisMutiple < 0) {
        $Toast.info('您设置的参数无法达到盈利，请重新选择！')
        return result
      }
      if (thisMutiple === 0) {
        thisMutiple = sMultiple
      }
      if (Number(thisMutiple) > Number(maxMultiple)) {
        thisMutiple = maxMultiple
      }

      let thisMoney = money * thisMutiple
      let thisPrize = fm * thisMutiple
      let tempTotal = totalMoney + thisMoney
      let thisProfit = (thisPrize - tempTotal) / tempTotal

      result.push({
        multiple: Number(thisMutiple),
        thisMoney: thisMoney,
        thisPrize: thisPrize,
        thisProfit: thisProfit
      })

      hisl = Number(hisl) + buyTotal * thisMutiple
    }
    return result
  }

  buildChaseOrder = () => {
    let showChaseList = []
    let tmptotal = 0
    let {activeTab, buyCardInfo, orderList, startMultiple, bigMultiple, lowIncome, middleIssue, chaseIssueTotal, nextMultiple, nextType, chaseList} = this.state
    let {total, num, multiple} = buyCardInfo
    if (activeTab === 'lilv') {
      let rulecodearr = ['']
      orderList.forEach((val) => {
        if (rulecodearr[rulecodearr.length - 1] !== val.ruleCode) {
          rulecodearr.push(val.ruleCode)
        }
      })
      if (rulecodearr.length > 2) {
        $Toast.info('利润率追号不支持混投，请确保您的投注都为同一玩法类型！')
        return
      }
      // 计算单倍奖金
      var prize = this.getPrize(orderList)
      // 计算单倍投注金额
      total = total / multiple
      let lowIncomeTxt = lowIncome / 100
      // 获取选项
      let sMultiple = startMultiple
      let maxMultiple = bigMultiple
      let minProfit = lowIncomeTxt
      let money = total
      let result = this.calculation(chaseIssueTotal, sMultiple, maxMultiple, minProfit, money, prize, num)
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          if (i > chaseList.length - 1) {
            break
          }
          let val = chaseList[i]
          let multiple = result[i].multiple
          tmptotal += total * multiple
          if (tmptotal > this.props.userBalanceInfoYE.currentBalance) {
            $Toast.info('当前余额不足以追号指定期数，已为您优化总追号期数')
            tmptotal -= total * multiple
            break
          }
          showChaseList.push({
            currentIssue: val.currentIssue,
            multiple: multiple,
            money: total * multiple,
            showTime: String(val.nextTime).slice(5),
            nextTime: val.nextTime,
            checked: true
          })
        }
      } else {
        $Toast.info('没有符合要求的方案，请调整参数重新计算！')
      }
    }
    if (activeTab === 'tongbei') {
      for (let i = 0; i < chaseIssueTotal; i++) {
        if (i > chaseList.length - 1) {
          break
        }
        let val = chaseList[i]
        tmptotal += total * startMultiple
        if (tmptotal > this.props.userBalanceInfoYE.currentBalance) {
          $Toast.info('当前余额不足以追号指定期数，已为您优化总追号期数')
          tmptotal -= total * startMultiple
          break
        }
        showChaseList.push({
          currentIssue: val.currentIssue,
          multiple: startMultiple,
          money: total * startMultiple,
          showTime: String(val.nextTime).slice(5),
          nextTime: val.nextTime,
          checked: true
        })
      }
    }
    if (activeTab === 'fanbei') {
      for (let i = 0; i < chaseIssueTotal; i++) {
        if (i > chaseList.length - 1) {
          break
        }
        let val = chaseList[i]
        let multiple = 1
        if (nextType === 'cheng') {
          multiple = i < middleIssue ? startMultiple : (startMultiple * Math.pow(nextMultiple, Math.floor(i / middleIssue)))
        }
        if (nextType === 'add') {
          multiple = i < middleIssue ? startMultiple : (Number(startMultiple) + nextMultiple * Math.floor(i / middleIssue))
        }
        if (multiple > 10000) {
          break
        }
        tmptotal += total * multiple
        if (tmptotal > this.props.userBalanceInfoYE.currentBalance) {
          $Toast.info('当前余额不足以追号指定期数，已为您优化总追号期数')
          tmptotal -= total * multiple
          break
        }
        showChaseList.push({
          currentIssue: val.currentIssue,
          multiple: multiple,
          money: total * multiple,
          showTime: String(val.nextTime).slice(5),
          nextTime: val.nextTime,
          checked: true
        })
      }
    }
    this.setState({
      showChaseList: showChaseList,
      total: Number(tmptotal).toFixed(4)
    })
    // 点击生成订单选中全部
    // this.selectAllTochase = true
  }

  submitFunc = () => {
    if (this.chasing) return
    let {winStop, showChaseList, orderList} = this.state
    if (showChaseList.length === 0) {
      return
    }
    let planList = []
    let [reqAmount] = [0, 0]
    let tmparr = showChaseList.filter(c => {
      return c.checked
    })
    tmparr.filter((sel, selIdx) => {
      let {multiple, nextTime, currentIssue} = sel
      orderList.filter(item => {
        let {castCodes, ruleCode, rebateMode, model, singlePrice} = item
        let amount = (parseFloat(item.castAmount) / parseFloat(item.castMultiple)) * multiple
        // let amount = (parseFloat(singlePrice)) * multiple
        reqAmount += parseFloat(Number(amount).toFixed(4))
        if (!selIdx) {
          // resNum += item.castNumber
        }
        let castMode = 0
        if (model === 1) castMode = 0
        if (model === 0.1) castMode = 1
        if (model === 0.01) castMode = 2
        if (model === 0.001) castMode = 3
        planList.push({
          castAmount: amount,
          castCodes,
          castMode,
          castMultiple: Number(multiple),
          rebateMode: rebateMode,
          ruleCode,
          orderIssue: currentIssue,
          nextTime
        })
      })
    })
    let {loginInfo, navParams} = this.props
    let {lotterCode, isOuter} = navParams
    let rep = {
      currencyCode: 'CNY',
      amount: Number(reqAmount).toFixed(5),
      // castNumber: resNum,
      detailsList: planList,
      isOuter,
      lotterCode,
      orderType: 0,
      isAddition: 1,
      haltAddition: winStop ? 0 : 1,
      userId: loginInfo.acc.user.userId
    }
    let repZip = ''
    if (!this.props.Environment) {
      repZip = toCrypto(rep)
    }
    this.chasing = true
    this.setState({
      isLoading: true
    }, () => {
      toBuyLottery(repZip || rep).then((res) => {
        this.setState({
          showChaseList: [],
          chaseList: [],
          total: '0'
        }, () => {
          setTimeout(() => {
            this.chasing = false
            this.setState({
              isLoading: false
            })
          }, 1000)
        })
        if (res.code === 0) {
          $Toast.success('追号成功')
        } else {
          $Toast.fail(res.message || '追号失败')
        }
      }).catch(() => {
        this.setState({
          showChaseList: [],
          chaseList: [],
          total: '0'
        }, () => {
          setTimeout(() => {
            this.chasing = false
            this.setState({
              isLoading: false
            })
          }, 1000)
        })
        $Toast.fail('网络异常，请稍后重试')
      })
    })
  }

  checkAllChange = (event) => {
    let arr = [].concat(this.state.showChaseList)
    let total = 0
    arr.forEach(function (item) {
      item.checked = event.target.checked
      if (event.target.checked) {
        total += Number(item.money)
      } else {
        total = 0
      }
    })
    this.setState({
      checkedAll: event.target.checked,
      showChaseList: arr,
      total: Number(total).toFixed(4)
    })
  }

  chaseItemChange = (event, index) => {
    let arr = [].concat(this.state.showChaseList)
    arr[index].checked = event.target.checked
    let { total } = this.state
    if (event.target.checked) {
      total = Number(total) + Number(arr[index].money)
    } else {
      total = Number(total) - Number(arr[index].money)
    }
    this.setState({
      showChaseList: arr,
      total: Number(total).toFixed(4)
    })
  }

  render() {
    let { chaseIssueTotal, startMultiple, bigMultiple, lowIncome, middleIssue, nextType, nextMultiple, winStop, total, activeTab, showChaseList, isLoading, checkedAll } = this.state
    let checkedArr = showChaseList.filter(t => {
      return t.checked
    })
    let topContent = <View style={{backgroundColor: '#cccede'}}>
      <List>
        <Flex justify="around">
          <Flex.Item>
            <InputItem labelNumber={5} value={chaseIssueTotal} type="number" onChange={v => {
              if (isInteger(Number(v))) {
                this.setState({
                  chaseIssueTotal: String(Number(v)),
                  showChaseList: [],
                  chaseList: [],
                  total: '0'
                })
              }
            }}>追号期数</InputItem>
          </Flex.Item>
          <Flex.Item>
            <InputItem labelNumber={5} value={startMultiple} type="number" onChange={v => {
              if (isInteger(Number(v))) {
                this.setState({
                  startMultiple: String(Number(v)),
                  showChaseList: [],
                  chaseList: [],
                  total: '0'
                })
              }
            }}>起始倍数</InputItem>
          </Flex.Item>
        </Flex>
        {
          activeTab === 'lilv' &&
          <Flex justify="around">
            <Flex.Item>
              <InputItem labelNumber={5} value={bigMultiple} type="number" onChange={v => {
                if (isInteger(Number(v))) {
                  this.setState({
                    bigMultiple: String(Number(v)),
                    showChaseList: [],
                    chaseList: [],
                    total: '0'
                  })
                }
              }}>最大倍投</InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem labelNumber={5} value={lowIncome} type="number" onChange={v => {
                if (isInteger(Number(v))) {
                  this.setState({
                    lowIncome: String(Number(v)),
                    showChaseList: [],
                    chaseList: [],
                    total: '0'
                  })
                }
              }}>最低收益率</InputItem>
            </Flex.Item>
          </Flex>
        }
        {
          activeTab === 'fanbei' &&
          <Flex justify="around">
            <Flex.Item>
              <InputItem
                value={middleIssue}
                type="number"
                labelNumber={2}
                onChange={v => {
                  if (isInteger(Number(v))) {
                    this.setState({
                      middleIssue: String(Number(v)),
                      showChaseList: [],
                      chaseList: [],
                      total: '0'
                    })
                  }
                }}
                extra={<Text>期</Text>}
              >隔</InputItem>
            </Flex.Item>
            <Flex.Item>
              <Flex justify="around">
                <Flex.Item alignItems="center">
                  <Button size="small" type={nextType==='add'?'primary':'ghost'} style={styleUtil({width: 30})} onPress={() => {
                    this.setState({
                      nextType: 'add',
                      showChaseList: [],
                      chaseList: [],
                      total: '0'
                    })
                  }}>+</Button>
                </Flex.Item>
                <Flex.Item alignItems="center">
                  <Button size="small" type={nextType==='cheng'?'primary':'ghost'} style={styleUtil({width: 30})} onPress={() => {
                    this.setState({
                      nextType: 'cheng',
                      showChaseList: [],
                      chaseList: [],
                      total: '0'
                    })
                  }}>x</Button>
                </Flex.Item>
              </Flex>
            </Flex.Item>
            <Flex.Item alignItems="center">
              <InputItem value={nextMultiple} type="number" onChange={v => {
                if (isInteger(Number(v))) {
                  this.setState({
                    nextMultiple: String(Number(v)),
                    showChaseList: [],
                    chaseList: [],
                    total: '0'
                  })
                }
              }} extra={<Text>倍</Text>}></InputItem>
            </Flex.Item>
          </Flex>
        }
        <Flex justify="around" style={styleUtil({paddingVertical: 6})}>
          <Flex.Item alignItems="center">
            <Checkbox checked={winStop} onChange={v => this.setState({
              winStop: v,
              showChaseList: [],
              chaseList: [],
              total: '0'
              })}>中奖后停止追号</Checkbox>
          </Flex.Item>
          <Flex.Item alignItems="center">
            <Button type="primary" size="small" onPress={this.beforeBuildOrder}>
              生成追号单
            </Button>
          </Flex.Item>
        </Flex>
        <Flex justify="around" style={styleUtil({paddingVertical: 6})}>
          <Flex.Item alignItems="center">
            <View><Text style={styleUtil({fontSize: 14, color: '#00bbcc'})}>期数：{checkedArr.length}</Text></View>
          </Flex.Item>
          <Flex.Item alignItems="center">
            <View><Text style={styleUtil({fontSize: 14, color: '#00bbcc'})}>总金额：{total}</Text></View>
          </Flex.Item>
        </Flex>
      </List>
    </View>
    let listContent = <View style={{flex: 1}}>
      <Flex style={styleUtil({height: 40, backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0'})}>
        <View style={{width: '9%'}}><Checkbox checked={checkedAll} onChange={event => this.checkAllChange(event)}></Checkbox></View>
        <Text style={styleUtil({width: '27%', textAlign: 'center', fontSize: 14, color: '#333'})}>期号</Text>
        <Text style={styleUtil({width: '12%', textAlign: 'center', fontSize: 14, color: '#333'})}>倍数</Text>
        <Text style={styleUtil({width: '22%', textAlign: 'center', fontSize: 14, color: '#333'})}>金额</Text>
        <Text style={styleUtil({width: '30%', textAlign: 'center', fontSize: 14, color: '#333'})}>截止日期</Text>
      </Flex>
      <ScrollView style={styleUtil({flex: 1})}>
        {
          showChaseList.map((item, index) => {
            return <Flex key={item.currentIssue + '_' + item.showTime + index} style={styleUtil({backgroundColor: '#fff', height: 35})}>
              <View style={{width: '9%'}}><Checkbox checked={item.checked} onChange={event => this.chaseItemChange(event, index)}></Checkbox></View>
              <Text style={styleUtil({width: '27%', textAlign: 'center', fontSize: 14, color: '#333'})}>{item.currentIssue}</Text>
              <Text style={styleUtil({width: '12%', textAlign: 'center', fontSize: 14, color: '#333'})}>{item.multiple}</Text>
              <Text style={styleUtil({width: '22%', textAlign: 'center', fontSize: 14, color: '#333'})}>{Number(item.money).toFixed(4)}</Text>
              <Text style={styleUtil({width: '30%', textAlign: 'center', fontSize: 14, color: '#333'})}>{item.showTime}</Text>
            </Flex>
          })
        }
      </ScrollView>
    </View>

    return (
      <View style={{flex: 1}}>
        <WhiteSpace size="sm" />
        <Tabs
          onChange={v => {
            this.setState({
              activeTab: v.value
            }, () => {
              this.beforeBuildOrder()
            })
          }}
          tabs={tabs}>
          <View style={{ backgroundColor: 'f0f0f0', flex: 1 }}>{topContent}{listContent}</View>
        </Tabs>
        <View style={styleUtil({height: 50, alignItems: 'center', backgroundColor: '#fff', justifyContent: 'center', borderTopWidth: 0.5, borderTopColor: '#00bbcc'})}>
          <Button disabled={showChaseList.length === 0 || checkedArr.length === 0} loading={isLoading} type="ghost" style={styleUtil({width: '50%', height: 40})} onPress={this.submitFunc}>
            <Text style={styleUtil({fontSize: 14})}>立即追号</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let { openIssue, navParams, Environment} = state.classic
  let { userBalanceInfoYE } = state.member
  let { loginInfo } = state.common
  return {
    openIssue,
    navParams,
    loginInfo,
    Environment,
    userBalanceInfoYE
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChaseScreen)

const styles = StyleSheet.create(stylesUtil({
  container: {

  },
  topInput: {
    fontSize: 14,
    color: '#333'
  }
}))
