import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './reducer_auth';

const RootReducer = combineReducers ({
    appData: () => [],
    auth: AuthReducer,
    form: formReducer
})

export default RootReducer;