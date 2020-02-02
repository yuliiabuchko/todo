import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getTodos, deleteTodo, progressTodo, getWeek} from '../../actions/todos';
import axios from "axios";
import {tokenConfig} from "../../actions/auth";
import {DELETE_TODO} from "../../actions/types";
import history from "../../history";

class WeekList extends Component {
    componentDidMount() {
        this.props.getWeek('2020-01-20');
        this.props.getWeek('2020-01-13');
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

    prog(specific) {
        // this.props.progressTodo(specific.id)
    }

    renderForSpecificDay(day, statuses) {
        // console.log("rendering for day", day)
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
                <div className="ui button" onClick={() => this.prog(specific)}>
                    {specific.day}
                    {day.getDate()}
                    {specific.result}
                    {specific.status}
                </div>
                {/*<Link*/}
                {/*    to={``}*/}
                {/*    className='small ui basic button'*/}
                {/*    onClick={this.props.progressTodo(specific.id)}*/}

                {/*>*/}
                {/*    {specific.day}*/}
                {/*    {day.getDate()}*/}
                {/*    {specific.result}*/}
                {/*    {specific.status}*/}
                {/*</Link>*/}
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
        console.log("statusssss", statuses)
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
        console.log("weeeks", this.props.weeks)
        this.props.weeks.map(week => {
            console.log(week);
            week.tasks.map(task => {console.log(task)})
        })
        return (
            this.props.weeks.map(week => (week.tasks.map(task => (
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
            )))))
    }

    //
    render() {
        return (
            <div className='ui relaxed divided list' style={{marginTop: '2rem'}}>
                <h2>WEEK</h2>
                {this.renderWeek()}
            </div>
        );
    }

    // render() {
    //     // this.props.weeks.map(todo => (console.dir(todo)));
    //
    //     return (
    //         <>
    //         </>
    //     );
    // }
}

const mapStateToProps = state => ({
    weeks: Object.values(state.todos)
});

export default connect(
    mapStateToProps,
    {progressTodo, getWeek}
)(WeekList);
