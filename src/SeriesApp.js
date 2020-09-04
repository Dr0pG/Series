import React from 'react';
import Router from './Router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';

import rootReducer from './reducers';

import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)));

const SeriesApp = (props) => (
    <Provider store={store}>
        <Router />
    </Provider>
);

export default SeriesApp;