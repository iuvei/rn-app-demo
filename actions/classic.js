import { createAction } from 'redux-actions'
import {
  loadGamesPlay, loadLatelyOpenHistory,
  isTestEnvironment
} from '../api/lottery'
import { getDividendAuthority } from '../api/member'

// 回掉回调处理
export const getLatelyOpen = createAction(
  'SET_LATELY_OPEN',
  params => loadLatelyOpenHistory(params).then(res => {
    if (res.code === 0) {
      if (res.data ? res.data.length : false) {
        res.data.filter(item => {
          item.codelist = item.openCode.split(',')
        })
        return res.data
      } else {
        return []
      }
    }
  })
)

export const setNullLatelyOpen = createAction(
  'SET_LATELY_OPEN',
  text => text
)

// 简约处理
export const setNavParams = createAction(
  'UPDATE_NAV_PARAMS',
  text => text
)

export const setActivePlay = createAction(
  'SET_ACTIVE_PLAY',
  text => text
)

export const setOpenIssue = createAction(
  'SET_OPEN_ISSUE',
  text => text
)

export const getGamesPlay = createAction(
  'SET_GAMES_PLAY_STORE',
  params => loadGamesPlay(params).then(res => {
    if (res.code === 0) {
      if (res.data ? res.data.length : false) {
        return res.data
        // 是否可见 .find(item => item.status === 2)
      } else {
        return []
      }
    }
  })
)

export const setCustomPlayNav = createAction(
  'SET_CUSTOM_PLAY_NAV',
  text => text
)

export const setGamesPlayToNull = createAction(
  'SET_GAMES_PLAY_TO_NULL',
  text => text
)

export const checkEnvironment = createAction(
  'SET_ENVIRONMENT',
  () => isTestEnvironment().then(res => {
    if (res.code === 0) return res.data.isTest
  })
)
