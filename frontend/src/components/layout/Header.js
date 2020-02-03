import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

class Header extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth;

    const userLinks = (
      <>
        <DropdownButton variant="secondary" id="user-dropdown-button" title={user ? user.username : 'user'}>
          <Dropdown.Item as="button"><a onClick={this.props.logout}>Logout</a></Dropdown.Item>
        </DropdownButton>
        <DropdownButton variant="secondary" id="planner-dropdown-button" title="Planner">
          <Dropdown.Item href="/weeks">Weeks</Dropdown.Item>
          <Dropdown.Item href="#tasks">Tasks</Dropdown.Item>
          <Dropdown.Item href="#events">Events</Dropdown.Item>
        </DropdownButton>
      </>
    );

    const guestLinks = (
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-secondary">
          Menu
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/register">Register</Dropdown.Item>
          <Dropdown.Item href="/login">Login</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    return (
      <div className='ui inverted menu' style={{ borderRadius: '0' }}>
        {isAuthenticated ? userLinks : guestLinks}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
