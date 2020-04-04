//Basic react imports
import React from 'react';
import {View} from 'react-native';

//Store, redux and thunk
import {createStore, applyMiddleware, compose} from 'redux'; //For one stop store creation
import reduxThunk from 'redux-thunk';
import {Provider} from 'react-redux'; //Store provision for entire app

//Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";

//Custom pages imports
import LandingPage from './src/pages/LandingPage';
import MapPage from './src/pages/MapPage';

//Import all reducers
import combinedReducer from './src/reducers/combinedReducer';

//Apply thunk
const thunk = applyMiddleware(reduxThunk);

//Redux dev tools
const devTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

//Compose enhancers
const composedEnhancers = compose(thunk, devTool);

//Create store
const store = createStore(
    combinedReducer, composedEnhancers
);

const Stack = createStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Landing" component={LandingPage}/>
                    <Stack.Screen name={"Map"} component={MapPage}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

