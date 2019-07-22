import axios from 'axios';
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, FETCH_TODO } from './actionsTypes'
const baseurl = "http://localhost:3000/todo/";

export const addTodo = (title) => {
  return (dispatch) => {
  	axios.post(baseurl + 'create', {title:title},{crossdomain: true})
    .then((res) => {
        return dispatch ({
			type: 'ADD_TODO',
			res:res.data
		});
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    })
  };
};

export const fetchTodos = () => {
  return (dispatch) => {
  	axios.get(baseurl + 'get', {crossdomain: true})
    .then((res) => {
        return dispatch ({
			type: 'FETCH_TODO',
			todos: res.data
		});
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    })
  };
};

export const deleteTodo = (id) => {
  return (dispatch) => {
  	console.log("`baseurl delete/{id}`",`${baseurl}delete/${id}`)
  	axios.delete(`${baseurl}delete/${id}`, {crossdomain: true})
    .then((res) => {
        return dispatch ({
			type: 'REMOVE_TODO',
			_id: id
		});
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    })
  };
};


export const toggleTodo = (data) => {
  return (dispatch) => {
  	axios.post(baseurl + 'update',data, {crossdomain: true})
    .then((res) => {
        return dispatch ({
			type: 'TOGGLE_TODO',
			_id: data._id
		});
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    })
  };
};

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
})