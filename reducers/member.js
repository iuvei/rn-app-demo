import {handleActions} from 'redux-actions'

const initialState = {
  memberText: ''
}

const member = handleActions({
  SET_MEMBER_TEXT: (state, {payload}) => {
    return {
      ...state,
      memberText: payload
    }
  }
}, initialState)

export default member
