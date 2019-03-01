import React from 'react'
import {
  Platform, StyleSheet, StatusBar, View, Button, YellowBox
} from 'react-native'

import { Provider } from 'react-redux'
import { Provider as Provider2 } from '@ant-design/react-native'
import { Root } from "native-base"
import store from './store'
// import { changeBtnText } from './actions/example'
import AppNavigator from './navigation/AppNavigator'
import NavigationService from './navigation/NavigationService'
import initReactFastClick from 'react-fastclick'
import LinesPanel from './components/LinesPanel'
// import HbPacket from './components/HbPacket'
import AudioPlay from './components/AudioPlay'
import GlobalComp from './components/GlobalComp'

// 忽略不必要warning
YellowBox.ignoreWarnings(['Require cycle:'])
initReactFastClick()

// 开始监听，每次state更新，那么就会打印出当前状态
// const unsubscribe = store.subscribe(() => {
//   console.info('hey guys! 数据更新了', store.getState())
// })

// 发送消息
// setTimeout(() => {
//   store.dispatch(changeBtnText(`这是我定时器给的名字`))
// }, 1000)

// 停止监听state的更新
// unsubscribe()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Provider2>
          <Root>
            <GlobalComp/>
            <LinesPanel/>
            <AudioPlay/>
            {/*<HbPacket/>*/}
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar
                backgroundColor={'blue'}
                barStyle="light-content"/>}
              <AppNavigator
                ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef)
                }}
              />
            </View>
          </Root>
        </Provider2>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    zIndex: -1,
    backgroundColor: '#fff'
  }
})
