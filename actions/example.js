import {createAction} from 'redux-actions'
// export const changeBtnText = (text) => {
//   return {
//     type: 'SET_BTN_NAME',
//     payload: text
//   }
// }

// 不实用任何方法处理
export const addCount = (text) => {
  return {
    type: 'ADD_COUNT',
    payload: text
  }
}

// 简约处理
export const changeBtnText = createAction(
  'SET_BTN_NAME',
  // 返回值为reducers的payload数值
  text => text
)

// fetchPromiseValue = () => {
//   return new Promise((resolve, reject) => {
//     let text = 'PromiseReturnValue'
//     resolve(text)   // Promise 返回状态值
//   })
// }

// 常规数据回调
export const changeBtnTextAsync = (text) => {
  // text 你传过来的参数
  // getState 你的reduces数据源
  return (dispatch, getState) => {
    // console.log('changeBtnTextAsync', getState(), text)
    // 这里可以做一些异步处理的功能
    setTimeout(() => {
      dispatch(changeBtnText('changeBtnTextAsync'))
    }, 1000)
  }
}

// 回掉回调处理
export const PromiseChangeBtnText = createAction(
  'SET_BTN_NAME',
  () => new Promise((resolve, reject) => {
    let text = 'PromiseReturnValue'
    // Promise 返回数据 自动将返回值变成payload
    resolve(text)
  })
)
