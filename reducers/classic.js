import { handleActions } from 'redux-actions'

const initialState = {
  latelyOpenList: [],
  navParams: {},
  activePlay: {},

  gamesPlayStore: []
}

const classic = handleActions({
  SET_LATELY_OPEN: (state, {payload}) => {
    return {
      ...state,
      latelyOpenList: payload
    }
  },
  UPDATE_NAV_PARAMS: (state, {payload}) => {
    return {
      ...state, navParams: payload
    }
  },
  SET_ACTIVE_PLAY: (state, {payload}) => {
    return {
      ...state, activePlay: payload
    }
  },
  SET_GAMES_PLAY_STORE: (state, {payload}) => {
    return {
      ...state, gamesPlayStore: payload
    }
  }
}, initialState)

export default classic
