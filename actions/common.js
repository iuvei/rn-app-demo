export const setLoginStatus = (status) => {
  return {
    type: 'SET_LOGIN_STATUS',
    payload: status
  }
}

export const setActiveAccount = (data) => {
  return {
    type: 'SET_ACTIVE_ACCOUNT',
    payload: data
  }
}
