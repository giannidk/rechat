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
                  <LinkContainer to="/dashboard"><a>reChat</a></LinkContainer>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <NavItemLink to="/home" label="Home" />  
                  <NavItemLink to="/login" label="Login" />  
                  <NavItemLink to="/dashboard" label="Dashboard" />                 
                  <NavItemLink to="/settings" label="Settings" />
                </Nav>
                <Nav pullRight>                  
                  <NavItemLink to="/chatroom" label="chat room" />                 
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        )
    }
}

export { Topnav };
