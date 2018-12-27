import React from 'react'
import {Provider} from 'react-redux'
import promiseMiddleware from 'redux-promise'
import reducer from './reducers'
import thunk from 'redux-thunk'
import {applyMiddleware, createStore} from 'redux'
import {changeBtnText} from './actions/example'
import Main from './main'

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
// unsubscribe()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    )
  }
}
