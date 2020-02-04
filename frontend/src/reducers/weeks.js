import _ from 'lodash';
import {
  GET_WEEK, CLEAR_AND_GET_WEEK, PROGRESS_TODO, ADD_STATUS
} from '../actions/types';

function appendZeroes(n) {
    if (n <= 9) {
        return "0" + n;
    }
    return n
}

function getMonday(d) {
        d = new Date(d);
        let day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        let date = new Date(d.setDate(diff));
        return date.getFullYear().toString() + "-" + appendZeroes(date.getMonth() + 1) + "-" + appendZeroes(date.getDate());
}

export default (state = {}, action) => {
  switch (action.type) {
      case ADD_STATUS:
        state.map(stat => {
            if(getMonday(action.payload.day) === stat.monday) {
            stat.tasks.map(task =>{
              if(task.id === action.payload.task){
                task.statuses = task.statuses.concat(action.payload);
              }
        })
            }
      });
    return state;
    case CLEAR_AND_GET_WEEK:
      state = [];
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
