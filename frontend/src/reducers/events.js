import _ from 'lodash';
import {
  GET_EVENTS,
  GET_EVENT,
  ADD_EVENT,
  DELETE_EVENT,
  EDIT_EVENT
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        ..._.mapKeys(action.payload, 'id')
      };
    case GET_EVENT:
    case ADD_EVENT:
    case EDIT_EVENT:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case DELETE_EVENT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
