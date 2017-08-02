import _ from 'lodash';
import React, { Component } from 'react';
//import { Route, Redirect } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Panel, Alert, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { messageChanged, fetchMessages, submitMessage } from '../actions';
import { Spinner } from '../components/common';

class ChatRoom extends Component {

  componentWillMount(){
        this.props.fetchMessages();
  }

  onMessageChange(text) {
    this.props.messageChanged(text.target.value);
  }
  

  onSubmit() {
    const { message } = this.props;
    this.props.submitMessage({ message },
        () => {this.props.reset()}
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

  renderMessages(){
      const {messages} = this.props;
          return _.map(messages, (message, key) => {
      const date = new Date(message.date * 1e3).toISOString().slice(-13, -5);
              return (
                  <p key={key}><span className="text-success">{message.user}</span> [{date}]: {message.text}</p>
              )
          })
          
  }
  render() {
    const { handleSubmit, error, loading, message } = this.props;


        if(loading){
            return (<Spinner />);
        }
    //const { currentUser } = firebase.auth();
    return (
      <div>
                  

            <Panel>
                {this.renderMessages()}
            </Panel>

          <Panel>
            {this.renderErrorAlert()}
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                label="Message"
                name="message"
                placeholder="type message ..."
                onChange={this.onMessageChange.bind(this)}
                component={this.renderField}
              />              
              <div className="pull-right">
                <button type="submit" className="btn btn-primary">Send</button>
              </div>
            </form>
          </Panel>
        </div>
    );
  }
}

function validate(values) {
  const errors = {};  
  if (!values.message) {
    errors.message = "you can't send a blank text!";
  } 
    //else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //errors.email = 'Invalid email address'
    //}
  // if errors is empty, the form is valid and can be submitted
  // if errors has any properties, the form is invalid
  return errors;
}

const mapStateToProps = ({ chat }) => {
    const { loading, error, message, messages } = chat;
  return { 
      loading, error,message, messages
  };
};


export default reduxForm({
  validate,
  form: 'loginForm'
})(connect(mapStateToProps, { messageChanged, fetchMessages, submitMessage })(ChatRoom));
