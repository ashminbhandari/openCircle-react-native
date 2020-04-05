//Basic react imports
import React, { useEffect, useState } from 'react';

//App authentication
import { View, Text, Button, AsyncStorage } from 'react-native';

//Store, redux and thunk
import {createStore, applyMiddleware} from 'redux'; //For one stop store creation
import reduxThunk from 'redux-thunk';
import {Provider} from 'react-redux'; //Store provision for entire app

//Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";

//Custom pages imports
import LandingPage from './src/pages/LandingPage';

//Import all reducers
import combinedReducer from './src/reducers/combinedReducer';

//Apply thunk
const thunk = applyMiddleware(reduxThunk);

//Create store
const store = createStore(
    combinedReducer, thunk
);

const Stack = createStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Landing" component={LandingPage}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

