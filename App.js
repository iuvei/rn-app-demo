import React from 'react'
import {
  Platform, StatusBar, Button,
  StyleSheet, View
} from 'react-native'
import {AppLoading, Asset, Font, Icon} from 'expo'
import AppNavigator from './navigation/AppNavigator'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {axiosHttp} from './services/HttpService'
import {changeBtnText} from './actions/example'

const store = createStore(reducer)

// 如果非登陆状态，则跳到首页去
class App extends React.Component {
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
            // 如果为false需要手动隐藏
            // autoHideSplash={false}
          />
        </View>
      )
    } else if (this.state.isLogin) {
      return (
        // 这里是你的数据路由
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
          <AppNavigator/>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Button
            style={styles.btn}
            onPress={() => {
              this._toLogin().then(res => {
                console.log(res)
                if (res.code === 0) {
                  setTimeout(() => {
                    this.setState({
                      isLogin: true
                    })
                  }, 3000)
                }
              })
            }}
            title='TO LOGIN'/>
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
        resolve('resolve foo')
      }, 3000)
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
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  _handleFinishLoading = () => {
    console.log('loading finished')
    this.setState({isLoadingComplete: true})
    // 启动页 隐藏
    // setTimeout(() => {
    // Expo.SplashScreen.hide()
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

// 开始监听，每次state更新，那么就会打印出当前状态
const unsubscribe = store.subscribe(() => {
  console.info(store.getState())
})

let count = 2
// 发送消息
setTimeout(() => {
  count++
  store.dispatch(changeBtnText(`点击了${count}次按钮`))
  console.log('dispatch btn times')
}, 3000)

export default class Index extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }

}
