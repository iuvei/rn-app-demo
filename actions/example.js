export const changeBtnText = (text) => {
  return {
    type: 'SET_BTN_NAME',
    payload: text
  }
}

export const addCount = (text) => {
  return {
    type: 'ADD_COUNT',
    payload: text
  }
}
