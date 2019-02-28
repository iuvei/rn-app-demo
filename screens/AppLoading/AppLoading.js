import React from 'react'
import { AppLoading, Font, Icon } from 'expo'
import { connect } from 'react-redux'
import {
  setLoginStatus, setUserRebate,
  setLoginInfo, setUserBalance,
  setPasswordRule,
  AsetUserSecureLevel
} from '../../actions/common'
import {
  getLoginUser, getUserRebateInfo,
  getUserBalance, _getImageSetCookie
} from '../../api/basic'

import {
  checkOtaUpdates, fetchUpdateAndReload
} from '../../services/UpdateService'

class AppLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // 经过我的处理在完成之后跳转到navigation
    return (
      <AppLoading
        startAsync={this._loadResourcesAsync}
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading}
        autoHideSplash={false}
      />
    )
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      // checkOtaUpdates(),
      // Asset.loadAsync([
      //   require('./assets/images/robot-dev.png'),
      //   require('./assets/images/robot-prod.png')
      // ]),
      Font.loadAsync(
        'antoutline',
        // eslint-disable-next-line
        require('@ant-design/icons-react-native/fonts/antoutline.ttf')
      ),
      Font.loadAsync(
        'antfill',
        // eslint-disable-next-line
        require('@ant-design/icons-react-native/fonts/antfill.ttf')
      ),
      Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        MyIconFont: require('../../assets/fonts/iconfont.ttf')
      }),
      Font.loadAsync({
        //   // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        //   // We include SpaceMono because we use it in HomeScreen.js. Feel free
        //   // to remove this if you are not using it in your app
        'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf')
      }),
      // 这里回先执行二维码然后再去那数据
      await _getImageSetCookie(),
      getLoginUser().then(res => {
        // console.log(`当前用户登陆状态:${res.code === 0 ? '在线' : '下线'}`)
        if (res.code === 0) {
          this.props.setPasswordRule()
          this.props.setLoginStatus(res.code === 0)
          this.props.setLoginInfo(res.data)
          this.props.setUserRebate(res.data.acc.user.userId)
          this.props.AsetUserSecureLevel()
        }
      })
    ])
  }

  _testReturnPromise = async () => {
    await checkOtaUpdates()
  }

  // 可以延迟加载的资源
  _loadResourcesAsyncEvent = async () => {
    let {loginInfo} = this.props
    // let rebateInfo = await getUserRebateInfo({userId: loginInfo.userId})
    let balance = await getUserBalance({userId: loginInfo.userId})
    // if (rebateInfo.code === 0) {
    //   this.props.setUserRebate(rebateInfo.data)
    // }
    if (balance.code === 0) {
      this.props.setUserBalance(balance.data.banlance.CNY)
    }
  }

  _handleLoadingError = error => console.log('error status', error)

  _handleFinishLoading = () => {
    if (this.props.isLogin) this._loadResourcesAsyncEvent()
    this.props.navigation.navigate(this.props.isLogin ? 'Main' : 'Login')
    Expo.SplashScreen.hide()
  }
}

const mapStateToProps = (state) => {
  let {isLogin, loginInfo, count} = state.common
  return ({
    isLogin,
    loginInfo,
    count
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
    setUserRebate: (data) => {
      dispatch(setUserRebate(data))
    },
    setUserBalance: (data) => {
      dispatch(setUserBalance(data))
    },
    setPasswordRule: () => {
      dispatch(setPasswordRule())
    },
    AsetUserSecureLevel: (data) => {
      dispatch(AsetUserSecureLevel(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppLoadingScreen)

