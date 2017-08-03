import React, { Component } from 'react';
import { Panel, Alert } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { screenNameChanged, createChatroom } from '../actions';
import { Spinner } from '../components/common';


class UserLogin extends Component {

  componentWillMount() {
      // initializing default values for the form
      const { initialize } = this.props;
       initialize({
          maxUsers: '2',
        }); 
    }


  onScreenNameChanged(text) {
    this.props.screenNameChanged(text.target.value);
  }


  onSubmit() {
    const { screenName, maxUsers } = this.props;
    this.props.createChatroom({ screenName, maxUsers },
      (key) => {this.props.history.push(`/chat/room/${key}`);} 
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
    const { handleSubmit, error, loading } = this.props;

    if(loading){
        return (<Spinner />);
    }

    return (
      <div className="loginOuterContainer">
        <div className="loginInnerContainer col-xs-12 col-sm-8 col-md-6 col-lg-4">
          <h3>Start your chat</h3>
          <Panel>
            {this.renderErrorAlert()}
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                label="Screen name"
                name="screenName"
                placeholder="choose your screen name ..."
                onChange={this.onScreenNameChanged.bind(this)}
                component={this.renderField}
              />
              {/* <Field
                label="Select max allowed users"
                name="maxUsers"
                placeholder="max allowed users"
                type="number"
                component={this.renderField}
              /> */}
              <div className="pull-right">
                <button type="submit" className="btn btn-primary">Start chat</button>
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
  if (!values.screenName) {
    errors.screenName = "Enter you screen name to start the chat!";
  } 
  // if errors is empty, the form is valid and can be submitted
  // if errors has any properties, the form is invalid
  return errors;
}

const mapStateToProps = ({ auth, chat }) => {
  //console.log(auth);
  const { error, loading, screenName, maxUsers } = chat;
  return { error, loading, screenName, maxUsers };
};


export default reduxForm({
  validate,
  form: 'loginForm'
})(connect(mapStateToProps, { screenNameChanged, createChatroom })(UserLogin));
