import React from 'react'
import AppNavigator from './navigation/AppNavigator'
import {
  Platform, StatusBar,
  StyleSheet, View
} from 'react-native'
import { AppLoading, Font, Icon } from 'expo'
import { connect } from 'react-redux'
import { setLoginStatus, setUserRebate, setLoginInfo, setUserBalance } from './actions/common'
import { getLoginUser, getUserRebateInfo, getUserBalance, _getImageSetCookie } from './api/basic'

class Main extends React.Component {
  state = {
    isLoadingComplete: false
  }

  componentWillReceiveProps(nextProps, lastProps) {
    if (nextProps.isLogin && !lastProps.isLogin) {
      this.setState({
        isLoadingComplete: false
      })
    }
  }

  render() {
    if (!this.state.isLoadingComplete) {
      if (!this.props.skipLoadingScreen) {
        return (
          <View style={styles.container}>
            <AppLoading
              startAsync={this._loadResourcesAsync}
              onError={this._handleLoadingError}
              onFinish={this._handleFinishLoading}
              autoHideSplash={false}
            />
          </View>
        )
      }
    } else {
      // 登陆情况
      return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor={'transparent'}
            translucent={true}
            barStyle="light-content"/>
          <AppNavigator/>
        </View>
      )
    }
  }

  _getImageSetCookie = () => {
    _getImageSetCookie()
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
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
        MyIconFont: require('./assets/fonts/iconfont.ttf')
      }),
      Font.loadAsync({
        //   // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        //   // We include SpaceMono because we use it in HomeScreen.js. Feel free
        //   // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
      }),
      // this._testReturnPromise(),
      // 这里回先执行二维码然后再去那数据
      await this._getImageSetCookie(),
      getLoginUser().then(res => {
        console.log(`当前用户登陆状态:${res.code === 0 ? '在线' : '下线'}`)
        if (res.code === 0) {
          this.props.setLoginStatus(res.code === 0)
          this.props.setLoginInfo(res.data)
        }
      })
    ])
  }

  // 可以延迟加载的资源
  _loadResourcesAsyncLater = async () => {
    let {loginInfo} = this.props
    let rebateInfo = await getUserRebateInfo({userId: loginInfo.userId})
    let balance = await getUserBalance({userId: loginInfo.userId})
    if (rebateInfo.code === 0) {
      this.props.setUserRebate(rebateInfo.data)
    }
    if (balance.code === 0) {
      this.props.setUserBalance(balance.data.banlance.CNY)
    }
  }

  // _testReturnPromise = () => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve('simulation to loading')
  //     }, 0)
  //   })
  // }

  _handleLoadingError = error => console.log('error status', error)

  _handleFinishLoading = () => {
    this.setState({isLoadingComplete: true})
    Expo.SplashScreen.hide()
    if (this.props.isLogin) this._loadResourcesAsyncLater()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  btn: {
    marginTop: 30
  }
})

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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
