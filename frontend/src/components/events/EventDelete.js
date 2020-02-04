import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../layout/Modal';
import history from '../../history';
import { getEvent, deleteEvent } from '../../actions/events';

class EventDelete extends Component {
  componentDidMount() {
    this.props.getEvent(this.props.match.params.id);
  }

  renderContent() {
    if (!this.props.event) {
      return 'Are you sure you want to delete this event?';
    }
    return `Are you sure you want to delete the event: ${this.props.event.name}?`;
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <button
          onClick={() => this.props.deleteEvent(id)}
          className='ui negative button'
        >
          Delete
        </button>
        <Link to='/' className='ui button'>
          Cancel
        </Link>
      </Fragment>
    );
  }

  render() {
    return (
      <Modal
        title='Delete Event'
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => window.location.hash = "/events"}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  event: state.events[ownProps.match.params.id]
});

export default connect(
  mapStateToProps,
  { getEvent, deleteEvent }
)(EventDelete);
