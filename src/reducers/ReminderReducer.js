import { ADD_REMINDER, REMOVE_REMINDER, FETCH_REMINDER} from '../actions/actionsTypes'

const INITIAL_DATA = []

const ReminderReducer = (state=INITIAL_DATA, action) => {
    switch (action.type){
        case ADD_REMINDER:
        return [
            ...state,action.res
        ]
        case FETCH_REMINDER:
        return action.reminders
        case REMOVE_REMINDER:
        return state.filter(todo => todo._id !== action._id);
        default:
        return state
    }
}

export default ReminderReducer