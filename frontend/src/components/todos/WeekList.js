import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {progressTodo, getWeek, createTodoStatus} from '../../actions/todos';
import InfiniteScroll from "react-infinite-scroller";
import equal from 'fast-deep-equal'


class WeekList extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         items: 1,
    //         loading: false
    //     };
    // }

    shouldComponentUpdate(nextProps, nextState) {
        // return nextProps.weeks !== this.props.weeks;
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAA", nextProps.weeks[1], this.props.weeks[1])
        return true;

    }

    componentDidMount() {
        // this.props.getWeek();
        this.props.getWeek('2020-01-27');
        this.props.getWeek('2020-01-20');
        // this.props.getWeek('2020-01-13');
        this.props.getWeek('2020-01-06');
    }

    getDaysArray = function (s, e) {
        for (var a = [], d = s; d <= e; d.setDate(d.getDate() + 1)) {
            a.push(new Date(d));
        }
        return a;
    };


    progress(specific) {
        console.log("progressing")
        this.props.progressTodo(specific.id)

    }

    select(day, task) {
        console.log("selecting")
        let day_formatted = day.getFullYear() + "-" + this.appendLeadingZeroes(day.getMonth() + 1) + "-" + this.appendLeadingZeroes(day.getDate())
        this.props.createTodoStatus(day_formatted, task)

        // this.forceUpdate()
        // console.log("force after select")
        // this.forceUpdate()
        // console.log("after force after select")

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
            return (<div className='left floated content'>
                <Link
                    to={`/weeks`}
                    className='ui icon button'
                    style={{backgroundColor: 'transparent'}}
                    onClick={() => this.progress(specific)}
                >
                    {this.specificButton(specific.result)}
                </Link>
            </div>)
        } else {
            return (
                <div className='left floated content'>
                    <Link
                        to={`/weeks`}
                        className='ui icon button'
                        style={{backgroundColor: 'transparent'}}
                        onClick={() => this.select(day, task_id)}
                    >
                        <i className="square outline icon"/>
                    </Link>
                </div>
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
        // console.log("statusssss", statuses)
        // let monday = '2020-01-20';
        let sunday = this.getSunday(monday);
        // console.log("sunday", sunday, monday)
        let days = this.getDaysArray(new Date(monday), new Date(sunday));
        return (
            days.map(day => (
                this.renderForSpecificDay(day, statuses, task_id)
            ))
        )
    }

    headerr() {
        return <h2>WEK</h2>
    }

    weekPart(week) {
        let monday = week.monday;
        let res = [<h2>{monday}</h2>]
        res.push(week.tasks.map(task => (
            <div className='item' key={task.id}>
                {this.renderStatusesButtons(task.statuses, task.id, monday)}
                {/*<div className='right floated content'>*/}
                {/*    <Link*/}
                {/*        to={`/delete/${task.id}`}*/}
                {/*        className='small ui negative basic button'*/}
                {/*    >*/}
                {/*        Delete*/}
                {/*    </Link>*/}
                {/*</div>*/}
                {/*<i className='large calendar outline middle aligned icon'/>*/}
                <div className=' content'>
                    {/*<Link to={`/edit/${task.id}`} className='header'>*/}
                    {task.task}
                    {/*</Link>*/}
                    {/*<div className='description'>{task.created_at}</div>*/}
                </div>
            </div>
        )))
        return res
    }

    renderWeeks() {
        return (
            this.props.weeks.map(week => this.weekPart(week)
            ))
    }

    render() {
        console.log("render week in weeklist");
        return (
            <div className='ui relaxed divided list' style={{marginTop: '2rem'}}>
                {this.renderWeeks()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: false,
    weeks: Object.values(state.todos)
});

export default connect(
    mapStateToProps,
    {progressTodo, getWeek, createTodoStatus}
)(WeekList);
