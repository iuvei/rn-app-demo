import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  loadOpenIssue,
  pollingPrevOpen,
  queryLastIssueReward
} from '../api/lottery'

import { getLatelyOpen, setOpenIssue } from '../actions/classic'
import { AsetSoundType } from '../actions/common'

export default (Comp) => {
  class DownTimeHoc extends Component {
    constructor(props) {
      super(props)
      this.setLessTimes(0)
      this.state = {
        // 是不是外盘
        isOuter: 0,

        // 上一期开奖结果
        prevOpenResult: {
          openIssue: '',
          openList: []
        },

        downTime: {
          h1: 0,
          h2: 0,
          m1: 0,
          m2: 0,
          s1: 0,
          s2: 0
        },

        // 是否提示已截止
        isActivate: true
      }
    }

    componentWillMount() {
    }

    componentDidMount() {
      // 根据导航导航进来的数据获取当前的数据
      // 然后复制显示
      // 然后开始轮训计算
      // 然后开始触发开奖号码数据
      // 用户是否中奖，更新余额
      this.changeLot()
    }

    componentWillUnmount() {
      // SET_LATELY_OPEN
      this.setState = () => () => {
      }
    }

    setLessTimes = time => this.timedown = time

    changeLot = () => {
      let {activeLot} = this.props
      this._loadLatelyOpenHistory(activeLot)
      this._loadOpenIssue(activeLot)
      this._pollingPrevOpen(activeLot)
    }

    // 获取最近的开奖历史记录
    _loadLatelyOpenHistory({lotterCode}) {
      this.props._getLatelyOpen({lotterCode, limitSize: 50})
    }

    // 获取开奖期号
    _loadOpenIssue({lotterCode}) {
      loadOpenIssue({
        lotterCode,
        isOuter: this.state.isOuter
      }).then(res => {
        if (res.code === 0 && res.data) {
          this.space = 0
          this.spaceTotal = 0
          if (!res.data.currentIssue) {
            console.warn(`我要报警了: ${lotterCode}没返回当前期信息`)
          } else if (Object.keys(res.data).length) {
            res.data.latelyIssue = Number(res.data.currentIssue) - 1
            this.props._setOpenIssue(res.data)
            // currentIssue
            setTimeout(() => {
              this.setStopTime(res.data, Date.now())
            }, 20)
          } else {
            console.warn(`我要报警了: ${lotterCode}没返回开奖信息`)
          }
        } else {
          console.warn(`我要报警了:没${lotterCode}返回信息`, res)
        }
        // this.setStopTime({timedown: 10}, Date.now())
      })
    }

    // 计算倒计时
    setStopTime({timedown}, standTime) {
      clearTimeout(this.timeDown_Time)
      // let costStart = Date.now()
      this.setLessTimes(timedown)
      this.excutedTime = (new Date()).getTime()
      if (this.timedown === 10) {
        this.props.AsetSoundType({type: 'stopOrder'})
      }
      if (this.timedown >= 0) {
        let second = this.timedown % 60
        let midd = (this.timedown - second) / 60 || 0
        let hour = ~~(midd / 60) || 0
        let minute = midd - (hour * 60) || 0
        hour = hour >= 10 || hour < 0 ? hour : '0' + hour
        second = second >= 10 || second < 0 ? second : '0' + second
        minute = minute >= 10 || minute < 0 ? minute : '0' + minute
        this.setState({
          downTime: {
            h1: hour.toString()[0],
            h2: hour.toString()[1],
            m1: minute.toString()[0],
            m2: minute.toString()[1],
            s1: second.toString()[0],
            s2: second.toString()[1]
          }
        })
        if (this.timedown === 0) {
          // 截止提示音
          this.props.AsetSoundType({type: 'message'})
          // MessageTips({
          //   content: `<em style="font-weight:700;font-size:15px">
          //               温馨提示：${this.activeLot.lotterName}
          //               第 ${this.openIssue.currentIssue} 期 已截止，请注意投注期号！
          //             </em>`,
          //   type: 'warning',
          //   top: 300
          // })
          this.setState({
            prevOpenResult: {
              openList: ''
            }
          })
          setTimeout(() => {
            this._loadOpenIssue(this.props.activeLot)
            this._pollingPrevOpen(this.props.activeLot)
          }, 500)
          return
        }
        if (this.spaceTotal > 1000) {
          this.space = 0
          this.spaceTotal = 0
          this._loadOpenIssue(this.props.activeLot)
          return
        }
        // let cost = Date.now() - costStart
        this.timeDown_Time = setTimeout(() => {
          let n = (new Date()).getTime() - this.excutedTime
          this.space = n
          this.spaceTotal = n - 1000 + this.spaceTotal
          this.setStopTime({
            timedown: --timedown
          }, standTime)
        }, (this.space > 1000 && this.space < 2000) ? (2000 - this.space) : 1000) // - cost
      }
    }

    // 获取上一期的开奖号码接口
    _pollingPrevOpen({lotterCode}) {
      clearTimeout(this.queryPrevTime)
      clearTimeout(this.queryPrevHistory)
      pollingPrevOpen({lotterCode, isOuter: this.state.isOuter}).then(res => {
        if (res.code === 0) {
          if (!res.data.openCode) {
            // 上期开奖号码还未开出则播放开奖动画
            // this.playingOpeningAnimation()
            // this.rondomLoadTexts()
            this.setState({
              prevOpenResult: {
                openIssue: res.data.openIssue,
                openList: []
              }
            })
            let setTime = this.props.activeLot.lotterCode.indexOf('ffc') > -1 ? 2000 : 10000
            this.queryPrevTime = setTimeout(() => {
              this._pollingPrevOpen({lotterCode})
            }, setTime || 10000)
          } else {
            // this.stopPlayingAnimation()
            res.data.openList = res.data.openCode.split(',')
            // console.warn(res.data)
            this.setState({
              prevOpenResult: res.data
            })
            // this.rondomLoadTexts(true)
            this.queryPrevHistory = setTimeout(() => {
              // 查询最近开奖记录
              this._loadLatelyOpenHistory(this.props.activeLot)
              // 查询用户上一期是否有中奖
              this._queryLastIssueReward(this.props.activeLot)
              // 查询开奖期号 中奖之后不需要查询
              // this._loadOpenIssue(this.activeLot)
            }, 1500)
          }
        } else if (res.code === -60001) {
          // 获取所有彩种状态
          // this.AgetLottery()
          // 提示用户
          // NoticeTips({
          //   title: '温馨提示',
          //   content: res.message || '网络异常，数据加载中...',
          //   duration: 5
          // })
          // 显示Loading
          // this.pageLoading = true
          // this.$store.commit('CHANGE_PAGELOADING', true)
          // 清空投注数据
          // this.commitBuyCardAfter()
          // 清空购物车数据
          // this.buyCardData = []
          // 定时跳转
          // this.timeOutChangePage = setTimeout(() => {
          //   this.$router.push({name: 'Home'})
          // }, 3000)
        }
      })
    }

    // 获取上一期用户是否中奖
    _queryLastIssueReward({lotterCode}) {
      // userId
      let {prevOpenResult} = this.state
      let {userId} = this.props
      queryLastIssueReward({
        userId,
        lotterCode,
        castIssue: prevOpenResult.openIssue
      }).then(res => {
        if (res.code === 0) {
          let {bonus, castAmount, lotterName, orderIssue, profitLoss} = res.data
          // 保存开奖时间
          // this.AsetWinTime(new Date().getTime())
          if (!bonus) return
          this.props.AsetSoundType({type: 'income'})
          // NoticeTips({
          //   type: 'success',
          //   title: '中奖通知',
          //   render: h => {
          //     return h('div', {
          //       style: {
          //         color: '#000',
          //         fontWeight: 550,
          //         fontSize: '14px',
          //         lineHeight: '20px'
          //       }
          //     }, [
          //       h('div', `投注金额：${castAmount}`),
          //       h('div', `彩种：${lotterName}`),
          //       h('div', `盈亏：${Number(profitLoss).toFixed(4)}`),
          //       h('div', `期号：${orderIssue}`),
          //       h('div', `中奖金额：${bonus || 0}`)
          //     ])
          //   }
          // })
          // 刷新用户余额
          // this.AgetUserBalance()
        }
      })
    }

    initTime = () => {
      console.log('来自在这里执行一堆的方法')
    }

    render() {
      return (
        <Comp
          {...this.props}
          {...this.state}
          initTime={this.initTime}
          ref={ref => this.instance = ref}
        />
      )
    }
  }

  const mapStateToProps = (state, props) => {
    let {
      common: {userId},
      classic: {openIssue},
      classic: {navParams}
    } = state
    return {userId, openIssue, navParams}
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      _getLatelyOpen: (params) => dispatch(getLatelyOpen(params)),
      _setOpenIssue: params => dispatch(setOpenIssue(params)),
      AsetSoundType: (data) => dispatch(AsetSoundType(data))
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(DownTimeHoc)
}
