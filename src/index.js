import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from  'redux';
import ReduxThunk from  'redux-thunk';
import reducers from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './css/vendor/bootstrap.min.css';
import './css/vendor/bootstrap-theme.min.css';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
ReactDOM.render(<App store={createStoreWithMiddleware(reducers)} />, document.getElementById('root'));
registerServiceWorker();
