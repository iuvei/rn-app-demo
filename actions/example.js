import {createAction, handleActions} from 'redux-actions'
// export const changeBtnText = (text) => {
//   return {
//     type: 'SET_BTN_NAME',
//     payload: text
//   }
// }

export const changeBtnText = createAction('SET_BTN_NAME', text => text)

fetchPromiseValue = async () => {
  return new Promise((resolve, reject) => {
    let text = 'PromiseReturnValue'
    resolve(text)   // Promise 抛出状态值
  })
}

export const PromiseChangeBtnText = createAction('SET_BTN_NAME', () => {
  return fetchPromiseValue()
})

export const addCount = (text) => {
  return {
    type: 'ADD_COUNT',
    payload: text
  }
}

export const changeBtnTextAsync = (text) => {
  return (dispatch, getState) => {
    console.log('changeBtnTextAsync', getState)
    setTimeout(() => {
      dispatch(changeBtnText('finished'))
    }, 1000)
    // if (!getState().isLoading) {
    //   dispatch(changeBtnText('正在加载中'))
    // }
    // axios.get(`http://test.com/${text}`).then(() => {
    //   if (getState().isLoading) {
    //     dispatch(changeBtnText('加载完毕'))
    //   }
    // }).catch(() => {
    //   dispatch(changeBtnText('加载有误'))
    // })
  }
}
