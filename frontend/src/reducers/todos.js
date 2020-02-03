import _ from 'lodash';
import {
  GET_TODOS,
  GET_TODO,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO, GET_WEEK, PROGRESS_TODO, ADD_STATUS
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        ..._.mapKeys(action.payload, 'id')
      };
      case ADD_STATUS:
        state.map(stat => {
        stat.tasks.map(task =>{
          if(task.id === action.payload.task){
            task.statuses = task.statuses.concat(action.payload);
          }
        })
      });
    return state;
    case GET_WEEK:
      let arr = [action.payload];
      if (!Array.isArray(state)) {
        state = [];
      }
      return state.concat(arr);
    case PROGRESS_TODO:
      state.map(week => {
        week.tasks.map(task =>{
          if(task.id === action.payload.task){
            task.statuses.map(status => {
              if(status.id === action.payload.id) {
                status.result = action.payload.result;
              }
            })
          }
        })
      });
      return state;
    case GET_TODO:
    case ADD_TODO:
    // case ADD_STATUS:
    case EDIT_TODO:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case DELETE_TODO:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
