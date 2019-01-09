import { createAction } from 'redux-actions'
import { loadLatelyOpenHistory } from '../api/lottery'

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
