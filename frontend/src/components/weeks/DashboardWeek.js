import React, { Component } from 'react';
import TodoCreate from './TodoCreate';
import TodoList from './TodoList';

class DashboardWeek extends Component {
  render() {
    return (
      <div className='ui container'>
        <TodoCreate />
        <TodoList />
      </div>
    );
  }
}

export default DashboardWeek;
