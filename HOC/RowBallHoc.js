import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import norLot from '../data/nor-lot'
import { ruleBuilder } from '../data/nor-lot/basic-info'

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
        }
      }
    }

    componentWillReceiveProps(np) {
      let {activePlay, gamesPlayStore} = this.props

      if (!_.isEqual(activePlay !== np.activePlay)) {
        this.updateGameRate(np)
      }

      if (!_.isEqual(gamesPlayStore !== np.gamesPlayStore)) {
        this.updateGameRate(np)
      }
    }

    componentDidMount() {
      this.initBetView()
    }

    updateGameRate = ({activePlay, gamesPlayStore}) => {
      if (Object.keys(gamesPlayStore).length &&
        Object.keys(activePlay).length) {
        let {viewData, codeMap} = this.state
        this.setState({
          activeViewData: ruleBuilder({
            playCode: activePlay.code,
            viewData,
            codeMap
          })
        })
      }
    }

    initBetView = () => {
      let {navParams} = this.props
      if (Object.keys(navParams).length > 0) {
        let {realCategory: cg, lotterCode} = navParams
        let {viewData, codeMap} = JSON.parse(JSON.stringify(norLot[cg]))
        this.setState({viewData, codeMap})
      } else {
        setTimeout(() => this.initBetView(), 200)
      }
    }

    // 切换玩法类型
    initActivePlay = (val) => {
      let {viewData, codeMap} = this.state
      // 重新build 布局数据
      // 这里或应该增加防御控制 预防非法玩法报错
      // 切换对应的赔率信息
      this.setState({
        activeViewData: ruleBuilder({playCode: val.code, viewData, codeMap})
      })
      // this.changePlayRate(val)
    }

    // 更新视图

    render() {
      return (
        <Comp
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
