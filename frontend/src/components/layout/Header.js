import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import Dropdown from 'react-bootstrap/Dropdown'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import Brand from 'react-bootstrap'
import DropdownButton from 'react-bootstrap/DropdownButton'

class Header extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth;

    const userLinks = (
      <>
              <NavDropdown title="Planner" id="basic-nav-dropdown">
                <NavDropdown.Item href="/#/">Tasks</NavDropdown.Item>
                <NavDropdown.Item href="/#/weeks">Weeks</NavDropdown.Item>
                <NavDropdown.Item href="/#/events">Events</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title={user ? user.username : 'user'} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={this.props.logout}>Logout</NavDropdown.Item>
              </NavDropdown>
      </>
    );

    const guestLinks = (
              <NavDropdown title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
              </NavDropdown>
    );
    return (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>To Do Planner</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="https://github.com/yuliiabuchko/todo">Repo</Nav.Link>
              {isAuthenticated ? userLinks : guestLinks}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
