import React, { Component } from 'react';
import TodoCreate from './TodoCreate';
import TodoList from './TodoList';
import WeekList from "./WeekList";
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons'

class TodoDashboard extends Component {
  render() {
    return (
            <Parallax pages={2} ref={ref => (this.parallax = ref)}>
              <ParallaxLayer offset={0} speed={0} style={{ backgroundColor: '#f9dfd5' }} />
              <ParallaxLayer offset={0.6} speed={0.5} style={{ backgroundColor: '#f9f1d5' }} />
              <ParallaxLayer offset={1} speed={0.5} style={{ backgroundColor: '#eff9d5' }} />
              <ParallaxLayer offset={0.3} speed={-0.1}>
                <TodoList />
              </ParallaxLayer>
              <ParallaxLayer offset={0} speed={0.2}>
                <TodoCreate />
              </ParallaxLayer>
            </Parallax>
    );
  }
}

export default TodoDashboard;
