//Basic react imports
import React, {useEffect, useState} from 'react';
import Constants from 'expo-constants';

//App authentication
import {getData} from './src/components/logical/Authorization/AsyncStorage';

//Store, redux and thunk
import {createStore, applyMiddleware} from 'redux'; //For one stop store creation
import reduxThunk from 'redux-thunk';
import {Provider} from 'react-redux'; //Store provision for entire app

//Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";

//Custom pages imports
import LandingPage from './src/pages/LandingPage/LandingPage';
import MapPage from './src/pages/MapPage/MapPage';

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
    useEffect(() => {
        console.log(Constants.manifest.ios.config.googleMapsApiKey);
    })
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    {
                        getData('accessToken') == null ? (
                        // No token found, user isn't signed in
                        <Stack.Screen
                            name="Landing"
                            component={LandingPage}
                        />
                    ) : (
                        // User is signed in
                        <Stack.Screen name="Map" component={MapPage} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

