import { createAction } from 'redux-actions'
import { loadGamesPlay, loadLatelyOpenHistory } from '../api/lottery'

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
