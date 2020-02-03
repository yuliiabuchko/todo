import React, { Component } from 'react';
import { connect } from 'react-redux';

class StatsList extends Component {
    render() {
        return (
            <>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </>
        );
    }
}

export default connect()(StatsList);
