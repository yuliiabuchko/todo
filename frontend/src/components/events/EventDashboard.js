import React, { Component } from 'react';
import EventCreate from './EventCreate';
import EventList from './EventList';

class EventDashboard extends Component {
    render() {
        return (
           <div className='ui container'>
             <EventCreate />
             <EventList />
           </div>
        );
    }
}

export default EventDashboard;
