import React from 'react'
import {
  Platform, StyleSheet, StatusBar, View
} from 'react-native'

import { Provider } from 'react-redux'
import { Provider as Provider2 } from '@ant-design/react-native'
import store from './store'
// import { changeBtnText } from './actions/example'
import AppNavigator from './navigation/AppNavigator'
import initReactFastClick from 'react-fastclick'
import LinesPanel from './components/LinesPanel'
import AudioPlay from './components/AudioPlay'

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
          <LinesPanel/>
          <AudioPlay/>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar
              backgroundColor={'blue'}
              barStyle="light-content"/>}
            <AppNavigator/>
          </View>
        </Provider2>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
