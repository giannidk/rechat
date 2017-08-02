import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { 
  Navbar, 
  Nav,
 } from 'react-bootstrap';
import { NavItemLink } from './'

class Topnav extends Component{  
  
    render() {
        return (
            <Navbar inverse collapseOnSelect fixedTop>
              <Navbar.Header>
                <Navbar.Brand>
                  <LinkContainer to="/dashboard"><a>React Auth</a></LinkContainer>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <NavItemLink to="/login" label="Login" />  
                  <NavItemLink to="/dashboard" label="Dashboard" />                 
                </Nav>
                <Nav pullRight>                  
                  <NavItemLink to="/settings" label="Settings" />
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        )
    }
}

export { Topnav };
