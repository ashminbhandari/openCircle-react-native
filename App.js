import React from 'react';
import {View} from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux'; //For one stop store creation
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux'; //Store provision for entire app

//Custom components imports
import LandingPage from './src/pages/LandingPage';

//Import all reducers
import combinedReducer from './src/reducers/combinedReducer';

//Apply thunk
const thunk = applyMiddleware(reduxThunk);

//Redux dev tools
const devTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

//Compose enhancers
const composedEnhancers = compose(thunk, devTool);

//Create store
const store =  createStore(
    combinedReducer, composedEnhancers
);

export default function RotatingImageComponent() {
    return (
        <Provider store={store}>
            <View>
                <LandingPage/>
            </View>
        </Provider>
    );
};

