import axios from 'axios';
import { reset } from 'redux-form';
import history from '../history';
import { tokenConfig } from './auth';
import {GET_TODOS, GET_TODO, ADD_TODO, DELETE_TODO, EDIT_TODO, GET_WEEK, PROGRESS_TODO, ADD_STATUS} from './types';

// GET TODOS
export const getTodos = () => async (dispatch, getState) => {
  const res = await axios.get('/api/todos/', tokenConfig(getState));
  dispatch({
    type: GET_TODOS,
    payload: res.data
  });
};

// GET TODO
export const getTodo = id => async (dispatch, getState) => {
  const res = await axios.get(`/api/todos/${id}/`, tokenConfig(getState));
  dispatch({
    type: GET_TODO,
    payload: res.data
  });
};

// ADD TODO
export const addTodo = formValues => async (dispatch, getState) => {
  const res = await axios.post(
    '/api/todos/',
    { ...formValues },
    tokenConfig(getState)
  );
  dispatch({
    type: ADD_TODO,
    payload: res.data
  });
  dispatch(reset('todoForm'));
};

// DELETE TODO
export const deleteTodo = id => async (dispatch, getState) => {
  console.log("state in deleteTodo", getState)
  await axios.delete(`/api/todos/${id}/`, tokenConfig(getState));
  dispatch({
    type: DELETE_TODO,
    payload: id
  });
  history.push('/');
};

// EDIT TODO
export const editTodo = (id, formValues) => async (dispatch, getState) => {
  const res = await axios.patch(
    `/api/todos/${id}/`,
    formValues,
    tokenConfig(getState)
  );
  dispatch({
    type: EDIT_TODO,
    payload: res.data
  });
  history.push('/');
};

function appendLeadingZeroes(n) {
        if (n <= 9) {
            return "0" + n;
        }
        return n
    }
function getMonday(d) {
  var date = new Date(d);
    var day = date.getDay();
    var prevMonday;
    if(date.getDay() === 0){
        prevMonday = new Date().setDate(date.getDate() - 7);
    }
    else{
        prevMonday = new Date().setDate(date.getDate() - day);
    }
    return prevMonday.getFullYear() + "-" + this.appendLeadingZeroes(prevMonday.getMonth() + 1) + "-" + this.appendLeadingZeroes(prevMonday.getDate())
}

export const getWeek = (monday='') => async (dispatch, getState) => {
  if (monday === '') monday = getMonday(new Date());
  const res = await axios.get('/api/weeks/?monday=' + monday, tokenConfig(getState));
  dispatch({
    type: GET_WEEK,
    payload: res.data
  });
};

export const createTodoStatus = (day, task_id) => async (dispatch, getState) => {
    let data = {day: day, result: "S", task: task_id};
    const res = await axios.post(
    '/api/statuses/',
        {...data},
    tokenConfig(getState)
  );
    dispatch({
    type: ADD_STATUS,
    payload: res.data
  });
        history.push('/weeks');

};


export const progressTodo = (status_id) => async (dispatch, getState) => {
    const prev = await axios.get(`/api/statuses/${status_id}/`, tokenConfig(getState));

    switch (prev.data.result) {
    case "S":
        prev.data.result = "H";
        break;
    case "H":
        prev.data.result = "D";
        break;
    case "D":
        prev.data.result = "M";
        break;
    case "M":
        prev.data.result = "C";
        break;
    case "C":
        prev.data.result = "S";
        break;
  }
    const res = await axios.patch(
    `/api/statuses/${status_id}/`,
      prev.data,
    tokenConfig(getState)
  );
    const changed = await axios.get(`/api/statuses/${status_id}/`, tokenConfig(getState));
    dispatch({
    type: PROGRESS_TODO,
    payload: res.data
  });
  // history.push('/weeks');
    history.push('/weeks');
};

