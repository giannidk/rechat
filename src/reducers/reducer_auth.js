import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  SET_LOGGED_USER
} from '../actions/types';


const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
  loading: false,
  loggedIn: false,
  user: {}
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, loggedIn: true };
    case LOGIN_USER_FAIL:
      return { ...state, ...INITIAL_STATE, error: action.error };
    case LOGOUT_USER:
      return { ...state, ...INITIAL_STATE };
    case SET_LOGGED_USER:
      return { ...state, loggedIn: true, user: action.payload };
    default:
      return state;
  }
};
