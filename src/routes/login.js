//import firebase from 'firebase';
import React, { Component } from 'react';
//import { Route, Redirect } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Panel, Alert } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';

//import { auth } from '../firebase';

class UserLogin extends Component {

  componentWillMount(){
  }

  state = {
    redirectToReferrer: false
  }
  onEmailChange(text) {
    this.props.emailChanged(text.target.value);
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text.target.value);
  }


  onSubmit() {
    const { email, password } = this.props;
    //const from = this.props.location.state ? this.props.location.state.from.pathname : '/settings';
    //console.log(from);
    this.props.loginUser({ email, password },
      //() => {this.props.history.push('/dashboard');} 
      () => {this.setState({ redirectToReferrer: true })} 
      );
  }



  renderErrorAlert() {
    const { error } = this.props;
    if (error) {
      return (
        <div>
          <Alert bsStyle="danger">
            <p>{error}</p>
          </Alert>
        </div>
      );
    }
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-error' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          type={field.type || 'text'}
          className="form-control"
          placeholder={field.placeholder}
          ref={field.ref}
          {...field.input}
        />
        <p className="control-label">{touched ? error : ''}</p>
      </div>
    );
  }
  render() {
    const { handleSubmit, userEmail, userPassword } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/login' } }
    const { redirectToReferrer } = this.state

    //const { currentUser } = auth;

    //console.log('FROM: ', from);
    //console.log(redirectToReferrer);

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }



    //const { currentUser } = firebase.auth();
    return (
      <div className="loginOuterContainer">
        <div className="loginInnerContainer col-xs-12 col-sm-8 col-md-6 col-lg-4">
          <h3>Login</h3>
          <h5>---</h5>
          <Panel>
            {this.renderErrorAlert()}
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                label="Email"
                name="email"
                placeholder="email"
                value={userEmail}
                onChange={this.onEmailChange.bind(this)}
                component={this.renderField}
              />
              <Field
                label="Password"
                name="password"
                placeholder="password"
                type="password"
                value={userPassword}
                onChange={this.onPasswordChange.bind(this)}
                component={this.renderField}
              />
              <div className="pull-right">
                <button type="submit" className="btn btn-primary">Log in</button>
                <button type="reset" className="btn btn-danger" style={{ marginLeft: 5 }} onClick={() => { this.props.reset() }}>Cancel</button>
              </div>
            </form>
          </Panel>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  // Validate inputs
  if (!values.password) {
    errors.password = "Password is required!";
  }
  if (!values.email) {
    errors.email = "Enter you email address!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  // if errors is empty, the form is valid and can be submitted
  // if errors has any properties, the form is invalid
  return errors;
}

const mapStateToProps = ({ auth }) => {
  //console.log(auth);
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};


export default reduxForm({
  validate,
  form: 'loginForm'
})(connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(UserLogin));
