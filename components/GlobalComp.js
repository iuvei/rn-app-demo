import React from 'react'
import { connect } from 'react-redux'
import {
  setLoginStatus,
  setLoginInfo,
  AsetNetInfo
} from '../actions/common'
import { AppState, NetInfo } from 'react-native'
import { AsetAllBalance } from '../actions/member'
import NavigationService from '../navigation/NavigationService'
import { Toast } from "@ant-design/react-native/lib/index";

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
    //检测网络是否连接
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.props.AsetNetInfo(isConnected)
      if(!isConnected) {
        Toast.fail('无网络服务！', 0.5, undefined, false)
      }
    });

    //监听网络变化事件
    NetInfo.isConnected.addEventListener('connectionChange', (isConnected) => {
      this.props.AsetNetInfo(isConnected)
      if(!isConnected) {
        Toast.fail('无网络服务！', 0.5, undefined, false)
      }
    })
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
    NetInfo.isConnected.removeEventListener('connectionChange');
    this.setState = () => () => {}
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
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
    },
    AsetNetInfo: (data) => {
      dispatch(AsetNetInfo(data))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalComp)
