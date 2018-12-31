import React from 'react'
import {Provider} from 'react-redux'
import promiseMiddleware from 'redux-promise'
import reducer from './reducers'
import thunk from 'redux-thunk'
import {applyMiddleware, createStore} from 'redux'
import {changeBtnText} from './actions/example'
import Main from './main'
import { AppLoading, Font } from 'expo'

const store = createStore(
  reducer,
  applyMiddleware(thunk, promiseMiddleware)
)

// 开始监听，每次state更新，那么就会打印出当前状态
const unsubscribe = store.subscribe(() => {
  console.info('hey guys! 数据更新了', store.getState())
})

// 发送消息
setTimeout(() => {
  store.dispatch(changeBtnText(`这是我定时器给的名字`))
}, 1000)

// 停止监听state的更新
unsubscribe()

export default class App extends React.Component {
  state = {
    isReady: true,
  }

  async componentDidMount() {
    await Font.loadAsync(
      'antoutline',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    );

    await Font.loadAsync(
      'antfill',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antfill.ttf')
    );
    // eslint-disable-next-line
    this.setState({ isReady: true });
  }

  render() {
    const { isReady } = this.state
    if (!isReady) {
      return <AppLoading />
    }
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    )
  }
}
