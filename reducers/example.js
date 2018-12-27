const initialState = {
  btnText: '',
  count: 0
}

const example = (state = initialState, {type, payload}) => {
  // console.log(payload)
  switch (type) {
    case 'SET_BTN_NAME':
      return {
        ...state,
        btnText: payload
      }
    case 'ADD_COUNT':
      return {
        ...state,
        count: payload
      }
    default:
      return state
  }
}

export default example
