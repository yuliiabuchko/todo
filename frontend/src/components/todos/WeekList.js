import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {progressTodo, getWeek, createTodoStatus} from '../../actions/weeks';
import InfiniteScroll from "react-infinite-scroll-component";


class WeekList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMore: true,
        };
    }

    getEarliestMondayFromProps() {
        let earliest = this.getMonday(new Date());
        this.props.weeks.map((week) => {
            if (week.monday <= earliest) {
                earliest = week.monday
            }
        });
        return earliest;
    }


    fetchMoreData = () => {
        if (this.getEarliestMondayFromProps().startsWith("2018")) {
            this.setState({hasMore: false})
            return;
        }
        
        setTimeout(() => {
            this.props.getWeek(this.prevMonday(this.getEarliestMondayFromProps()));
        }, 500);
    };

    appendZeroes(n) {
        if (n <= 9) {
            return "0" + n;
        }
        return n
    }

    getMonday(d) {
        d = new Date(d);
        let day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        let date = new Date(d.setDate(diff));
        return date.getFullYear().toString() + "-" + this.appendZeroes(date.getMonth() + 1) + "-" + this.appendZeroes(date.getDate());
    }

    prevMonday(thisMonday) {
        if (thisMonday === undefined) {
            thisMonday = new Date();
        }
        let date = new Date(thisMonday);
        date.setDate(date.getDate() - 7 + (1 - date.getDay()) % 7);
        return date.getFullYear().toString() + "-" + this.appendZeroes(date.getMonth() + 1) + "-" + this.appendZeroes(date.getDate())
    }

    componentDidMount() {
        this.props.getWeek();
    }

    getDaysArray = function (s, e) {
        let a = [];
        for (let d = s; d <= e; d.setDate(d.getDate() + 1)) {
            a.push(new Date(d));
        }
        return a;
    };

    progress(specific) {
        this.props.progressTodo(specific.id, specific.result);
        setTimeout(() => {this.setState({time: Date.now()});}, 100);
    }

    select(day, task) {
        let day_formatted = day.getFullYear() + "-" + this.appendZeroes(day.getMonth() + 1) + "-" + this.appendZeroes(day.getDate())
        this.props.createTodoStatus(day_formatted, task)
        setTimeout(() => {this.setState({time: Date.now()});}, 100);
    }

    specificButton(result, day) {
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
            return (<td key={"td_day" + day + "task" + task_id} className="right aligned collapsing">
                <Link
                    to={`/weeks`}
                    className='ui big icon button'
                    key={task_id + day.getDate() + specific.result}
                    style={{backgroundColor: 'transparent'}}
                    onClick={() => this.progress(specific)}
                >
                    {this.specificButton(specific.result, day)}
                </Link>
            </td>)
        } else {
            return (
                <td key={"td_day" + day} className="right aligned collapsing">
                    <Link
                        to={`/weeks`}
                        className='ui big icon button'
                        key={task_id + day.getDate()}
                        style={{backgroundColor: 'transparent'}}
                        onClick={() => this.select(day, task_id)}
                    >
                        <i key={task_id + day.getDate() + "icon"} className="square outline icon"/>
                    </Link>
                </td>
            )
        }
    }

    getSunday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() + (7 - day) % 7; // adjust when day is sunday
        var r = new Date(d.setDate(diff));
        return r.getFullYear() + "-" + this.appendZeroes(r.getMonth() + 1) + "-" + this.appendZeroes(r.getDate())

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

    renderWeekWithNoTasks(monday) {
        let res = [];
        res.push(<div key={monday + "ui task center div header"} className="ui center aligned header"><h3>Week from {monday}</h3></div>)
        res.push(<div key={monday + "ui task container"} className="ui container"><div className="ui visible message">
            <p>No tasks for this week</p>
        </div></div>);
        return res;
    }

    renderWeekWithNoEvents(monday) {
        let res = [];
        res.push(<div key={monday + "ui event container"} className="ui container"><div className="ui visible message">
            <p>No events for this week</p>
        </div></div>)
        return res;
    }


    renderTaskTable(week) {
        if (week.tasks.length === 0) {
            return this.renderWeekWithNoTasks(week.monday);
        }

        let res = [];
        res.push(<div key={week + "ui task center div header"} className="ui center aligned header"><h3>Week from {week.monday}</h3></div>)
        res.push(
            <div key={week + "ui task container"} className="ui container">
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
                            {this.renderStatusesButtons(task.statuses, task.id, week.monday)}
                            <td style={{verticalAlign: "middle"}}>
                                {task.task}
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        );
        return res
    }


    renderEventsList(week) {
        if (week.events.length === 0) {
            return this.renderWeekWithNoEvents(week.monday);
        }
        return (
            <div key={Math.random()} className="ui container">
                <div className='ui relaxed divided list' style={{marginTop: '2rem'}}>
                    {week.events.map(eve => (
                        <div className='item' key={eve.id}>
                            <i className='large calendar outline middle aligned icon'/>
                            <div className='content'>
                                <Link to={`/event/edit/${eve.id}`} className='header'>
                                    {eve.name}
                                </Link>
                                <div className='description'>{eve.desc}</div>
                                <div className='description'>{eve.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    renderAddingButtons() {
        return (
            <div key="adding buttons div" className="ui container" style={{paddingBottom: 10, paddingTop: 10}}>
                <Link to='/'>
                    <button className="ui right floated small basic button" >Add task</button>
                </Link>
                <Link to='/events'>
                <button className="ui left floated small basic button">Add event</button>
                </Link>
            </div>

        )
    }

    weekPart(week) {
        let res = [];
        res.push(this.renderTaskTable(week));
        res.push(this.renderEventsList(week));
        res.push(this.renderAddingButtons());
        return res;

    }

    render() {
        return (
            <div>
                <InfiniteScroll
                    dataLength={this.props.weeks.length} //This is important field to render the next data
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={<div className="ui center aligned header"><h4>Loading...</h4></div>}
                    endMessage={
                        <p style={{textAlign: "center"}}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {this.props.weeks.map(week => this.weekPart(week))}
                </InfiniteScroll>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    weeks: Object.values(state.weeks),
});

export default connect(
    mapStateToProps,
    {progressTodo, getWeek, createTodoStatus}
)(WeekList);
