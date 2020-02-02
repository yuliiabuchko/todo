import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getTodos, deleteTodo} from '../../actions/todos';
import axios from "axios";
import {tokenConfig} from "../../actions/auth";
import {DELETE_TODO} from "../../actions/types";
import history from "../../history";

class WeekList extends Component {
    componentDidMount() {
        this.props.getTodos();
    }

    getAxiosToWork = monday => {
        console.log("axios")

        const token = "6f882e0cb79641cd2f0655bcc33fb3389e5605538b41d88abc1e08ea4e43bf4e";

        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        // const res = axios.get('/api/weeks/?monday=' + monday, tokenConfig());
        const res = axios.get('/api/weeks/?monday=' + monday, config);

        console.log("axiosToWork", res);

        Promise.resolve(res).then((jsonResults) => {
            console.log(jsonResults.data);
        })
        // console.log("axiosToWork theb datat:", res.PromiseValue);


    }


    renderWeek() {
        let monday = '2020-01-20';
        console.log("before");
        this.getAxiosToWork(monday);
        return (
            this.props.todos.map(todo => (
                <div className='item' key={todo.id}>
                    <div className='right floated content'>
                        <Link
                            to={`/delete/${todo.id}`}
                            className='small ui negative basic button'
                        >
                            Delete
                        </Link>
                    </div>
                    <i className='large calendar outline middle aligned icon'/>
                    <div className='content'>
                        <Link to={`/edit/${todo.id}`} className='header'>
                            {todo.task}
                        </Link>
                        <div className='description'>{todo.created_at}</div>
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
    {getTodos, deleteTodo}
)(WeekList);
