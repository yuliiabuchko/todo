import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addTodo} from '../../actions/todos';
import TodoForm from './TodoForm';

class TodoCreate extends Component {
    onSubmit = formValues => {
        this.props.addTodo(formValues);
    };

    render() {
        return (
            <div className="ui container">
                <div style={{marginTop: '2rem'}}>
                    <TodoForm destroyOnUnmount={false} onSubmit={this.onSubmit}/>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    {addTodo}
)(TodoCreate);
