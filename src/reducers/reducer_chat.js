import {
  SCREEN_NAME_CHANGED,
  CREATE_CHAT,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAIL,
  MESSAGE_CHANGED,
  SUBMIT_MESSAGE,
  FETCH_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAIL,
} from '../actions/types';


const INITIAL_STATE = {
  screenName: '',
  maxUsers: '',
  message: '',
  loading: false,
  messages: {},
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCREEN_NAME_CHANGED:
      return { ...state, screenName: action.payload };
    case CREATE_CHAT:
      return { ...state, loading: true};
    case CREATE_CHAT_SUCCESS:
      return { ...state, screenName: action.payload, loading: false};
    case FETCH_MESSAGES:
      return { ...state, loading: true };
    case FETCH_MESSAGES_SUCCESS:
      return { ...state, messages: action.payload, loading: false };
    case FETCH_MESSAGES_FAIL:
      return { ...state, error: action.payload, loading: false };
    case MESSAGE_CHANGED:
      return { ...state, message: action.payload };
    case SUBMIT_MESSAGE:
      return { ...state, message: '' };
    default:
      return state;
  }
};
