import React from 'react'
import {
  View, Text,
  StyleSheet, Image
} from 'react-native'
import {
  Tabs, Card, WhiteSpace,
  Button, WingBlank
} from '@ant-design/react-native'
import { connect } from 'react-redux'
import norLot from '../../data/nor-lot'
import { ruleBuilder } from '../../data/nor-lot/basic-info'
import { setActivePlay } from '../../actions/classic'

class PlayNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      playTabs: [
        {code: 'lo1_5x_fs', name: '五星复式'},
        {code: 'lo1_5x_ds', name: '五星单式'}
      ],

      localData: {
        ssc: [
          {code: 'lo1_5x_fs', name: '五星复式'},
          {code: 'lo1_5x_ds', name: '五星单式'},
          {code: 'lo1_5x_zh', name: '五星组合'}
        ]
      },

      // 当前彩种的视图数据
      codeMap: {},
      viewData: {},
      playTips: false,
      // viewData生产的视图数据及相关信息
      activeViewData: {},

      // 五星+其子nav 和 选中的
      navList: [],
      activeNavList: {},

      // 选中的玩法
      activePlay: {},

      // 获取当前的彩种赔率数据
      gamesPlayStore: [],
      activeGamesPlay: {}
    }
  }

  componentDidMount() {
    setTimeout(() => {
      let data = [
        {code: 'lo1_5x_zh', name: '五星组合'}
      ]
      this.setState({
        playTabs: [].concat(this.state.playTabs, data)
      })
    }, 3000)
    this.InitBetView()
  }

  InitBetView = (item) => {
    this.props.setActivePlay(item || {code: 'lo1_5x_fs', name: '五星复式'})
    // let {navParams: {realCategory}} = this.props
    // let {codeMap, viewData} = JSON.parse(JSON.stringify(norLot[realCategory]))
    // 知道某种玩法，然后渲染数据
    // this.setState({codeMap, viewData}, () =>
    //   this.activePlay(this.state.localData[realCategory][0])
    // )
  }

  // 切换玩法类型
  activePlay = (val) => {
    let {viewData, codeMap} = this.state
    // 重新build 布局数据
    // 这里或应该增加防御控制 预防非法玩法报错
    // 切换对应的赔率信息
    this.setState({
      activeViewData: ruleBuilder({playCode: val.code, viewData, codeMap})
    })
    // this.changePlayRate(val)
  }

  // let {navBar, viewData, codeMap} =
  // JSON.parse(JSON.stringify(norLot[lotRoute]))

  // 根据进入的彩种类型渲染投注视图
  // 根据获取到的彩种玩法 过滤关闭彩种
  // 当发生冲突时候，自动切换
  // 允许设置默认玩法
  render() {
    let {playTabs} = this.state
    let {activePlay} = this.props
    let {InitBetView} = this
    return (
      <View style={styles.playNav}>
        <Tabs
          style={{height: 10, padding: 0, margin: 0}}
          tabs={playTabs}
          initialPage={0}
          tabBarPosition="top"
          onTabClick={(tab) => InitBetView(tab)}
          tabBarUnderlineStyle={{height: 0}}
          renderTab={(tab, index) => (
            <Button
              style={{padding: 0, margin: 0}}
              size="small"
              type={tab.code === activePlay.code ? 'primary' : 'ghost'}
              onPress={() => InitBetView(tab)}>
              {tab.name}
            </Button>
          )}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let {navParams, activePlay} = state.classic
  return ({
    navParams,
    activePlay
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActivePlay: params => dispatch(setActivePlay(params))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayNav)

const styles = StyleSheet.create({
  playNav: {
    height: 50
  }
})
