import { handleActions } from 'redux-actions'

const initialState = {
  latelyOpenList: []
}

const classic = handleActions({
  SET_LATELY_OPEN: (state, {payload}) => {
    return {
      ...state,
      latelyOpenList: payload
    }
  }
}, initialState)

export default classic
