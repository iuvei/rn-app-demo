import {combineReducers} from 'redux'
import example from './example'
import common from './common'
import member from './member'
import downtime from './downtime'
import classic from './classic'

export default combineReducers({
  example,
  common,
  member,
  downtime,
  classic
})


