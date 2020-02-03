import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {progressTodo, getWeek, createTodoStatus} from '../../actions/todos';
import InfiniteScroll from "react-infinite-scroller";


class WeekList extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         items: 1,
    //         loading: false
    //     };
    // }

    // fetchMoreData = () => {
    //     setTimeout(() => {
    //         // this.props.getWeek('2020-01-27')
    //             this.props.items = this.props.weeks
    //
    //     }, 500);
    // };

    componentDidMount() {
        this.props.getWeek();
        this.props.getWeek('2020-01-27');
        this.props.getWeek('2020-01-20');
        // this.props.getWeek('2020-01-13');
        // this.props.getWeek('2020-01-06');
    }

    getDaysArray = function (s, e) {
        for (var a = [], d = s; d <= e; d.setDate(d.getDate() + 1)) {
            a.push(new Date(d));
        }
        return a;
    };

    progress(specific) {
        this.props.progressTodo(specific.id)
    }

    select(day, task) {
        let day_formatted = day.getFullYear() + "-" + this.appendLeadingZeroes(day.getMonth() + 1) + "-" + this.appendLeadingZeroes(day.getDate())
        this.props.createTodoStatus(day_formatted, task)
    }

    specificButton(result) {
        switch (result) {
            case "S":
                return (<i className="star outline icon"/>);
            case "H":
                return (<i className="star half icon"/>);
            case "D":
                return (<i className="star icon"/>);
            case "M":
                return (<i className="chevron right icon"/>);
            case "C":
                return (<i className="x icon"/>);
            default:
                return (<i className="square  icon"/>)
        }
    }

    renderForSpecificDay(day, statuses, task_id) {
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
            return (<td class="right aligned collapsing">
                <Link
                    to={`/weeks`}
                    className='ui big icon button'
                    key={task_id + day.getDate()}
                    style={{backgroundColor: 'transparent'}}
                    onClick={() => this.progress(specific)}
                >
                    {this.specificButton(specific.result)}
                </Link>
            </td>)
        } else {
            return (
                <td class="right aligned collapsing">
                    <Link
                        to={`/weeks`}
                        className='ui big icon button'
                        key={task_id + day.getDate()}
                        style={{backgroundColor: 'transparent'}}
                        onClick={() => this.select(day, task_id)}
                    >
                        <i className="square outline icon"/>
                    </Link>
                </td>
            )
        }
    }

    appendLeadingZeroes(n) {
        if (n <= 9) {
            return "0" + n;
        }
        return n
    }

    getSunday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() + (7 - day) % 7; // adjust when day is sunday
        // console.log(d, diff)
        var r = new Date(d.setDate(diff));
        return r.getFullYear() + "-" + this.appendLeadingZeroes(r.getMonth() + 1) + "-" + this.appendLeadingZeroes(r.getDate())

    }

    renderStatusesButtons(statuses, task_id, monday) {
        let sunday = this.getSunday(monday);
        let days = this.getDaysArray(new Date(monday), new Date(sunday));
        return (
            days.map(day => (
                this.renderForSpecificDay(day, statuses, task_id)
            ))
        )
    }

    weekPart(week) {
        let monday = week.monday;
        let res = [];
        res.push(<h4>Week form {monday}</h4>)
        res.push(
            <table className="ui small table">
                <thead>
                <tr>
                    <th className="center aligned">M</th>
                    <th className="center aligned">T</th>
                    <th className="center aligned">W</th>
                    <th className="center aligned">T</th>
                    <th className="center aligned">F</th>
                    <th className="center aligned">S</th>
                    <th className="center aligned">S</th>
                    <th>Task</th>
                </tr>
                </thead>
                <tbody>
                {week.tasks.map(task => (
                    <tr key={task.id}>
                        {this.renderStatusesButtons(task.statuses, task.id, monday)}
                        <td>
                            {task.task}

                        </td>
                    </tr>))}
                </tbody>
            </table>
        );
        return res
    }

    renderWeeks() {
        return (
            this.props.weeks.map(week => this.weekPart(week))
        )
    }


    render() {
        return (
            this.renderWeeks()
        )
    }
}

const mapStateToProps = state => ({
    weeks: Object.values(state.todos)
});

export default connect(
    mapStateToProps,
    {progressTodo, getWeek, createTodoStatus}
)(WeekList);
