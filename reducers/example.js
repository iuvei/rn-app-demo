import {handleActions} from 'redux-actions'

const initialState = {
  btnText: '',
  count: 0
}

// const example = (state = initialState, {type, payload}) => {
//   // console.log(payload)
//   switch (type) {
//     case 'SET_BTN_NAME':
//       return {
//         ...state,
//         btnText: payload
//       }
//     case 'ADD_COUNT':
//       return {
//         ...state,
//         count: payload
//       }
//     default:
//       return state
//   }
// }

const example = handleActions({
  // ['SET_BTN_NAME']: {
  //   next(state, action) {
  //     return {
  //       ...state,
  //       btnText: action.payload
  //     }
  //   },
  //   throw(state) {
  //     return state
  //   }
  // }
  // 或者
  SET_BTN_NAME: (state, {payload}) => {
    return {
      ...state,
      btnText: payload
    }
  }
}, initialState)

export default example
