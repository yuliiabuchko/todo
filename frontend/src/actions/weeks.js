import axios from 'axios';
import {reset} from 'redux-form';
import {tokenConfig} from './auth';
import {GET_TODOS, GET_TODO, ADD_TODO, DELETE_TODO, EDIT_TODO, GET_WEEK, PROGRESS_TODO, ADD_STATUS} from './types';

function appendLeadingZeroes(n) {
    if (n <= 9) {
        return "0" + n;
    }
    return n
}

function getMonday(d) {
    var date = new Date(d);
    date.setDate(date.getDate() + (1 - date.getDay()) % 7);
    return date.getFullYear().toString() + "-" + appendLeadingZeroes(date.getMonth() + 1) + "-" + appendLeadingZeroes(date.getDate())
}

export const getWeek = (monday = '') => async (dispatch, getState) => {
    if (monday === '') monday = getMonday(new Date());
    const res = await axios.get('/api/weeks/?monday=' + monday, tokenConfig(getState));
    dispatch({
        type: GET_WEEK,
        payload: res.data
    });
};

export const createTodoStatus = (day, task_id) => async (dispatch, getState) => {
    let data = {day: day, result: "S", task: task_id};
    const res = await axios.post(
        '/api/statuses/',
        {...data},
        tokenConfig(getState)
    );
    dispatch({
        type: ADD_STATUS,
        payload: res.data
    });
};


export const progressTodo = (status_id) => async (dispatch, getState) => {
    const prev = await axios.get(`/api/statuses/${status_id}/`, tokenConfig(getState));

    switch (prev.data.result) {
        case "S":
            prev.data.result = "H";
            break;
        case "H":
            prev.data.result = "D";
            break;
        case "D":
            prev.data.result = "M";
            break;
        case "M":
            prev.data.result = "C";
            break;
        case "C":
            prev.data.result = "S";
            break;
    }
    const res = await axios.patch(
        `/api/statuses/${status_id}/`,
        prev.data,
        tokenConfig(getState)
    );
    const changed = await axios.get(`/api/statuses/${status_id}/`, tokenConfig(getState));
    dispatch({
        type: PROGRESS_TODO,
        payload: res.data
    });
};

