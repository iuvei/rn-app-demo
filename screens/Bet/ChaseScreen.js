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
import { getChaseTime, toBuyLottery } from '../../api/lottery'
import { toCrypto } from '../../plugin/crypto'

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
    this.state = {
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
        Toast.fail(res.message)
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
        Toast.info('您设置的参数无法达到盈利，请重新选择！')
        return result
      }
      if (thisMutiple === 0) {
        thisMutiple = sMultiple
      }
      if (thisMutiple > maxMultiple) {
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

      hisl = hisl + buyTotal * thisMutiple
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
        Toast.info('利润率追号不支持混投，请确保您的投注都为同一玩法类型！')
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
          showChaseList.push({
            currentIssue: val.currentIssue,
            multiple: multiple,
            money: total * multiple,
            showTime: String(val.nextTime).slice(5),
            nextTime: val.nextTime
          })
          tmptotal += total * multiple
        }
      } else {
        Toast.info('没有符合要求的方案，请调整参数重新计算！')
      }
    }
    if (activeTab === 'tongbei') {
      for (let i = 0; i < chaseIssueTotal; i++) {
        if (i > chaseList.length - 1) {
          break
        }
        let val = chaseList[i]
        showChaseList.push({
          currentIssue: val.currentIssue,
          multiple: startMultiple,
          money: total * startMultiple,
          showTime: String(val.nextTime).slice(5),
          nextTime: val.nextTime
        })
        tmptotal += total * startMultiple
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
          return
        }
        showChaseList.push({
          currentIssue: val.currentIssue,
          multiple: multiple,
          money: total * multiple,
          showTime: String(val.nextTime).slice(5),
          nextTime: val.nextTime
        })
        tmptotal += total * multiple
      }
    }
    console.log('showchaselist', showChaseList)
    this.setState({
      showChaseList: showChaseList,
      total: tmptotal
    })
    // 点击生成订单选中全部
    // this.selectAllTochase = true
  }

  submitFunc = () => {
    let {winStop, showChaseList, orderList} = this.state
    let planList = []
    let [reqAmount] = [0, 0]
    showChaseList.filter((sel, selIdx) => {
      let {multiple, nextTime, currentIssue} = sel
      orderList.filter(item => {
        let {castCodes, ruleCode, rebateMode, model, singlePrice} = item
        // let amount = (parseFloat(item.castAmount) / parseFloat(item.castMultiple)) * multiple
        let amount = (parseFloat(singlePrice)) * multiple
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
    if (!this.props.isTest) {
      repZip = toCrypto(rep)
    }
    this.setState({
      isLoading: true
    })
    toBuyLottery(repZip || rep).then((res) => {
      this.setState({
        isLoading: false,
        showChaseList: [],
        chaseList: [],
        total: '0'
      })
      if (res.code === 0) {
        Toast.success('追号成功')
      } else {
        Toast.fail(res.message || '追号失败')
      }
    }).catch(() => {
      this.setState({
        isLoading: false,
        showChaseList: [],
        chaseList: [],
        total: '0'
      })
      Toast.fail('网络异常，请稍后重试')
    })
  }

  render() {
    let { chaseIssueTotal, startMultiple, bigMultiple, lowIncome, middleIssue, nextType, nextMultiple, winStop, total, activeTab, showChaseList, isLoading } = this.state
    let topContent = <View style={{backgroundColor: '#cccede'}}>
      <List>
        <Flex justify="around">
          <Flex.Item>
            <InputItem labelNumber={5} value={chaseIssueTotal} onChange={v => {
              this.setState({chaseIssueTotal: v})
            }}>追号期数</InputItem>
          </Flex.Item>
          <Flex.Item>
            <InputItem labelNumber={5} value={startMultiple} onChange={v => {
              this.setState({startMultiple: v})
            }}>起始倍数</InputItem>
          </Flex.Item>
        </Flex>
        {
          activeTab === 'lilv' &&
          <Flex justify="around">
            <Flex.Item>
              <InputItem labelNumber={5} value={bigMultiple} onChange={v => {
                this.setState({bigMultiple: v})
              }}>最大倍投</InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem labelNumber={5} value={lowIncome} onChange={v => {
                this.setState({lowIncome: v})
              }}>最大收益率</InputItem>
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
                  this.setState({middleIssue: v})
                }}
                extra={<Text>期</Text>}
              >隔</InputItem>
            </Flex.Item>
            <Flex.Item>
              <Flex justify="around">
                <Flex.Item alignItems="center">
                  <Button size="small" type={nextType==='add'?'primary':'ghost'} style={{width: 30}} onPress={() => {
                    this.setState({nextType: 'add'})
                  }}>+</Button>
                </Flex.Item>
                <Flex.Item alignItems="center">
                  <Button size="small" type={nextType==='cheng'?'primary':'ghost'} style={{width: 30}} onPress={() => {
                    this.setState({nextType: 'cheng'})
                  }}>x</Button>
                </Flex.Item>
              </Flex>
            </Flex.Item>
            <Flex.Item alignItems="center">
              <InputItem value={nextMultiple} onChange={v => {
                this.setState({nextMultiple: v})
              }} extra={<Text>倍</Text>}></InputItem>
            </Flex.Item>
          </Flex>
        }
        <Flex justify="around" style={{paddingVertical: 6}}>
          <Flex.Item alignItems="center">
            <Checkbox checked={winStop} onChange={v => this.setState({winStop: v})}>中奖后停止追号</Checkbox>
          </Flex.Item>
          <Flex.Item alignItems="center">
            <Button type="primary" size="small" onPress={this.beforeBuildOrder}>
              生成追号单
            </Button>
          </Flex.Item>
        </Flex>
        <Flex justify="around" style={{paddingVertical: 6}}>
          <Flex.Item alignItems="center">
            <View><Text style={{fontSize: 14, color: '#198ae7'}}>期数：{showChaseList.length}</Text></View>
          </Flex.Item>
          <Flex.Item alignItems="center">
            <View><Text style={{fontSize: 14, color: '#198ae7'}}>总金额：{total}</Text></View>
          </Flex.Item>
        </Flex>
      </List>
    </View>
    let listContent = <View>
      <Flex style={{height: 40, backgroundColor: '#198ae7'}}>
        <Text style={{width: '30%', textAlign: 'center', fontSize: 14, color: '#fff'}}>期号</Text>
        <Text style={{width: '15%', textAlign: 'center', fontSize: 14, color: '#fff'}}>倍数</Text>
        <Text style={{width: '25%', textAlign: 'center', fontSize: 14, color: '#fff'}}>金额</Text>
        <Text style={{width: '30%', textAlign: 'center', fontSize: 14, color: '#fff'}}>截至时间</Text>
      </Flex>
      <View style={{paddingVertical: 5}}>
        {
          showChaseList.map(item => {
            return <Flex key={item.currentIssue + '_' + item.showTime} style={{backgroundColor: '#fff', height: 35}}>
              <Text style={{width: '30%', textAlign: 'center', fontSize: 14, color: '#198ae7'}}>{item.currentIssue}</Text>
              <Text style={{width: '15%', textAlign: 'center', fontSize: 14, color: '#198ae7'}}>{item.multiple}</Text>
              <Text style={{width: '25%', textAlign: 'center', fontSize: 14, color: '#198ae7'}}>{item.money}</Text>
              <Text style={{width: '30%', textAlign: 'center', fontSize: 14, color: '#198ae7'}}>{item.showTime}</Text>
            </Flex>
          })
        }
      </View>
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
          <ScrollView style={{ backgroundColor: 'f0f0f0', flex: 1 }}>{topContent}{listContent}</ScrollView>
        </Tabs>
        <View style={{height: 50, alignItems: 'center', backgroundColor: '#fff', justifyContent: 'center', borderTopWidth: 0.5, borderTopColor: '#198ae7'}}>
          <Button loading={isLoading} type="ghost" style={{width: '50%', height: 40}} onPress={this.submitFunc}>
            <Text style={{fontSize: 14}}>立即追号</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let { openIssue, navParams } = state.classic
  let { loginInfo } = state.common
  return {
    openIssue,
    navParams,
    loginInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChaseScreen)

const styles = StyleSheet.create({
  container: {

  },
  topInput: {
    fontSize: 14,
    color: '#333'
  }
})
