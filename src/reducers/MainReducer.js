import { combineReducers } from 'redux'
import todos from './TodoReducer'
import reminders from './ReminderReducer'
import visibilityFilter from './FilterReducer'

export default combineReducers({
  todos,
  reminders,
  visibilityFilter
})