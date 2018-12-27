import {handleActions} from 'redux-actions'

const initialState = {
  classicText: ''
}

const classic = handleActions({
  SET_CLASSIC_NAME: (state, {payload}) => {
    return {
      ...state,
      classicText: payload
    }
  }
}, initialState)

export default classic
