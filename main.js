import React from 'react'
import AppNavigator from './navigation/AppNavigator'
import {
  Platform, StatusBar,
  StyleSheet, View
} from 'react-native'
import {AppLoading, Asset, Font, Icon} from 'expo'

import LoginComponent from './components/Login'
import {axiosHttp} from './services/HttpService'

// 如果非登陆状态，则跳到首页去
export default class Main extends React.Component {
  state = {
    isLoadingComplete: false,
    isLogin: false
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        // 这里可以开始一些初始化处理
        <View style={styles.container}>
          {/*<Image source={{*/}
          {/*uri: 'http://tianxiang.qmuitest.com/qm/user/captcha?time=1545199449416&platformKey=3LK0V%2FqWsjnMe935IUgNzw%3D%3D&timeStamp=1545199449416'*/}
          {/*}} style={{width: 10, height: 400}}/>*/}
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
            autoHideSplash={false}
          />
        </View>
      )
    } else if (this.state.isLogin) {
      // 登陆情况
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
          <AppNavigator/>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <LoginComponent/>
        </View>
      )
    }
  }

  // 获取用户状态
  getUserStatus = () => {
    return axiosHttp({
      api: '/user/getLoginUser'
    })
  }

  getImageSetCookie() {
    return axiosHttp({
      selfProxy: true,
      api: 'http://tianxiang.qmuitest.com/qm/user/captcha?platformKey=3LK0V/qWsjnMe935IUgNzw==&time='
    })
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
      }),
      this._testReturnPromise(),
      // 这里回先执行二维码然后再去那数据
      await this.getImageSetCookie().then(res => {
        console.log('getImageSetCookie finished')
      }),
      this.getUserStatus().then(res => {
        console.log('getUserStatus finished', res)
        this.setState({
          isLogin: res.code === 0
        })
      })
    ])
  }

  _testReturnPromise = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('simulation to loading')
      }, 5000)
    })
  }

  _toLogin() {
    return axiosHttp({
      api: '/user/j_acegi_security_check',
      type: 'post',
      formdata: {
        j_username: 'johnny',
        j_password: 'zhong123',
        ua: 'ios'
      }
    })
  }

  _handleLoadingError = error => {
    console.log('error status')
    console.warn(error)
  }

  _handleFinishLoading = () => {
    console.log('loading finished')
    this.setState({isLoadingComplete: true})
    // 当 autoHideSplash={false}时
    // 手动配置启动页 隐藏
    // setTimeout(() => {
    Expo.SplashScreen.hide()
    // }, 1500)
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
