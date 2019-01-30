import React from 'react'
import { connect } from 'react-redux'
import {
  setLoginStatus,
  setLoginInfo
} from '../actions/common'
import { AppState } from 'react-native'
import { AsetAllBalance } from '../actions/member'
import NavigationService from '../navigation/NavigationService'

class GlobalComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState
    }
    this.loopTimer = null
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextprops ===', nextProps)
    if (nextProps.loginInfo.acc) {
      this.loopTimer = setTimeout(() => {
        this.loopCheckLogin()
      }, 3 * 1000)
    }
    if (!nextProps.isLogin && this.props.isLogin) {
      NavigationService.navigate('AppLoading')
    }
  }

  // 登录状态检测
  loopCheckLogin = () => {
    clearTimeout(this.loopTimer)
    // 增加： 当切非当前页面，不再轮询，储存监听
    // if (!this.visibility) {
    //   // this.isHasCheck = true
    //   return
    // }
    // console.log('loop global', new Date().getTime())
    this.props.AsetAllBalance((res) => {
      if (res.code === 0) {
        this.loopTimer = setTimeout(() => {
          this.loopCheckLogin()
        }, 30 * 1000)
      }
    })
  }
  
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
    this.setState = () => () => {}
  }

  _handleAppStateChange = (nextAppState) => {
    console.log(nextAppState)
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState})
  }

  render() {
    return (null)
  }
}

const mapStateToProps = (state) => {
  let {isLogin, loginInfo} = state.common
  return ({
    isLogin,
    loginInfo
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginStatus: (text) => {
      dispatch(setLoginStatus(text))
    },
    setLoginInfo: (text) => {
      dispatch(setLoginInfo(text))
    },
    AsetAllBalance: (data) => {
      dispatch(AsetAllBalance(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalComp)
