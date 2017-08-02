import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../firebase';
import { getLoggedInState } from '../actions';

const PrivateRoute = ({ component: Component, ...rest }) => {

  
//rest.getLoggedInState();

  const { loggedIn } = rest;
  console.log( 'LOGGED IN?????: ', loggedIn );


  return (
    
   
    <Route {...rest} render={props => (
      loggedIn ? (<Component {...props} />) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
    )} />


  )
}



function mapStateToProps({auth}){
    return {
        loggedIn: auth.loggedIn
    }
}
export default connect(mapStateToProps, { getLoggedInState })(PrivateRoute);
