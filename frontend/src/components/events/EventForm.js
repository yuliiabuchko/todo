import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import DatePicker, {
  FieldDatePicker,
  formatDates,
  normalizeDates,
} from '../forms/DatePicker';
import { textField } from '../forms/TextField';

class EventForm extends Component {
  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    var date = new Date();
    date = date.toISOString().substring(0,10);
    const btnText = `${this.props.initialValues ? 'Update' : 'Add'}`;
    return (
      <div className='ui segment'>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className='ui form error'
        >
          <Field name='name' component={textField} validate={required} label='Name of event' />
          <Field name='desc' component={textField} validate={required} label='Description' />
        
          <FieldDatePicker name="date" placeholder={date} />
          <button className='ui primary button'>{btnText}</button>
        
        </form>
      </div>
    );
  }
}

const required = value => (value ? undefined : 'Required');


export default reduxForm({
  form: 'eventForm',
  touchOnBlur: false
})(EventForm);
