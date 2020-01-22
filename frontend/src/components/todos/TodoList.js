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
        this.props.getTodos();
        console.log("rerender todo")
        // this.loadItems();
    }

    loadItems() {
        /* just simulating a load of more items from an api here */
        setTimeout(() => {
            let items = this.weeks.slice();
            items = items.concat(this.getItems())
            this.setState({weeks: items})
        }, 1000)
    }

    handleVisit() {
        this.loadItems()
    }

    getItems() {
        return {
            "id": 1,
            "monday": "2020-01-20",
            "owner": 1,
            "events": [{"id": 1, "name": "Event wol", "description": "aaa", "date": "2020-01-22", "owner": 1}],
            "todos": [{"id": 1, "day": "2020-01-22", "result": "S", "task": 2}, {
                "id": 2,
                "day": "2020-01-23",
                "result": "D",
                "task": 2
            }]
        }
    }

    renderWeekTodos() {
        const res = {
            "monday": "2020-01-22",
            "events": [{"id": 1, "name": "Event wol", "description": "aaa", "date": "2020-01-22", "owner": 1}],
            "tasks": [{
                "id": 45,
                "task": "wol task",
                "is_done": true,
                "statuses": [{"id": 1, "day": "2020-01-22", "result": "S", "task": 2}]
            }]
        };
        // console.log("res", res);
        // const {items} = res;
        // console.log("irems", items)
        let tasksGetted = res.tasks;
        console.log("statuses", tasksGetted)

        const tasks = tasksGetted.map(task => {
            return (
                // <div className='item' key={status.id}>
                //     <div className='content'>
                //          <Link to={`/edit/${status.id}`} className='header'>
                //          {status.day + " " + status.id}
                //          </Link>
                //          <div className='description'>{status.created_at}</div>
                //     </div>
                // </div>
                <div className='item' key={task.id}>
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
                        <div className='description'>{task.is_done}</div>
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
                {/*<InfiniteLoader onVisited={() => this.handleVisit()}/>*/}
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
