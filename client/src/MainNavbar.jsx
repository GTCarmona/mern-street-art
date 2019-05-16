import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {NavLink as Nlink} from 'react-router-dom'

import api from './api';

export default class MainNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }
  handleLogoutClick(e) {
    api.logout()
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div>
        <Navbar class="navbar"color="faded" dark expand="sm">
          <NavbarBrand href="/" className="mr-auto"><NavLink to="/" exact>Mern Street Art</NavLink></NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar className="ml-auto">
            <NavItem>
              <NavLink tag={Nlink} to="/list">Street Art List</NavLink>
              </NavItem>
              <NavItem>
              <NavLink tag={Nlink} to="/map">Street Art Map</NavLink>
              </NavItem>
              <NavItem>
              <NavLink tag={Nlink} to="/new-street-art">Add a Street Artt</NavLink>
              </NavItem>
              <NavItem>
              {!api.isLoggedIn() && <NavLink tag={Nlink} to="/signup">Signup</NavLink>}
              </NavItem>
              <NavItem>
          {!api.isLoggedIn() && <NavLink tag={Nlink} to="/login">Login</NavLink>}
              </NavItem>
              <NavItem>
          {api.isLoggedIn() && <NavLink tag={Nlink} to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</NavLink>}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}