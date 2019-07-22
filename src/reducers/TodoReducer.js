import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, FETCH_TODO} from '../actions/actionsTypes'

const INITIAL_DATA = []

const TodoReducer = (state=INITIAL_DATA, action) => {
    switch (action.type){
        case ADD_TODO:
        return [
            ...state,action.res
        ]
        case FETCH_TODO:
        return action.todos
        case TOGGLE_TODO:
        return state.map(todo =>
        (todo._id === action._id)
          ? {...todo, completed: !todo.completed}
          : todo
         )
        case REMOVE_TODO:
        return state.filter(todo => todo._id !== action._id);
        default:
        return state
    }
}

export default TodoReducer