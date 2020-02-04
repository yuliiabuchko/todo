import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getEvents, deleteEvent} from '../../actions/events';

class EventList extends Component {
    componentDidMount() {
        this.props.getEvents();
    }

    render() {
        return (
            <div className="ui container">

                <div className='ui relaxed divided list' style={{marginTop: '2rem'}}>
                    {this.props.events.map(eve => (
                        <div className='item' key={eve.id}>
                            <div className='right floated content'>
                                <Link
                                    to={`/event/delete/${eve.id}`}
                                    className='small ui negative basic button'
                                >
                                    Delete
                                </Link>
                            </div>
                            <i className='large calendar outline middle aligned icon'/>
                            <div className='content'>
                                <Link to={`/event/edit/${eve.id}`} className='header'>
                                    {eve.name}
                                </Link>
                                <div className='description'>{eve.desc}</div>
                                <div className='description'>{eve.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    events: Object.values(state.events)
});

export default connect(
    mapStateToProps,
    {getEvents, deleteEvent}
)(EventList);
