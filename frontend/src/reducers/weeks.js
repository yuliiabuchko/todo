import _ from 'lodash';
import {
  GET_WEEK, PROGRESS_TODO, ADD_STATUS
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
