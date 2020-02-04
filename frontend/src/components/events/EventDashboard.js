import React, { Component } from 'react';
import EventCreate from './EventCreate';
import EventList from './EventList';
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons'

class EventDashboard extends Component {
    render() {
        return (
            <Parallax pages={2} ref={ref => (this.parallax = ref)}>
              <ParallaxLayer offset={0} speed={0} style={{ backgroundColor: '#d5fbe1' }} />
            
              <ParallaxLayer offset={0.6} speed={0.5} style={{ backgroundColor: '#d5fbf4' }} />
              <ParallaxLayer offset={1} speed={0.5} style={{ backgroundColor: '#d5effb' }} />
              <ParallaxLayer offset={0} speed={0.2}>
                  <EventCreate />
              </ParallaxLayer>
              <ParallaxLayer offset={0.7} speed={-0.1}>
                  <EventList />
              </ParallaxLayer>

            </Parallax>
        );
    }
}

export default EventDashboard;
