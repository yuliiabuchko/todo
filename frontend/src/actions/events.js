import axios from 'axios';
import { reset } from 'redux-form';
import history from '../history';
import { tokenConfig } from './auth';
import { GET_TODOS, GET_TODO, ADD_TODO, DELETE_TODO, EDIT_TODO } from './types';

// GET TODOS
export const getEvents = () => async (dispatch, getState) => {
  const res = await axios.get('/api/events/', tokenConfig(getState));
  dispatch({
    type: GET_TODOS,
    payload: res.data
  });
};

// GET TODO
export const getEvent = id => async (dispatch, getState) => {
  const res = await axios.get(`/api/events/${id}/`, tokenConfig(getState));
  dispatch({
    type: GET_TODO,
    payload: res.data
  });
};

// ADD TODO
export const addEvent = formValues => async (dispatch, getState) => {
  const res = await axios.post(
    '/api/events/',
    { ...formValues },
    tokenConfig(getState)
  );
  dispatch({
    type: ADD_TODO,
    payload: res.data
  });
  dispatch(reset('eventForm'));
};

// DELETE TODO
export const deleteEvent = id => async (dispatch, getState) => {
  await axios.delete(`/api/events/${id}/`, tokenConfig(getState));
  dispatch({
    type: DELETE_TODO,
    payload: id
  });
  history.push('/');
};

// EDIT TODO
export const editEvent = (id, formValues) => async (dispatch, getState) => {
  const res = await axios.patch(
    `/api/events/${id}/`,
    formValues,
    tokenConfig(getState)
  );
  dispatch({
    type: EDIT_TODO,
    payload: res.data
  });
  history.push('/');
};
