import { getSysLottery } from "../api/lottery";
import { createAction } from "redux-actions";

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

export const SetCustomizeLottery = createAction(
  'SET_CUSTOMIZE_LOTTERY',
  async () => {
    let res = await getSysLottery()
    return res.code === 0 ? res.data : []
  })
