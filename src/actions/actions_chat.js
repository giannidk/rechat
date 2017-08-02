import { database, auth } from '../firebase';

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



export const screenNameChanged = (text) => {
  console.log(text);
  return {
    type: SCREEN_NAME_CHANGED,
    payload: text
  };
};


export function createChatroom({ screenName, maxUsers }, callback) {
  return (dispatch) => {
    dispatch({ type: CREATE_CHAT });
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
        console.log(roomID)
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

export const submitMessage = ({ roomID, message }, callback) => {
  const dateTime = Date.now();
  return (dispatch) => {
    database.ref('rooms').child(roomID).child('messages').push({ user: 'Gianni', text: message, date: dateTime })
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