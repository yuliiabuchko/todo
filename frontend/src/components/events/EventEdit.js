import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvent, editEvent } from '../../actions/events';
import EventForm from './EventForm';

class EventEdit extends Component {
  componentDidMount() {
    this.props.getEvent(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editEvent(this.props.match.params.id, formValues);
  };

  render() {
    // if (!this.props.event) {
    //   return <div>Loading...</div>;
    // }
    return (
      <div className='ui container'>
        <h2 style={{ marginTop: '2rem' }}>Edit Event</h2>
        <EventForm
          initialValues={_.pick(this.props.event, 'task')}
          enableReinitialize={true}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  event: state.events[ownProps.match.params.id]
});

export default connect(
  mapStateToProps,
  { getEvent, editEvent }
)(EventEdit);
