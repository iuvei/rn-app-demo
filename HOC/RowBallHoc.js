import React, { Component } from 'react'
import _ from 'lodash'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import norLot from '../data/nor-lot'
import { ruleBuilder, handlerBall } from '../data/nor-lot/basic-info'
import { filterCurBall } from '../data/nor-lot/basic-info'
import utilLot from '../filiter/classic'
import { toBuyLottery } from '../api/lottery'
import { Toast } from '@ant-design/react-native'
import { AsetAllBalance } from '../actions/member'
// import { modeInfo } from '../data/options'
// import { navParams } from '../actions/classic'

export default (Comp) => {
  class RowBallHoc extends Component {
    constructor(props) {
      super(props)
      this.state = {
        tools: [
          {code: 'full', name: '全'},
          {code: 'big', name: '大'},
          {code: 'small', name: '小'},
          {code: 'single', name: '单'},
          {code: 'double', name: '双'},
          {code: 'empty', name: '清'}
        ],

        // 当前彩种的视图数据
        codeMap: {},
        viewData: {},
        playTips: false,

        // viewData生产的视图数据及相关信息
        activeViewData: {
          layout: []
        },

        // 当前选中的赔率
        activeGamesPlay: {},

        // 购买的情景
        buyInfo: {
          num: 0,
          content: '',
          multiple: 1,
          model: 1,
          rebateMode: 0,
          total: '0.000'
        },

        // 已选中的号码
        dataSel: [],
        buyCardData: [],

        // 已选中的压缩号码
        LazmDataSel: '',
        BetContent: '',

        userRebate: 0,

        curMaxMode: 1700,
        lotterMinMode: 1700,

        // testMode: 1802
        isKlcYxyLot: false
      }
    }

    componentDidMount() {
      // setInterval(() => {
      //   this.setState({
      //     testMode: Number(this.state.testMode + 2)
      //   }, () => {
      //     console.log(this.state.testMode)
      //   })
      // }, 1000)
      if (Object.keys(this.props.rebateInfo).length) {
        this.setRebate(this.props.rebateInfo)
      }
      this.checkKlcXycLot()
    }

    checkKlcXycLot = () => {
      this.setState({
        isKlcYxyLot: ['lo6', 'lo7'].includes(this.props.navParams.lotType)
      })
    }

    componentWillReceiveProps(np) {
      let {activePlay, gamesPlayStore, navParams, rebateInfo} = this.props
      // 改变该种时，重新渲染视图
      if (!_.isEqual(navParams, np.navParams) && Object.keys(np.navParams).length) {
        this.initBetView(np.navParams)
      }

      // 改变玩法时候
      if (!_.isEqual(activePlay, np.activePlay) && Object.keys(np.activePlay).length) {
        this.updateGameRate(np)
      }

      // 返回rule赔率数据时候
      if (!_.isEqual(gamesPlayStore, np.gamesPlayStore) && np.gamesPlayStore.length) {
        this.updateGameRate(np)
      }

      if (!_.isEqual(rebateInfo, np.rebateInfo) && Object.keys(np.rebateInfo).length) {
        this.setRebate(np.rebateInfo)
      }
    }

    initBetView = ({lotType}) => {
      let {viewData, codeMap} = JSON.parse(JSON.stringify(norLot[lotType]))
      this.setState({viewData, codeMap})
    }

    setRebate = ({userRebateVO}) => {
      let selfRebate = userRebateVO.find(list => list.rebateType === 0) || {}
      this.setState({userRebate: selfRebate.userRebate * 20 + 1700 || 0})
    }

    updateGameRate = ({activePlay}) => {
      let {viewData, codeMap} = this.state
      this.setState({
          activeViewData: ruleBuilder({
            playCode: activePlay.code,
            viewData,
            codeMap
          }),
          buyInfo: {
            ...this.state.buyInfo,
            num: 0,
            total: '0.000'
          }
        }, () => this.changePlayRate()
      )
    }

    // 切换玩法类型
    // initActivePlay = (val) => {
    //   let {viewData, codeMap} = this.state
    // 重新build 布局数据
    // 这里或应该增加防御控制 预防非法玩法报错
    // 切换对应的赔率信息
    // this.setState({
    //   activeViewData: ruleBuilder({playCode: val.code, viewData, codeMap})
    // })
    // this.changePlayRate()
    // }

    getZhuShu = () => {
      let activeViewData = Object.assign({}, this.state.activeViewData)
      // let activeLot = Object.assign({}, this.props.curLotInfo)
      // let activeRouter = Object.assign({}, this.props.activeRouter)
      let {lotType} = this.props.navParams
      let {code} = activeViewData
      // LazmDataSel
      let num = 0
      filterCurBall({activeViewData, lotType})
        .then(({dataSel, LazmDataSel, BetContent}) => {
            num = utilLot[lotType].inputNumbers(code, dataSel)
            LazmDataSel = utilLot[lotType].inputFormat(code, dataSel)
            this.setBuyInfo({num})
            this.setState({dataSel, LazmDataSel, BetContent})
          }
        )
    }

    setBuyInfo = (info) => {
      this.setState({
        buyInfo: Object.assign({}, this.state.buyInfo, {...info})
      }, () => {
        this.getTotal()
      })
    }

    // 切换玩法时，更新赔率
    changePlayRate = () => {
      let {playOrgin} = this.state.activeViewData
      let {rebateMode} = this.state.buyInfo
      let {gamesPlayStore} = this.props
      let gamesPlay = gamesPlayStore.find(item => item.ruleCode === playOrgin) || {}
      let playLen = Object.keys(gamesPlay).length
      this.setState({
        activeGamesPlay: playLen ? gamesPlay : {}
      }, () => {
        this.setMaxMode()
      })
      if (playLen) {
        if (rebateMode > gamesPlay.lotterMinMode &&
          rebateMode < gamesPlay.maxRuleMode) {
        } else {
          // this.buyInfo.rebateMode = item.lotterMinMode
          this.setState({
            buyInfo: {
              ...this.state.buyInfo,
              rebateMode: gamesPlay.lotterMinMode
            }
          })
        }
      }
    }

    setMaxMode = () => {
      let {maxRuleMode, lotterMaxMode, lotterMinMode} = this.state.activeGamesPlay
      let arr = [this.state.userRebate, maxRuleMode, lotterMaxMode]
      let tmpMode = arr.sort((a, b) => a - b)[0] || 1700
      if (lotterMinMode < tmpMode) {
        this.setState({
          buyInfo: Object.assign({}, this.state.buyInfo, {
            rebateMode: tmpMode
          })
        })
      }
      this.setState({
        curMaxMode: tmpMode,
        lotterMinMode: lotterMinMode
      })
    }

    getTotal = () => {
      let {buyInfo, activeGamesPlay} = this.state
      let {singlePrice} = activeGamesPlay
      let {num, multiple, model} = buyInfo
      let total = (num * (singlePrice || 1) * multiple * model).toFixed(3)
      this.setState({
        buyInfo: Object.assign({}, buyInfo, {total})
      })
    }

    toHandData = ({layItem, numItem}, fn) => {
      let {layout} = JSON.parse(JSON.stringify(this.state.activeViewData))
      layout.map(lay =>
        lay.title === layItem.title ?
          lay.balls.map(item => numItem.ball === item.ball ? fn(item) : item) :
          '')
      this.setState({
        activeViewData: {
          ...this.state.activeViewData,
          layout: layout
        }
      }, () => {
        this.getZhuShu()
      })
    }

    // 点击球
    clickBall = (numItem, layItem, layout, index) => {
      if (layItem.chooseOne) {
        layItem.balls.forEach(b => {
          b.choose = false
        })
      }

      this.toHandData({layItem, numItem}, (item) => {
        item.choose = !item.choose
        return item
      })
      // 是否互斥
      if (layItem.mutuallyExclusive) {
        layout.forEach((l, lidx) => {
          if (lidx !== index) {
            l.balls.forEach(b => {
              if (b.ball === numItem.ball && b.choose === true) {
                clearTimeout(this.curBallTime)
                this.curBallTime = setTimeout(() => {
                  // message.warn('胆码拖码数字不能相同')
                  Alert.alert(
                    '温馨提示',
                    '胆码拖码数字不能相同',
                    [
                      // {text: '', onPress: () => console.log('Cancel Pressed')},
                      {text: '确定', onPress: () => console.log('OK Pressed')}
                    ],
                    {cancelable: false}
                  )
                }, 100)
                b.choose = false
                this.setState(prevState => ({
                  activeViewData: {...prevState.activeViewData, layout}
                }))
              }
            })
          }
        })
      }

      // // 如果最大数
      // if (list.Maxchoose) {
      //   let maxNums = 0
      //   list.balls.filter((l) => {
      //     if (l.choose) {
      //       maxNums++
      //     }
      //   })
      //   if (maxNums > list.Maxchoose) {
      //     NoticeTips({
      //       type: 'error',
      //       content: `${list.title}总数不能大于等于${list.Maxchoose}`
      //     })
      //   }
      // }
      // // 如果是选择所有
      // if (list.chooseAll) {
      //   list.balls.map((b) => {
      //     b.choose = item.choose
      //   })
      // }
    }

    // 工具选中
    toolsCur = (tools, item) => {
      // 返回当前数据给到他，然后处理完拿回来给我
      let layItem = Object.assign({}, item)
      // 处理原来的item
      handlerBall[tools.code]({ball: layItem.balls})
      let {layout} = Object.assign({}, this.state.activeViewData)
      let newLayout = layout.map(lay => lay.title === layItem.title ? layItem : lay)
      this.setState({
        activeViewData: {
          ...this.state.activeViewData,
          layout: newLayout
        }
      }, () => {
        // this.getZhuShu()
      })
    }

    // price

    // onChangeStep = multiple => this.setBuyInfo({multiple})
    // 添加购物车
    addBuyCard = (toBuy, callBack) => {
      let {navParams, navParams: {lotType}, openIssue} = this.props
      let {activeGamesPlay} = this.state
      let gamesPlayLen = Object.keys(activeGamesPlay).length
      if (!Object.keys(navParams).length || activeGamesPlay.isOuter) {
        Toast.fail('该彩种已关闭')
        return false
      }
      if (!gamesPlayLen || activeGamesPlay.status === 2) {
        Toast.fail('该玩法未开启投注')
        return false
      }
      if (activeGamesPlay.status === 0) {
        Toast.info('该玩法已禁用')
        return false
      }
      // 保存添加到购物车时间
      // this.AsetAddToCartTime((new Date()).getTime())
      // if (this.pwdRaram.bandUserPassword) return
      let {
        dataSel, activeViewData, buyInfo, bonusPrize
      } = this.state
      let {playOrgin, bit, checkbox} = activeViewData
      let {num, multiple, total, model, rebateMode} = buyInfo
      let {ruleName, title, singlePrice} = activeGamesPlay
      if (num === 0) {
        Toast.info('您还没有选择号码或所选号码不全')
        return false
      }
      // 稍后补充 动画
      // set type
      let content = utilLot[lotType].inputFormat(activeViewData.code, dataSel)
      // 时时彩 组合单式玩法计算
      if (['lo1'].includes(lotType)) {
        content = utilLot[lotType].inputFormat(activeViewData.code, dataSel)
        let repaceString = content.split(']')
        if (repaceString.length !== 1) {
          let bitArr = []
          bit.filter(checkItem => {
            if (checkbox.includes(checkItem.position)) {
              bitArr.push(checkItem.name)
            } else {
              bitArr.push('')
            }
          })
          let posi = '[' + bitArr.toString() + ']'
          content = (posi + repaceString[1]).toString()
          content = content.replace(/ ,/g, ',')
        }
      }
      // 生成投注栏数据
      let {currentIssue} = openIssue
      let orderlist = {
        // 玩法规则
        activeGamesPlay,
        bonusPrize,
        castAmount: total,
        castCodes: content,
        model,
        num,
        castMultiple: multiple,
        orderIssue: currentIssue,
        rebateMode,
        castNumber: num,
        ruleCode: playOrgin,
        ruleName: ruleName || title,
        singlePrice: singlePrice
      }
      // let methodInfo = this.gameMethod[playOrgin]
      // this.isKlcXycLot && _.isArray(content)
      if (false) {
        // content.filter(d => {
        //   let xyclist = Object.assign({}, orderlist, {
        //     // 投注号码 dan shuang
        //     castCodes: d,
        //     castNumber: 1,
        //     num: 1,
        //     castAmount: (total / num).toFixed(4)
        //   })
        //   this.buyCardData.push(xyclist)
        //   this.commitBuyCardAfter()
        // })
      } else {
        let {maxRecord} = activeGamesPlay
        if (maxRecord >= orderlist.castNumber || maxRecord === -1) {
          // localStorage.setItem('orderlist', JSON.stringify(orderlist))
          this.setState({
            buyCardData: [].concat(this.state.buyCardData, orderlist)
          }, () => {
            if (toBuy) this.toBuy()
            if (callBack) callBack()
            this.clearAllData()
          })
          // this.commitBuyCardAfter()
          // console.log(orderlist)
        } else {
          // NoticeTips({
          //   content:  ！`
          // })
          Toast.info(`注数不能超过${this.state.activeGamesPlay.maxRecord}`)
          return
        }
      }
      // let that = this

      // if (num <= methodInfo.oooNums) {
      //   ModalTips({
      //     title: '温馨提示',
      //     type: 'confirm',
      //     content: `<div style="font-size: 14px">
      //                 <div>您所投注内容属于单挑玩法，最高奖金为 ${methodInfo.oooBonus}元，</div>
      //               <div>确认继续投注？</div>
      //               </div>`,
      //     onOk() {
      //       that.buyCardData.push(row)
      //       that.commitBuyCardAfter()
      //       console.warn(toBuy)
      //       if (toBuy) {
      //         that.toBuy()
      //       }
      //     }
      //   })
      // } else {
      // this.buyCardData.push(row)
      //   this.commitBuyCardAfter()
      // }
      // if (toBuy)
      // this.toBuy()
    }

    toBuy = () => {
      // 购买
      let detailsList = []
      let {currentIssue} = this.props.openIssue
      let [reqAmount] = [0]
      this.state.buyCardData.filter((list) => {
        let {castAmount, castCodes, castMode, model, castMultiple, ruleCode, rebateMode} = list
        reqAmount += parseFloat(Number(castAmount).toFixed(4))
        // resNum += castNumber
        if (model === 1) castMode = 0
        if (model === 0.1) castMode = 1
        if (model === 0.01) castMode = 2
        if (model === 0.001) castMode = 3
        detailsList.push({
          castAmount: parseFloat(Number(castAmount).toFixed(4)),
          castCodes,
          castMode,
          castMultiple,
          orderIssue: currentIssue,
          // this.isKlcXycLot ? '' : rebateMode
          rebateMode: rebateMode,
          ruleCode
        })
      })
      // currency
      let {userId, navParams: {lotterCode, isOuter}} = this.props
      let limitRedId
      // if (activeLot.lotRoute === 'lo7') {
      //   limitRedId = 1
      // }
      // currency.currencyCode
      // 这里要改成多币种的
      let rep = {
        currencyCode: 'rmb',
        amount: parseFloat(Number(reqAmount).toFixed(4)),
        // castNumber: resNum,
        detailsList: detailsList,
        isOuter,
        [limitRedId]: limitRedId,
        lotterCode,
        orderType: 0,
        userId
      }
      // console.log(rep)
      // let repZip = ''
      // if (!this.isTest) {
      //   repZip = toCrypto(rep)
      // }
      // AESKey
      // repZip ||
      toBuyLottery(rep).then(res => {
        if (res.code === 0) {
          Toast.success('购买成功')
          this.clearAllData()
          // 刷新余额
          this.props.updateBalance()
        } else {
          Toast.success(res.message)
        }
        this.setState({
          buyCardData: []
        })
      })
    }

    // myRuleMode = () => {
    //   return this.maxRebate * 20 + 1700
    // }
    //
    // maxRuleMode() {
    //   return this.activeGamesPlay.maxRuleMode
    // }
    //
    // minRuleMode() {
    //   return this.activeGamesPlay.minRuleMode
    // }
    //
    // lotterMinMode() {
    //   return this.activeGamesPlay.lotterMinMode
    // }
    //
    // lotterMaxMode() {
    //   return this.activeGamesPlay.lotterMinMode
    // }

    // 清除投注区数据
    clearAllData = () => {
      let {layout, textarea} = Object.assign({}, this.state.activeViewData)
      if (layout) {
        layout = layout.map(items => {
          items.balls.forEach(item => {
            item.choose = false
          })
          return items
        })
        this.setState({
          activeViewData: {
            ...this.state.activeViewData,
            layout
          }
        }, () => this.getZhuShu())
      }
      if (textarea) {
        this.setState({
          activeViewData: {
            ...this.state.activeViewData,
            textarea: ''
          }
        }, () => this.getZhuShu())
      }
    }

    handleText = (value) => {
      this.setState({
        activeViewData: {
          ...this.state.activeViewData,
          textarea: value
        }
      }, () => this.getZhuShu())
    }

    render() {
      return (
        <Comp
          clickBall={this.clickBall}
          toolsCur={this.toolsCur}
          setBuyInfo={this.setBuyInfo}
          addBuyCard={this.addBuyCard}
          handleText={this.handleText}
          {...this.state}
          {...this.props}
        />
      )
    }
  }

  const mapStateToProps = (state) => {
    let {userId, balanceInfo, rebateInfo} = state.common
    return ({
      ...state.classic,
      userId,
      balanceInfo,
      rebateInfo
    })
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      updateBalance: data => dispatch(AsetAllBalance(data))
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(RowBallHoc)
}
