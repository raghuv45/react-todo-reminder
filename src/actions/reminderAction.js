import axios from 'axios';
import { ADD_REMINDER, FETCH_REMINDER, REMOVE_REMINDER, SET_VISIBILITY_FILTER } from './actionsTypes'
const baseurl = "http://localhost:3000/reminder/";
var config = {crossdomain: true}

export const addReminder = (obj) => {
  return (dispatch) => {
  	axios.post(baseurl + 'create', obj,config)
    .then((res) => {
        return dispatch ({
			type: 'ADD_REMINDER',
			res:res.data
		});
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    })
  };
};

export const fetchReminders = () => {
  return (dispatch) => {
  	axios.get(baseurl + 'get', config)
    .then((res) => {
        return dispatch ({
			type: 'FETCH_REMINDER',
			reminders: res.data
		});
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    })
  };
};

export const deleteReminder = (id) => {
  return (dispatch) => {
  	console.log("`baseurl delete/{id}`",`${baseurl}delete/${id}`)
  	axios.delete(`${baseurl}delete/${id}`, config)
    .then((res) => {
        return dispatch ({
			type: 'REMOVE_REMINDER',
			_id: id
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