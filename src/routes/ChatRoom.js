import _ from 'lodash';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Panel, Alert, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { screenNameChanged, messageChanged, fetchMessages, submitMessage } from '../actions';
import { Spinner } from '../components/common';

class ChatRoom extends Component {

  constructor(props){
    super(props);
    this.state = {
      screenName: ''
    }
  }

  componentWillMount() {
    const { roomID } = this.props.match.params;
    this.props.fetchMessages({ roomID });
  }

  onMessageChange(text) {
    this.props.messageChanged(text.target.value);
  }

  onScreenNameChanged(text) {
    this.setState({ screenName: text.target.value})
    console.log(this.state);
  }

  onScreenNameSet() {
    this.props.screenNameChanged(this.state.screenName);    
  }


  onSubmit() {
    const { roomID } = this.props.match.params;
    const { screenName, message } = this.props;

    this.props.submitMessage({ roomID, screenName, message },
      () => { this.props.reset() }
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

  renderMessages() {
    const { messages } = this.props;
    return _.map(messages, (message, key) => {
      const date = new Date(message.date * 1e3).toISOString().slice(-13, -5);
      return (
        <p key={key}><span className="text-success">{message.user}</span> [{date}]: {message.text}</p>
      )
    })

  }
  render() {
    const { handleSubmit, error, loading, message, screenName } = this.props;

    const renderBox = (screenName) => {
      console.log(screenName);
      if(!screenName){ 
        return(
          <Panel>
          <form onSubmit={handleSubmit(this.onScreenNameSet.bind(this))}>
             <Field
                label="Screen name"
                name="screenName"
                placeholder="choose your screen name ..."
                onChange={this.onScreenNameChanged.bind(this)}
                component={this.renderField}
              />
            <div className="pull-right">
              <button type="submit" className="btn btn-primary">Set screen name</button>
            </div>
          </form>
        </Panel>
        )
      }

      return (
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
      );
      
      } // END renderBox
    

    if (loading) {
      return (<Spinner />);
    }

    return (
      <div>
        <Panel className="messages-container">
          {this.renderMessages()}
        </Panel>
        {renderBox(screenName)}
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
  const { loading, error, message, messages, screenName } = chat;
  return {
    loading, error, message, messages, screenName
  };
};


export default reduxForm({
  validate,
  form: 'loginForm'
})(connect(mapStateToProps, { screenNameChanged, messageChanged, fetchMessages, submitMessage })(ChatRoom));
