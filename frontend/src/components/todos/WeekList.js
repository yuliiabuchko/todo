import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getTodos, deleteTodo, progressTodo} from '../../actions/todos';
import axios from "axios";
import {tokenConfig} from "../../actions/auth";
import {DELETE_TODO} from "../../actions/types";
import history from "../../history";

class WeekList extends Component {
    componentDidMount() {
        this.props.getTodos();
    }

    getAxiosToWork = monday => {

        // const token = "6d38cbd311ec19a2b804e153019f2df14bf5c96f1a5e84028e08d8ea025df2ff";
        //
        // // Headers
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // };
        //
        // if (token) {
        //     config.headers['Authorization'] = `Token ${token}`;
        // }
        // // const res = axios.get('/api/weeks/?monday=' + monday, tokenConfig());
        // const res = axios.get('/api/weeks/?monday=' + monday, config);
        //
        // console.log("axiosToWork", res);
        //
        // Promise.resolve(res).then((jsonResults) => {
        //     console.log(jsonResults.data);
        // })
        // console.log("axiosToWork theb datat:", res.PromiseValue);

        return {
            "monday": "2020-01-22",
            "events": [{"id": 1, "name": "Event wol", "description": "aaa", "date": "2020-01-22", "owner": 1}],
            "tasks": [{
                "id": 68,
                "task": "wol task",
                "is_done": true,
                "statuses": [{"id": 1, "day": "2020-01-22", "result": "S", "task": 2},
                    {"id": 3, "day": "2020-01-23", "result": "D", "task": 2},
                    {"id": 4, "day": "2020-01-24", "result": "D", "task": 2},
                    {"id": 5, "day": "2020-01-25", "result": "D", "task": 2},
                    {"id": 6, "day": "2020-01-26", "result": "D", "task": 2}]
            }, {
                "id": 69,
                "task": "wol task 3",
                "is_done": true,
                "statuses": [{"id": 2, "day": "2020-01-22", "result": "S", "task": 3}]
            }],
            "statistics": [{
                "id": 1,
                "name": "Powinno być",
                "unit": "h",
                "entries": [{"id": 1, "value": 1.0, "date": "2020-01-22", "statistic": 1}]
            }]
        }
    }


    renderSwitch(param) {
        switch (param) {
            case 'S':
                return 'Selected';
            case 'D':
                return 'Done';
            default:
                return 'foo';
        }
    }

    getDaysArray = function (s, e) {
        for (var a = [], d = s; d <= e; d.setDate(d.getDate() + 1)) {
            a.push(new Date(d));
        }
        return a;
    };


    renderStatusButton(status) {
        return (<List divided relaxe>
            <List.Item>
                <Link
                    to={``}
                    className='small ui basic button'
                    onClick={this.props.progressTodo}
                >
                    {status.day}
                    {this.renderSwitch(status.result)}
                </Link>
                {/*<button className="ui icon button"><i aria-hidden="true" className="world icon"></i></button>*/}
            </List.Item></List>)
    }

    renderForSpecificDay(day, statuses) {
        console.log("rendering for day", day)
        let specific;
        let res = statuses.map(
            (status) => {
                if (new Date(status.day).getDay() === day.getDay()) {
                    specific = status
                }
                return new Date(status.day).getDay() === day.getDay()
            }
        );
        let has = (res.indexOf(true)) !== -1;
        if (has) {
            return (<div className='right floated content'>
                <Link
                    to={``}
                    className='small ui basic button'
                    onClick={this.props.progressTodo(specific.id)}

                >
                    {specific.day}
                    {day.getDate()}
                    {specific.result}
                    {specific.status}
                </Link>
                {/*<button className="ui icon button"><i aria-hidden="true" className="world icon"></i></button>*/}
            </div>)
        } else {
            return (
                <div className='right floated content'>
                    <Link
                        to={``}
                        className='small ui basic button'
                    >
                        {day.getDay()}
                        NODATA
                    </Link>
                    {/*<button className="ui icon button"><i aria-hidden="true" className="world icon"></i></button>*/}
                </div>
            )
        }
    }

    renderStatusesButtons(statuses) {
        let monday = '2020-01-20';
        let sunday = '2020-01-26';
        let days = this.getDaysArray(new Date(monday), new Date(sunday));
        return (
            days.map(day => (
                this.renderForSpecificDay(day, statuses)
            ))
        )
    }

    renderWeek() {
        let monday = '2020-01-20';
        console.log("before");
        let res = this.getAxiosToWork(monday);
        return (
            res.tasks.map(task => (
                <div className='item' key={task.id}>
                    {this.renderStatusesButtons(task.statuses)}
                    <div className='right floated content'>
                        <Link
                            to={`/delete/${task.id}`}
                            className='small ui negative basic button'
                        >
                            Delete
                        </Link>
                    </div>
                    <i className='large calendar outline middle aligned icon'/>
                    <div className='content'>
                        <Link to={`/edit/${task.id}`} className='header'>
                            {task.task}
                        </Link>
                        <div className='description'>{task.created_at}</div>
                    </div>
                </div>
            )))
    }

    render() {
        return (
            <div className='ui relaxed divided list' style={{marginTop: '2rem'}}>
                <h2>WEEK</h2>
                {this.renderWeek()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todos: Object.values(state.todos)
});

export default connect(
    mapStateToProps,
    {getTodos, deleteTodo, progressTodo}
)(WeekList);
