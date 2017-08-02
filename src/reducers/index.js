import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ChatReducer from './reducer_chat';

import AuthReducer from './reducer_auth';

const RootReducer = combineReducers ({
    appData: () => [],
    auth: AuthReducer,
    chat: ChatReducer,
    form: formReducer
})

export default RootReducer;