import axios from 'axios';
import { reset } from 'redux-form';
import history from '../history';
import { tokenConfig } from './auth';
import {GET_TODOS, GET_TODO, ADD_TODO, DELETE_TODO, EDIT_TODO, GET_WEEK} from './types';

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

export const getWeek = (monday) => async (dispatch, getState) => {
  const res = await axios.get('/api/weeks/?monday=' + monday, tokenConfig(getState));
  dispatch({
    type: GET_WEEK,
    payload: res.data
  });

  // return res.data;
};

export const progressTodo = (status_id) => async (dispatch, getState) => {
  console.log("progressing todo")
    const prev = await axios.get(`/api/statuses/${status_id}/`, tokenConfig(getState));
    console.log("prev", prev)
  prev.data.result = "D";
  // const res = await axios.patch(
  //   `/api/statuses/${status_id}/`,
  //   prev,
  //   tokenConfig(getState)
  // );
  // dispatch({
  //   type: PROGRESS_TODO,
  //   payload: res.data
  // });
  history.push('/');
};

