import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Header from './layout/Header';
import TodoDashboard from './todos/TodoDashboard';
import TodoDelete from './todos/TodoDelete';
import TodoEdit from './todos/TodoEdit';

import EventDelete from './events/EventDelete';
import EventEdit from './events/EventEdit';
import EventDashboard from './events/EventDashboard';

import RegisterForm from './auth/RegisterForm';
import LoginForm from './auth/LoginForm';
import PrivateRoute from './common/PrivateRoute';

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';
import WeekList from "./todos/WeekList";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Header />
            <PrivateRoute exact path='/' component={TodoDashboard} />
            <PrivateRoute exact path='/events' component={EventDashboard} />
            <Route exact path='/todo/delete/:id' component={TodoDelete} />
            <Route exact path='/todo/edit/:id' component={TodoEdit} />
            <Route exact path='/event/delete/:id' component={EventDelete} />
            <Route exact path='/event/edit/:id' component={EventEdit} />
            <Route exact path='/register' component={RegisterForm} />
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/weeks' component={WeekList} />
        </HashRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
