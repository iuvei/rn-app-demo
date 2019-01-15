import React from 'react'
import {
  View, Text,
  StyleSheet, ScrollView
} from 'react-native'
import {
  Button, Flex, WhiteSpace, Toast
} from '@ant-design/react-native'
import { connect } from "react-redux";
import norLot from './../../data/nor-lot'
import { setCustomPlayNav } from '../../actions/classic'
import _ from 'lodash'

class FastPlayNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navBar: [],
      activeTitle: '',
      newCusNav: [],
      maxNum: 10
    }
  }

  componentWillReceiveProps(np) {
    let {navParams} = this.props
    if (!_.isEqual(navParams, np.navParams) && Object.keys(np.navParams).length) {
      this.initPlayNav(np.navParams)
    }
  }

  initPlayNav = ({lotType}) => {
    let { newCusNav } = this.props
    let {navBar} = JSON.parse(JSON.stringify(norLot[lotType]))
    this.setState({
      navBar,
      newCusNav,
      activeTitle: navBar[0].name
    })
  }

  changeSubs = (activeTitle) => {
    this.setState({activeTitle})
  }

  setSubs = (title, {code, name}) => {
    let { newCusNav, activeTitle, maxNum } = this.state
    let dif = newCusNav.filter(item => item.code === code)
    if (!dif.length) {
      if (newCusNav.length < maxNum) {
        this.setState(prevState => ({
          newCusNav: [...prevState.newCusNav, {code: code, name: `${activeTitle}${title}${name}`}]
        }))
      } else {
        Toast.info(`最多设置${maxNum}个！`)
      }
    } else {
      this.setState(prevState => ({
        newCusNav: prevState.newCusNav.map(item => item.code !== code)
      }))
    }
  }

  submitCumSubs = () => {
    let { newCusNav } = this.state
    this.props.setCustomPlayNav(newCusNav)
  }

  resetCumSubs = () => {
    let { newCusNav } = this.props
    this.setState({newCusNav})
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