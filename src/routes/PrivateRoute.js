import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import { auth } from '../firebase';
import { Spinner } from '../components/common';

class PrivateRoute extends Component {
  componentWillMount(){
    //alert('Receiving...');
  }

  render() {
    const { loggedIn, user } = this.props;
    console.log(loggedIn, user);
    console.log(typeof loggedIn);


    if (!loggedIn) {
      return (<Spinner />);
    }  

    if (loggedIn === false) {

      return (
        <Redirect to={{
          pathname: '/login',
          state: { from: this.props.location }
        }} />
      )
    }
    return (
      <Route {...this.props} />
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    loggedIn: auth.loggedIn,
    loading: auth.loading,
    user: auth.user
  }
}
export default connect(mapStateToProps)(PrivateRoute);
