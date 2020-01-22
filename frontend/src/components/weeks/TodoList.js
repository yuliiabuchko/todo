import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import InfiniteLoader from 'react-infinite-loader'
import {getTodos, deleteTodo} from '../../actions/todos';
import {getWeeks, getWeek} from '../../actions/weeks';

import axios from "axios";
import {tokenConfig} from "../../actions/auth";

class TodoList extends Component {
    componentDidMount() {
        console.log("rerender")

        this.props.getWeeks();
        // this.loadItems();
    }

    shouldComponentUpdate(nextProps) {
        console.log("should rerender")
        return  this.props.todos !== nextProps.todos;

    }
    loadItems() {
        /* just simulating a load of more items from an api here */
        setTimeout(() => {
            let items = this.getItems();
            items = items.concat(this.getItems());
            this.setState({weeks: items})
        }, 1000)
    }

    handleVisit() {
        this.loadItems()
    }

    getItems() {
        return [{
            "id": 1,
            "monday": "2020-01-20",
            "owner": 1,
            "events": [{"id": 45, "name": "Event wol", "description": "aaa", "date": "2020-01-22", "owner": 1}],
            "todos": [{"id": 46, "day": "2020-01-22", "result": "S", "task": 2}, {
                "id": 2,
                "day": "2020-01-23",
                "result": "D",
                "task": 2
            }]
        }]
    }

    renderWeekTodos() {
        const res = {
            "id": 1,
            "monday": "2020-01-20",
            "owner": 1,
            "events": [{"id": 45, "name": "Event wol", "description": "aaa", "date": "2020-01-22", "owner": 1}],
            "todos": [{"id": 45, "day": "2020-01-22", "result": "S", "task": 2}, {
                "id": 46,
                "day": "2020-01-23",
                "result": "D",
                "task": 2
            }],
            "entries": [{"id": 1, "value": 1.0, "date": "2020-01-22", "statistic": 1}]
        };
        // console.log("res", res);
        // const {items} = res;
        // console.log("irems", items)
        let statuses = res.todos;
        console.log("statuses", statuses)

        const tasks = statuses.map(status => {
            return (
                // <div className='item' key={status.id}>
                //     <div className='content'>
                //          <Link to={`/edit/${status.id}`} className='header'>
                //          {status.day + " " + status.id}
                //          </Link>
                //          <div className='description'>{status.created_at}</div>
                //     </div>
                // </div>
                <div className='item' key={status.id}>
                    <div className='right floated content'>
                        <Link
                            to={`/delete/${status.id}`}
                            className='small ui negative basic button'
                        >
                            Delete
                        </Link>
                    </div>
                    <i className='large calendar outline middle aligned icon'/>
                    <div className='content'>
                        <Link to={`/edit/${status.id}`} className='header'>
                            {status.task}
                        </Link>
                        <div className='description'>{status.day}</div>
                    </div>
                </div>
            )
        });
        return tasks
    }

    render() {
        return (
            <div className='ui relaxed divided list' style={{marginTop: '2rem'}}>
                {this.renderWeekTodos()}
                <InfiniteLoader onVisited={() => this.handleVisit()}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todos: Object.values(state.todos),
    weeks: Object.values(state.weeks)
});

export default connect(
    mapStateToProps,
    {getTodos, getWeeks, getWeek, deleteTodo}
)(TodoList);
