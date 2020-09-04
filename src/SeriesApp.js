import React from 'react';
import Router from './Router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';

import rootReducer from './reducers';

import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));

const SeriesApp = (props) => (
    <Provider store={store}>
        <Router />
    </Provider>
);

export default SeriesApp;