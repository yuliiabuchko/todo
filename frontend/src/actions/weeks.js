import axios from 'axios';
import { reset } from 'redux-form';
import history from '../history';
import { tokenConfig } from './auth';
import { GET_WEEKS, GET_WEEK } from './types';

// GET WEEKS
export const getWeeks = () => async (dispatch, getState) => {
  const res = await axios.get('/api/todos/', tokenConfig(getState));
  dispatch({
    type: GET_WEEKS,
    payload: res.data
  });
};

// GET WEEK
export const getWeek = id => async (dispatch, getState) => {
  const res = await axios.get(`/api/todos/${id}/`, tokenConfig(getState));
  dispatch({
    type: GET_WEEK,
    payload: res.data
  });
};