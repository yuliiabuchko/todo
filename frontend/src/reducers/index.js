import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import todos from './todos';
import auth from './auth';
import events from './events';
import { LOGOUT_SUCCESS } from '../actions/types';

const appReducer = combineReducers({
  form: formReducer,
  todos,
  auth,
  events
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
