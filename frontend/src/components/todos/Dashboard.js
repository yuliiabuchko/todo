import React, { Component } from 'react';
import TodoCreate from './TodoCreate';
import TodoList from './TodoList';
import WeekList from "./WeekList";

class Dashboard extends Component {
  render() {
    return (
      <div className='ui container'>
        <TodoCreate />
        <TodoList />
        {/*<WeekList />*/}
      </div>
    );
  }
}

export default Dashboard;
