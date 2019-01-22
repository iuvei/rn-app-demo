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
    let {newCusPlayNav, activePlay} = this.props
    let { code } = activePlay
    if (!_.isEqual(newCusPlayNav, np.newCusPlayNav)) {
      let d = np.newCusPlayNav.filter(item => item.code === code).length
      this.setState({
        playTabs: np.newCusPlayNav
      }, () => !d ? this.InitBetView(np.newCusPlayNav[0]) : '')
    }
  }

  InitBetView = (item) => {
    this.props.setActivePlay(item || {code: 'lo1_5x_fs', name: '五星复式'})
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
              <ScrollView
                ref={(ref) => {
                  this.scrollPlayNav = ref
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {
                  playTabs.length > 0 ? playTabs.map((tab, index) => {
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
                  }) : <Text style={{textAlign: 'center', lineHeight: 40}}>正在加载中···</Text>
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
