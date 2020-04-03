import React from 'react';
import {View} from 'react-native';
import { createStore } from 'redux'; //For one stop store creation
import { Provider } from 'react-redux'; //Store provision for entire app

//Custom components imports
import LandingPage from './src/pages/LandingPage';

//Import all reducers
import combinedReducer from './src/reducers';

//Create store
const store =  createStore(
    combinedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function RotatingImageComponent() {
    return (
        <Provider store={store}>
            <View>
                <LandingPage/>
            </View>
        </Provider>
    );
}

