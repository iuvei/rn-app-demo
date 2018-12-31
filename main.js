import React from 'react'
import AppNavigator from './navigation/AppNavigator'
import {
  Platform, StatusBar,
  StyleSheet, View
} from 'react-native'
import {AppLoading, Asset, Font, Icon} from 'expo'
import {fetch} from './services/HttpService'
import {connect} from 'react-redux'
import {setLoginStatus} from './actions/common'
import {getLoginUser} from './api/basic'

// 如果非登陆状态，则跳到首页去
class Main extends React.Component {
  state = {
    isLoadingComplete: false
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
      // if (this.props.isLogin) {
      // 登陆情况
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar
            backgroundColor={'blue'}
            barStyle="dark-content"/>}
          <AppNavigator/>
        </View>
      )
      // } else {
      //   return (
      //     <View style={styles.container}>
      //       <LoginScreen/>
      //     </View>
      //   )
      // }
    }
  }

  _getImageSetCookie = () => {
    let time = new Date().getTime()
    return fetch({
      type: 'get',
      api: `/user/captcha`,
      params: {time}
    })
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png')
      ]),
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
      }),
      Font.loadAsync({
        //   // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        //   // We include SpaceMono because we use it in HomeScreen.js. Feel free
        //   // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
      }),
      this._testReturnPromise(),
      // 这里回先执行二维码然后再去那数据
      await this._getImageSetCookie().then(() =>
        console.log('getImageSetCookie finished')
      ),
      getLoginUser().then(res => {
        console.log('getUserStatus finished', res)
        this.props.setLoginStatus(res.code === 0)
      })
    ])
  }

  _testReturnPromise = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('simulation to loading')
      }, 0)
    })
  }

  _handleLoadingError = error => console.log('error status', error)

  _handleFinishLoading = () => {
    console.log('loading finished')
    this.setState({isLoadingComplete: true})
    Expo.SplashScreen.hide()
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
