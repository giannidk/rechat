import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavItem } from 'react-bootstrap';

const NavItemLink = ({to, label}) => {
    return (
        <LinkContainer to={to}>
            <NavItem>{label}</NavItem>
        </LinkContainer>
    );
}

export { NavItemLink };