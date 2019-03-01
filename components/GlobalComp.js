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
import { Modal } from '@ant-design/react-native'
import { View, Text } from 'react-native'
import {
  getMoblieVersion
} from '../api/basic'
import { WebBrowser, Constants } from 'expo'
import { host } from '../api.config'

class GlobalComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState
    }
    this.loopTimer = null
    this.getMoblieVersion()
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

  getMoblieVersion = () => {
    let curVersion = Constants.manifest.version // config.versionNumber
    let temp = curVersion.split('.')

    getMoblieVersion().then(res => {
      console.log(res)
      if (res.code === 0) {
        // let forceUpdate = false
        let arr = res.data.filter(list => {
          let item = list.versionNumber.split('.')
          let flag = item[0] > temp[0] || (item[0] === temp[0] && item[1] > temp[1]) ||
            (item[0] === temp[0] && item[1] === temp[1] && item[2] > temp[2])
          return flag
        })
        arr.forEach(item => {
          if (item.isForceUpdate === 1) {
            // this.showDownload = true
            this.setState({
              visible: true
            })
          }
        })
      }
    })
  }

  _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(host+'/app/static/download')
    console.log(result)
  }

  render() {
    const footerButtons = [
      { text: '前往下载', onPress: () => this._handlePressButtonAsync() },
    ]
    return (
      <View>
        {
          this.state.visible &&
          <Modal
            title=""
            transparent
            maskClosable={false}
            visible={this.state.visible}
            closable={false}
            footer={footerButtons}>
            <View style={{ paddingVertical: 20 }}>
              <Text style={{ textAlign: 'center' }}>有新版本发布啦！</Text>
            </View>
          </Modal>
        }
      </View>
    )
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
