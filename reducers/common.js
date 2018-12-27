import {handleActions} from 'redux-actions'

const initialState = {
  commonText: ''
}

const common = handleActions({
  SET_COMMON_TEXT: (state, {payload}) => {
    return {
      ...state,
      commonText: payload
    }
  }
}, initialState)

export default common
