import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import norLot from '../data/nor-lot'
import { ruleBuilder, handlerBall } from '../data/nor-lot/basic-info'
import { filterCurBall } from '../data/nor-lot/basic-info'
import utilLot from '../filiter/classic'

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
        // 已选中的压缩号码
        LazmDataSel: '',
        BetContent: ''

      }
    }

    componentWillReceiveProps(np) {
      let {activePlay, gamesPlayStore} = this.props
      // 改变玩法时候
      if (!_.isEqual(activePlay !== np.activePlay)) {
        this.updateGameRate(np)
      }

      // 数据有变更时
      if (!_.isEqual(gamesPlayStore !== np.gamesPlayStore)) {
        this.updateGameRate(np)
      }

    }

    componentDidMount() {
      this.initBetView()
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

    initBetView = () => {
      let {navParams} = this.props
      if (Object.keys(navParams).length > 0) {
        let {realCategory: cg} = navParams
        let {viewData, codeMap} = JSON.parse(JSON.stringify(norLot[cg]))
        this.setState({viewData, codeMap})
      } else {
        setTimeout(() => this.initBetView(), 200)
      }
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
            console.log(num, LazmDataSel)
            this.setState({dataSel, LazmDataSel, BetContent})
          }
        )
    }

    setBuyInfo = (info) => {
      this.setState({
        buyInfo: Object.assign({}, this.state.buyInfo, {...info})
      }, () => {
        // this.getTotal()
      })
    }

    // 切换玩法时，更新赔率
    changePlayRate = () => {
      let {playOrgin} = this.state.activeViewData
      let {gamesPlayStore} = this.props
      let gamesPlay = gamesPlayStore.find(item => item.ruleCode === playOrgin) || {}
      this.setState({
        activeGamesPlay: Object.keys(gamesPlay).length ? gamesPlay : {}
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
                  console.log('胆码拖码数字不能相同')
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
        this.getZhuShu()
      })
    }

    render() {
      let {clickBall, toolsCur} = this
      return (
        <Comp
          clickBall={clickBall}
          toolsCur={toolsCur}
          {...this.state}
          {...this.props}
        />
      )
    }
  }

  const mapStateToProps = (state) => {
    return ({
      ...state.classic
    })
  }

  return connect(mapStateToProps)(RowBallHoc)
}
