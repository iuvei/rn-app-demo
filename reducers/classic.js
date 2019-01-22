import { handleActions } from 'redux-actions'

const initialState = {
  latelyOpenList: [],
  navParams: {},
  activePlay: {},
  newCusPlayNav: [],
  gamesPlayStore: [],

  openIssue: {},

  // 1测试环境 0正式区环境
  Environment: 1
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
  },
  SET_OPEN_ISSUE: (state, {payload}) => {
    return {
      ...state, openIssue: payload
    }
  },
  SET_CUSTOM_PLAY_NAV: (state, {payload}) => {
    return {
      ...state, newCusPlayNav: payload
    }
  },
  SET_GAMES_PLAY_TO_NULL: (state, {payload}) => {
    return {
      ...state, gamesPlayStore: payload
    }
  },
  SET_ENVIRONMENT: (state, {payload}) => {
    return {
      ...state, Environment: payload
    }
  }
}, initialState)

export default classic
