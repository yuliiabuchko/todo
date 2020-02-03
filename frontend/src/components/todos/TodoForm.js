import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { textField } from '../forms/TextField';
import DatePicker, {
  FieldDatePicker,
  formatDates,
  normalizeDates,
} from '../forms/DatePicker';

class TodoForm extends Component {
  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    const btnText = `${this.props.initialValues ? 'Update' : 'Add'}`;
    var date = new Date();
    date = date.toISOString().substring(0,10);
    return (
      <div className='ui segment'>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className='ui form error'
        >
          <Field name='task' component={textField} label='Task' />
          <label>Starting day</label><br/>
          <FieldDatePicker  name="start_day" placeholder={date} />
          <button className='ui primary button'>{btnText}</button>
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.task) {
    errors.task = 'Please enter at least 1 character';
  }

  return errors;
};

export default reduxForm({
  form: 'todoForm',
  touchOnBlur: false,
  validate
})(TodoForm);
