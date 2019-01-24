import React from 'react'
import {
  View,
  StyleSheet, ScrollView, AsyncStorage
} from 'react-native'
import { Tabs, Drawer } from '@ant-design/react-native'
import { connect } from 'react-redux'

import DownTime from './DownTime'
import PlayNav from './PlayNav'
import RowBall from './RowBall'
import Trend from './Trend'
import FastPlayNav from './SetFastPlayEntry'
import LatelyList from './LatelyList'
import BetSimpleHistory from './BetSimpleHistory'

import { DownTimeHoc, RowBallHoc } from '../../HOC'
import {
  setNavParams, getGamesPlay, setActivePlay, setCustomPlayNav,
  setNullLatelyOpen, setGamesPlayToNull
} from '../../actions/classic'
import norLot from '../../data/nor-lot'
import { stylesUtil } from '../../utils/ScreenUtil'
// import BetListComp from '../../components/BetListComp'

const DownTimeHocView = DownTimeHoc(DownTime)
const RowBallHocView = RowBallHoc(RowBall)

const selfRoute = [
  {name: '时时彩', code: 'lo1', mapCode: ['ssc']},
  {name: '11选5', code: 'lo2', mapCode: ['syx5']},
  {name: '快三', code: 'lo3', mapCode: ['k3']},
  {name: 'PK拾', code: 'lo4', mapCode: ['pk10']},
  {name: '快乐十分', code: 'lo5', mapCode: ['kl10']},
  {name: '基诺', code: 'lo6', mapCode: ['kl8']},
  {name: '幸运彩', code: 'lo7', mapCode: ['xyc']},
  {name: '低频彩', code: 'lo8', mapCode: ['dpc']}
]

class BetScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const params = navigation.state.params || {
      countExcept: 0,
      isOuter: 0,
      lotterCode: 'cqssc',
      lotterLabel: 0,
      lotterName: '重庆时时彩',
      lotterNumber: 5,
      lotterTime: '09:50~01:55',
      maxBonus: 1000000,
      numberRange: '0,1,2,3,4,5,6,7,8,9',
      openUrl: 'http://www.baidu.com',
      realCategory: 'ssc',
      status: 0,
      type: 0,
      updateBy: 'dana001'
    }
    return {
      title: params.lotterName
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      ContentTabs: [
        {title: '开奖', code: 'openBall'},
        {title: '投注'},
        {title: '记录', code: 'betHistory'},
        {title: '趋势', code: 'trend'}
      ],
      ballOpen: ['5', '9', '3', '2', '1'],
      changingValue: 1800,
      afterValue: 0,
      stepValue: 1,
      modeItem: {},
      filterNavBar: [],
      open: false,

      intoHistory: 0
    }
    this.time = 1700
  }

  // 当下已经知道这个彩种了，首先渲染这个视图数据
  // 绑定球的点击监听数据、注数的监听
  // 获取这个彩种的玩法数据，奖金数据数据初始化，和联动他的数据
  // 投注下单
  componentWillMount() {
  }

  componentDidMount() {
    // 获取当前彩种的赔率
    let {params, params: {lotterCode, realCategory, isOuter}} = this.props.navigation.state
    let {code} = selfRoute.find(lot => lot.mapCode.includes(realCategory))
    this.props.setNavParams(
      Object.assign({}, params, {lotType: code})
    )
    // 先渲染本地构造的玩法，getGamesPlay接口比较slow
    let {navBar} = JSON.parse(JSON.stringify(norLot[code]))
    let plays = navBar[0].subnav[0].play.map(item => {
      return {...item, name: `${navBar[0].name}${item.name}`}
    })
    this.props.setActivePlay(plays[0])
    this.props.setCustomPlayNav(plays)

    // 获取玩法数据
    this.props.getGamesPlay({
      lotterCode,
      isOuter,
      userId: this.props.userId
    }).then(data => {
      this.getUsefulPlay(params, data['payload'])
    })
  }

  _onChangeTabs = (tabs) => {
    if (tabs.code === 'betHistory') {
      this.setState({
        intoHistory: new Date().getTime()
      })
    }
  }
  getUsefulPlay = ({lotterCode, realCategory}, resData) => {
    let {code} = selfRoute.find(lot => lot.mapCode.includes(realCategory))
    // status 1 的玩法code
    let usefulCode = []
    resData.forEach(item => {
      if (item.status === 1) {
        usefulCode.push(item.ruleCode)
      }
    })
    AsyncStorage.getItem('setLocalCustomPlays').then(p => {
      let d = JSON.parse(p) || {}
      let newCusPlayNav = []
      if (lotterCode.indexOf('ffc') > -1) {
        newCusPlayNav = d['ffc'] ? d['ffc'] : []
      } else {
        newCusPlayNav = d[code] ? d[code] : []
      }

      // 預渲染玩法数据过滤
      let {navBar, codeMap} = JSON.parse(JSON.stringify(norLot[code]))
      let filterNavBar = this.checkedNavBar(navBar, resData, codeMap)

      // 用户本地没有快捷玩法，默认设置filterNavBar[0].subnav[0].play
      let plays = filterNavBar[0].subnav[0].play.map(item => {
        return {...item, name: `${filterNavBar[0].name}${item.name}`}
      })

      // 用户本地存储的玩法数据过滤
      let data = []
      if (newCusPlayNav.length) {
        data = newCusPlayNav.filter(item => usefulCode.includes(codeMap[item.code]))
      } else {
        data = plays
      }
      if (lotterCode.indexOf('ffc') > -1) {
        d['ffc'] = data
      } else {
        d[code] = data
      }
      this.props.setActivePlay(data[0])
      this.props.setCustomPlayNav(data)
      AsyncStorage.setItem('setLocalCustomPlays', JSON.stringify(d))
      this.setState({filterNavBar})
    })
  }

  checkedNavBar = (navBar, gamePlay, codeMap) => {
    let newNavbar = []
    let usefulCode = []
    gamePlay.forEach(item => {
      if (item.status === 1) {
        usefulCode.push(item.ruleCode)
      }
    })
    if (navBar.length && gamePlay.length) {
      navBar.filter(nav => {
        let ItemNavbar = Object.assign({}, nav, {
          subnav: []
        })
        nav.subnav.filter(sub => {
          let subplay = []
          sub.play.filter(play => {
            // 拿到當前的玩法
            // 0禁止(默认),1正常,2可见(不能投注)
            let thisPlay = codeMap[play.code]
            if (usefulCode.includes(thisPlay)) {
              subplay.push(play)
            }
          })
          if (subplay.length) {
            ItemNavbar.subnav.push(
              Object.assign({}, sub, {
                play: subplay
              })
            )
          }
        })
        if (ItemNavbar.subnav.length) {
          newNavbar.push(ItemNavbar)
        }
      })
      return newNavbar
    } else {
      return navBar
    }
  }

  componentWillUnmount() {
    // 缺一不可
    this.props.setNavParams({})
    this.props.setActivePlay({})
    this.props.setGamesPlayToNull([])
    this.props.setCustomPlayNav([])
    this.props.setLatelyOpen()
    this.setState = () => () => {
    }
  }

  // 点击单元表格
  onPressItem = (item) => {
    // 跳转详情页
    this.props.navigation.navigate('OrderDetail', {detail: item})
    // 点击一项改变数据重置数据
    // let Row = this.BetHistory.listView.getRows().slice()
    // Row.find(rows => rows.orderId === item.orderId).ruleName = '自定义'
    // this.BetHistory.listView.updateDataSource(Row)
  }

  closeDrawer = () => {
    this.drawer.closeDrawer()
  }

  openDrawer = () => {
    this.drawer.openDrawer()
  }

  render() {
    let {ContentTabs, filterNavBar, intoHistory} = this.state
    let {params} = this.props.navigation.state
    return (
      <View style={styles.container}>
        <Drawer
          drawerRef={el => (this.drawer = el)}
          open={this.state.open}
          position={'right'}
          sidebar={<FastPlayNav onClose={() => this.closeDrawer()} filterNavBar={filterNavBar}/>}
          onClose={() => this.closeDrawer()}>
          {/* playNav Container */}
          <PlayNav openDrawer={this.openDrawer}/>

          {/* down Container */}
          <DownTimeHocView
            ballOpen={this.state.ballOpen}
            activeLot={params}
          />
          {/* Tabs Nav */}
          <Tabs tabs={ContentTabs}
                style={{background: '#ededed'}}
                onChange={this._onChangeTabs}
                initialPage={1}
                animated={false}>
            <View>
              <ScrollView>
                <LatelyList/>
              </ScrollView>
            </View>
            <View style={{flex: 1}}>
              <RowBallHocView activeLot={params}/>
            </View>
            <View style={{flex: 1}}>
              <BetSimpleHistory
                navParams={this.props.navParams}
                intoHistory={intoHistory}/>
            </View>
            <View style={{flex: 1}}>
              <ScrollView>
                <Trend activeLot={params}/>
              </ScrollView>
            </View>
          </Tabs>
        </Drawer>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let {userId} = state.common
  let {navParams, gamesPlayStore} = state.classic
  return ({
    userId,
    navParams,
    gamesPlayStore
  })
}
const mapDispatchToProps = (dispatch) => {
  return {
    setNavParams: params => dispatch(setNavParams(params)),
    setActivePlay: params => dispatch(setActivePlay(params)),
    getGamesPlay: params => dispatch(getGamesPlay(params)),
    setCustomPlayNav: (data) => dispatch(setCustomPlayNav(data)),
    setGamesPlayToNull: (data) => dispatch(setGamesPlayToNull(data)),
    setLatelyOpen: () => dispatch(setNullLatelyOpen([]))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BetScreen)

const styles = StyleSheet.create(
  stylesUtil({
    container: {
      flex: 1,
      backgroundColor: '#ededed'
    },
    tabs: {
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      paddingRight: 20,
      paddingLeft: 10
    }
  })
)
