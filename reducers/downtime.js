import {handleActions} from 'redux-actions'

const initialState = {
  downTimeText: ''
}

const downTime = handleActions({
  SET_DOWN_TIME_TEXT: (state, {payload}) => {
    return {
      ...state,
      downTimeText: payload
    }
  }
}, initialState)

export default downTime
