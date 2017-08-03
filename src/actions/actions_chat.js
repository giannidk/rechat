import { database } from '../firebase';

import {
  CREATE_CHAT,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAIL,
  MESSAGE_CHANGED,
  SCREEN_NAME_CHANGED,
  SUBMIT_MESSAGE,
  FETCH_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAIL,
} from './types';

// function used for the guests of the anonimous rooms
export const screenNameChanged = (screenName) => {
    // save user in users table
    database.ref('users').push(screenName);
  return (dispatch) => {
    dispatch({
      type: SCREEN_NAME_CHANGED,
      payload: screenName
    })
  };
};

export function createChatroom({ screenName, maxUsers }, callback) {
  return (dispatch) => {
    dispatch({ type: CREATE_CHAT });

    // save user in users table
    database.ref('users').push(screenName);

    // save room in rooms table
    database.ref('rooms').push({ admin: screenName, maxUsers: maxUsers })
      .then(
      snap => {
        console.log('SNAP: ', snap.key);
        dispatch({
          type: CREATE_CHAT_SUCCESS,
          payload: screenName
        });
        callback(snap.key);
      }
      );
  }
}

export function fetchMessages({roomID}) {
  return (dispatch) => {
    dispatch({
      type: FETCH_MESSAGES,
    });
    database.ref('rooms').child(roomID).child('messages')
      .on('value',
      snapshot => {
        console.log(snapshot.val())
        dispatch({
          type: FETCH_MESSAGES_SUCCESS,
          payload: snapshot.val()
        });
      }),
      error => {
        dispatch({
          type: FETCH_MESSAGES_FAIL,
          payload: error
        });
      }
  }
}

export const messageChanged = (text) => {
  return {
    type: MESSAGE_CHANGED,
    payload: text
  };
};

export const submitMessage = ({ roomID, screenName, message }, callback) => {
  const dateTime = Date.now();
  return (dispatch) => {
    database.ref('rooms').child(roomID).child('messages').push({ user: screenName, text: message, date: dateTime })
      .then(
      snap => {
        console.log('SNAP: ', snap);
        dispatch({
          type: SUBMIT_MESSAGE,
          payload: message
        });
      }
      );
    callback();
  }
}