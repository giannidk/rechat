import { auth } from '../firebase';

import { 
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT_USER,
    SET_LOGGED_USER
} from './types';


export function setLoggedInState(user) {
  return (dispatch) => {
    dispatch(
      { type: SET_LOGGED_USER,
        payload: user
      }
    );
  }
}


export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};



export const loginUser = ({ email, password }, callback ) => {
  console.log(email, password)
  return(dispatch) => {
    dispatch({ type: LOGIN_USER });
    auth.signInWithEmailAndPassword(email, password)
    .then(
      user => { 
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: user
        });
        callback();
      },
      error => { 
        console.log( error.message );        
        dispatch({ 
          type: LOGIN_USER_FAIL,
          error: error.message 
        });
      }
    )
  }
}

export const logoutUser = (callback) => {
  console.log('LOGOUT FROM ACTION');
    return (dispatch) => {
      auth.signOut();
        dispatch({
            type: LOGOUT_USER,
            payload: {}        
        });
          callback();
    };
};

/* const loginUserSuccess = (dispatch, user) => {   
  console.log(user); 
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
}; */

/* const loginUserFail = (dispatch, error) => {
    //dispatch(reset('loginForm', 'userEmail'), { 
    //dispatch(change('loginForm', 'userPassword', ''), { 
    dispatch({ 
        type: LOGIN_USER_FAIL,
        error: error 
    });
}; */


/* 





export const loginUser = ({ userEmail, userPassword }, callback) => {
  return(dispatch) => {
    console.log(userEmail, userPassword);
    dispatch({ type: LOGIN_USER });
    auth.signInWithEmailAndPassword(userEmail, userPassword)
    .then(
      user => { 
        loginUserSuccess(dispatch, user);
      },
      error => { 
        console.log( error.message );        
        loginUserFail(dispatch, error.message);
      }
    )
      redirectFunction(callback);
  }
}









/* 
export const loginUser = ({ userEmail, userPassword }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
            .then(user => loginUserSuccess(dispatch, user))
            .catch((error) => {
                loginUserFail(dispatch);
            });
    };
};




export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT_USER,
            payload: {}        
        });
    };
};
 */
 