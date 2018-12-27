import {handleActions} from 'redux-actions'

const initialState = {
  isLogin: false,
  count: 1,
  loginInfo: {}
}

// 常规处理
const common = handleActions({
  SET_LOGIN_STATUS: (state, {payload}) => {
    return {
      ...state,
      isLogin: payload
    }
  },
  SET_LOGIN_INFO: (state, {payload}) => {
    return {
      ...state,
      loginInfo: payload
    }
  }
}, initialState)

export default common
