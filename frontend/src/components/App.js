import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';
import Header from './layout/Header';
import Dashboard from './todos/Dashboard';
import TodoDelete from './todos/TodoDelete';
import TodoEdit from './todos/TodoEdit';

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
        <Router history={history}>
          <Header />
          <Switch>
            <Route exact path='/weeks' component={WeekList} />
            <Route exact path='/delete/:id' component={TodoDelete} />
            <Route exact path='/edit/:id' component={TodoEdit} />
            <Route exact path='/register' component={RegisterForm} />
            <Route exact path='/login' component={LoginForm} />
                        <PrivateRoute exact path='/' component={Dashboard} />

          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
