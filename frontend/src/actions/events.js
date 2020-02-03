import axios from 'axios';
import { reset } from 'redux-form';
import history from '../history';
import { tokenConfig } from './auth';
import { GET_EVENTS, GET_EVENT, ADD_EVENT, DELETE_EVENT, EDIT_EVENT } from './types';

// GET EVENTS
export const getEvents = () => async (dispatch, getState) => {
  const res = await axios.get('/api/events/', tokenConfig(getState));
  dispatch({
    type: GET_EVENTS,
    payload: res.data
  });
};

// GET EVENT
export const getEvent = id => async (dispatch, getState) => {
  const res = await axios.get(`/api/events/${id}/`, tokenConfig(getState));
  dispatch({
    type: GET_EVENT,
    payload: res.data
  });
};

// ADD EVENT
export const addEvent = formValues => async (dispatch, getState) => {
  const res = await axios.post(
    '/api/events/',
    { ...formValues },
    tokenConfig(getState)
  );
  dispatch({
    type: ADD_EVENT,
    payload: res.data
  });
  dispatch(reset('eventForm'));
};

// DELETE EVENT
export const deleteEvent = id => async (dispatch, getState) => {
  await axios.delete(`/api/events/${id}/`, tokenConfig(getState));
  dispatch({
    type: DELETE_EVENT,
    payload: id
  });
  history.push('/events')
};

// EDIT EVENT
export const editEvent = (id, formValues) => async (dispatch, getState) => {
  const res = await axios.patch(
    `/api/events/${id}/`,
    formValues,
    tokenConfig(getState)
  );
  dispatch({
    type: EDIT_EVENT,
    payload: res.data
  });
  history.push('/events')
};
