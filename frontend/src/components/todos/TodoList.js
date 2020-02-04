import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTodos, deleteTodo } from '../../actions/todos';

class TodoList extends Component {
  componentDidMount() {
    this.props.getTodos();
  }

  render() {
    return (
                    <div className="ui container" style={{background: "none"}}>

      <div className='ui relaxed divided list' style={{ marginTop: '2rem' }}>
        {this.props.todos.map(todo => (
          <div className='item' key={todo.id}>
            <div className='right floated content'>
              <Link
                to={`/todo/delete/${todo.id}`}
                className='small ui negative basic button'
              >
                Delete
              </Link>
            </div>
            <i className='large calendar outline middle aligned icon' />
            <div className='content'>
              <Link to={`/todo/edit/${todo.id}`} className='header'>
                {todo.task}
              </Link>
              <div className='description'>{todo.is_done == "True" ? "Done" : "To do"}</div>
            </div>
          </div>
        ))}
      </div></div>
    );
  }
}

const mapStateToProps = state => ({
  todos: Object.values(state.todos)
});

export default connect(
  mapStateToProps,
  { getTodos, deleteTodo }
)(TodoList);
