import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { register } from '../../actions/auth';
import { textField } from '../forms/TextField';

class RegisterForm extends Component {
  onSubmit = formValues => {
    this.props.register(formValues);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />;
    }
    return (
      <div className='ui container'>
        <div className='ui segment'>
          <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className='ui form'
          >
            <Field
              name='username'
              type='text'
              component={textField}
              label='Username'
              validate={[required, minLength3, maxLength15]}
            />
            <Field
              name='email'
              type='email'
              component={textField}
              label='Email'
              validate={required}
            />
            <Field
              name='password'
              type='password'
              component={textField}
              label='Password'
              validate={required}
            />
            <Field
              name='password2'
              type='password'
              component={textField}
              label='Confirm Password'
              validate={[required, passwordsMatch]}
            />
            <button className='ui primary button'>Register</button>
          </form>
          <p style={{ marginTop: '1rem' }}>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

const required = value => (value ? undefined : 'Required');

const minLength = min => value =>
  value && value.length < min
    ? `Must be at least ${min} characters`
    : undefined;

const minLength3 = minLength(3);

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

const maxLength15 = maxLength(15);

const passwordsMatch = (value, allValues) =>
  value !== allValues.password ? 'Passwords do not match' : undefined;

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

RegisterForm = connect(
  mapStateToProps,
  { register }
)(RegisterForm);

export default reduxForm({
  form: 'registerForm'
})(RegisterForm);
