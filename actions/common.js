import { getSysLottery } from "../api/lottery";
import { createAction } from "redux-actions";

export const setLoginStatus = (status) => {
  return {
    type: 'SET_LOGIN_STATUS',
    payload: status
  }
}

export const SetCustomizeLottery = createAction(
  'SET_CUSTOMIZE_LOTTERY',
  async () => {
    let res = await getSysLottery()
    return res.code === 0 ? res.data : []
  })
