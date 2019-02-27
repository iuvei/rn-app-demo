import React from 'react'
import {
  View, Text,
  StyleSheet, ScrollView, AsyncStorage
} from 'react-native'
import {
  Button, Flex, WhiteSpace, Toast
} from '@ant-design/react-native'
import { connect } from "react-redux";
import { setCustomPlayNav } from '../../actions/classic'
import _ from 'lodash'

class FastPlayNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navBar: [],
      activeTitle: "",
      newCusNav: [],
      maxNum: 10
    }
  }

  componentWillReceiveProps(np) {
    let {filterNavBar, newCusPlayNav} = this.props
    if (!_.isEqual(newCusPlayNav, np.newCusPlayNav)) {
      this.setState({
        newCusNav: np.newCusPlayNav
      })
    }
    if (!_.isEqual(filterNavBar, np.filterNavBar)) {
      this.setState({
        navBar: np.filterNavBar,
        activeTitle: np.filterNavBar[0].name
      })
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.setState = () => () => {
    }
  }

  changeSubs = (activeTitle) => {
    this.setState({activeTitle})
  }

  setSubs = (title, {code, name}) => {
    let spCode = ['lo1_2x', 'lo1_rx', 'lo1_lh_', 'lo1_h_', 'lo1_hz_', 'lo2_3x', 'lo2_2x', 'lo2_rx', 'lo5_sx', 'lo8_ex']
    let resCode = spCode.filter(item => code.indexOf(item) > -1)
    let { newCusNav, activeTitle, maxNum } = this.state
    let totalName = !resCode.length ? activeTitle : code.indexOf('lo1_hz_') > -1 ? `${activeTitle}${title}` : title
    let dif = newCusNav.filter(item => item.code === code)
    if (!dif.length) {
      if (newCusNav.length < maxNum) {
        this.setState(prevState => ({
          newCusNav: [...prevState.newCusNav, {code: code, name: `${totalName}${name}`}]
        }))
      } else {
        Toast.info(`最多设置${maxNum}个！`)
      }
    } else {
      this.setState(prevState => (
        {
          newCusNav: prevState.newCusNav.filter(item => item.code !== code)
        }
      ))
    }
  }

  submitCumSubs = () => {
    let { newCusNav } = this.state
    if (!newCusNav.length) {
      Toast.info(`至少设置一个！`)
      return
    }
    this.props.setCustomPlayNav(newCusNav)
    this.setLocalCustomPlays(newCusNav)
  }

  setLocalCustomPlays = (data) => {
    let { lotType, lotterCode } = this.props.navParams
    AsyncStorage.getItem('setLocalCustomPlays').then(p => {
      let d = JSON.parse(p) || {}
      if (lotterCode.indexOf('ffc') > -1) {
        d['ffc'] = data
      } else {
        d[lotType] = data
      }
      AsyncStorage.setItem('setLocalCustomPlays', JSON.stringify(d))
      this.props.onClose()
    })
  }

  resetCumSubs = () => {
    this.setState({
      newCusNav: [this.props.activePlay]
    })
    // let { newCusPlayNav } = this.props
    // this.setState({newCusNav: newCusPlayNav})
  }

  render() {
    let {navBar, activeTitle, newCusNav} = this.state
    let selectCode = newCusNav.map(item => item.code)
    let p = navBar.filter(item => item.name === activeTitle)
    let subs = p.length ? p[0].subnav : []
    return (
      <View style={styles.container}>
        <View style={styles.playNav}>
          <Text>玩法选择</Text>
          <View>
            <Flex wrap="wrap">
              {
                navBar.map((item, key) => {
                  return (
                    <View key={key} style={{width: '32%', marginTop: 8, marginRight: '1%'}}>
                      <Button
                        size="small"
                        type={activeTitle === item.name ? 'primary' : 'ghost'}
                        style={{height: 30}}
                        onPress={() => this.changeSubs(item.name)}>
                        {item.name}
                      </Button>
                    </View>
                  )
                })
              }
            </Flex>
          </View>
        </View>
        <ScrollView>
          <View>
            <WhiteSpace size="lg" />
            {
              subs.map((list, key) => {
                return (
                  <View key={key}>
                    <Text>{list.title}</Text>
                    <Flex wrap="wrap">
                      {
                        list.play.map((item, key) => {
                          return (
                            <View key={key} style={{width: '32%', marginTop: 8, marginRight: '1%'}}>
                              <Button
                                size="small"
                                type={selectCode.indexOf(item.code) > -1 ? 'primary':'ghost'}
                                style={{height: 30}}
                                onPress={() => this.setSubs(list.title, item)}>
                                {item.name}
                              </Button>
                            </View>
                          )
                        })
                      }
                    </Flex>
                  </View>
                )
              })
            }
          </View>
        </ScrollView>
        <Flex justify="end" style={styles.childrenNav}>
          <Button
            size="small"
            type={'ghost'}
            style={styles.cancelBtn}
            onPress={() => this.resetCumSubs()}>
            重置
          </Button>
          <Button
            size="small"
            type={'primary'}
            style={styles.submitBtn}
            onPress={() => this.submitCumSubs()}>
            确认
          </Button>
        </Flex>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {flex:1, backgroundColor: '#ffffff', padding: 5, zIndex: 2},
  playNav: {borderBottomWidth: 1, borderColor: '#f0f0f0', paddingBottom: 15},
  childrenNav: {marginBottom: 5, paddingTop: 15, borderTopWidth: 1, borderColor: '#f0f0f0'},
  cancelBtn: {height: 30, width: 120, borderTopEndRadius: 0, borderBottomEndRadius: 0},
  submitBtn: {height: 30, width: 120, borderTopStartRadius: 0, borderBottomStartRadius: 0},
})

const mapStateToProps = (state) => {
  return ({
    ...state.classic
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCustomPlayNav: (data) => dispatch(setCustomPlayNav(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FastPlayNav)
