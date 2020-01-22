import _ from 'lodash';
import {
  GET_WEEKS,
  GET_WEEK
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_WEEKS:
      return {
        ...state,
        ..._.mapKeys(action.payload, 'id')
      };
    case GET_WEEK:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    default:
      return state;
  }
};
