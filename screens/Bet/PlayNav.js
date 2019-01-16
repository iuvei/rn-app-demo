import React from 'react'
import {
  View, Text,
  StyleSheet, AsyncStorage, ScrollView
} from 'react-native'
import {
  Flex
} from '@ant-design/react-native'
import {
  Ionicons
} from '@expo/vector-icons'
import { connect } from 'react-redux'
import { setActivePlay, setCustomPlayNav } from '../../actions/classic'
import norLot from "../../data/nor-lot";
import _ from 'lodash'

class PlayNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      playTabs: [],

      localData: {},

      // 五星+其子nav 和 选中的
      navList: [],
      activeNavList: {},

      // 选中的玩法
      activePlay: {},

      // 获取当前的彩种赔率数据
      gamesPlayStore: [],
      activeGamesPlay: {}
    }
    this.onOpenChange = isOpen => {
      /* tslint:disable: no-console */
      console.log('是否打开了 Drawer', isOpen.toString());
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(np) {
    let {navParams, newCusPlayNav} = this.props
    if (!_.isEqual(navParams, np.navParams) && Object.keys(np.navParams).length) {
      this.initPlayNav(np.navParams)
    }
    if (!_.isEqual(newCusPlayNav, np.newCusPlayNav)) {
      this.setState({
        playTabs: np.newCusPlayNav
      }, () => this.InitBetView(np.newCusPlayNav[0]))
    }
    // let {gamesPlayStore} = this.props
    // if (!_.isEqual(gamesPlayStore !== np.gamesPlayStore)) {
    // console.log('你的数据改变了', 'play')
    // }
  }

  initPlayNav = ({lotType}) => {
    AsyncStorage.getItem('setLocalCustomPlays').then(p => {
      let d = JSON.parse(p) || {}
      let newCusPlayNav = d[lotType] ? d[lotType] : []
      let {navBar} = JSON.parse(JSON.stringify(norLot[lotType]))
      let plays = navBar[0].subnav[0].play.map(item => {
        return {...item, name: `${navBar[0].name}${navBar[0].subnav[0].title}${item.name}`}
      })
      let data = newCusPlayNav.length ? newCusPlayNav : plays
      this.setState({
        playTabs: data
      }, () => this.InitBetView(data[0]))
      if(!newCusPlayNav.length) { // 本地没有数据的情况
        this.props.setCustomPlayNav(plays)
        d[lotType] = plays
        AsyncStorage.setItem('setLocalCustomPlays', JSON.stringify(d))
      }
    })
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
      <View>
        <Flex>
          <View style={styles.playNav}>
            <View style={{backgroundColor: '#ffffff',height: 42}}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                  playTabs.map((tab, index) => {
                    return (
                      <View
                        key={index}
                        style={[styles.btnDefault, tab.code === activePlay.code ? styles.btnActive : '']}>
                        <Text
                          style={[styles.btnDefaultText, tab.code === activePlay.code ? styles.btnActiveText : '']}
                          numberOfLines={1}
                          onPress={() => InitBetView(tab)}>{tab.name}</Text>
                      </View>
                    )
                  })
                }
              </ScrollView>
            </View>
          </View>
          <View style={styles.setting}>
            <Flex justify="center" align="center" onPress={() => this.props.openDrawer()}>
              <Ionicons name="ios-add-circle" color="#0170cc" size={30}/>
            </Flex>
          </View>
        </Flex>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    ...state.classic
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActivePlay: params => dispatch(setActivePlay(params)),
    setCustomPlayNav: (data) => dispatch(setCustomPlayNav(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayNav)

const styles = StyleSheet.create({
  playNav: {
    height: 50,
    width: '90%',
  },
  setting: {
    width: '10%',
    height: 40,
    marginTop: -7,
    paddingTop: 5,
    backgroundColor: '#ffffff'
  },
  btnDefault: {
    width: 100,
    height: 26,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 4
  },
  btnActive: {
    borderColor: '#016fca',
  },
  btnDefaultText: {
    fontSize: 12,
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight:26,
    textAlign: 'center'
  },
  btnActiveText: {
    color: '#016fca',
  },
})
