import { database, auth } from '../firebase';

import { 
    MESSAGE_CHANGED,
    SUBMIT_MESSAGE,
    FETCH_MESSAGES,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAIL,
} from './types';



export function fetchMessages() {
   let registrations = {};
    return (dispatch) => {
        dispatch({
        type: FETCH_MESSAGES,
    });
        database.ref('testChat').child('messages')
        .on('value', 
      snapshot => {
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

export const submitMessage = ({message}, callback) => {
  const dateTime = Date.now();
  return (dispatch) => {
    console.log(message);
    database.ref('testChat').child('messages').push({user: 'Gianni', text: message, date: dateTime});
    dispatch({
      type: SUBMIT_MESSAGE,
      payload: message
    });
    callback();
  }
}