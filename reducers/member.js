import {handleActions} from 'redux-actions'

const initialState = {
  memberText: '',
  activeAccount: {}
}

const member = handleActions({
  SET_MEMBER_TEXT: (state, {payload}) => {
    return {
      ...state,
      memberText: payload
    }
  },
  SET_ACTIVE_ACCOUNT: (state, {payload}) => {
    return {
      ...state,
      activeAccount: payload
    }
  }
}, initialState)

export default member
