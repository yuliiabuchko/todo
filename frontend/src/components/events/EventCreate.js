import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEvent } from '../../actions/events';
import EventForm from './EventForm';

class EventCreate extends Component {
  onSubmit = formValues => {
    this.props.addEvent(formValues);
  };

  render() {
    return (
      <div style={{ marginTop: '2rem' }}>
        <EventForm destroyOnUnmount={false} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { addEvent }
)(EventCreate);
