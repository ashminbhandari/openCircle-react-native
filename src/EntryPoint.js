//Basic react imports
import React, {useEffect, useState} from 'react';

//Screen imports
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import AuthorizeSpotifyScreen from "./screens/AuthorizeSpotifyScreen/AuthorizeSpotifyScreen";
import CreatePasswordScreen from "./screens/CreatePasswordScreen/CreatePasswordScreen";
import ServerConnectScreen from "./screens/ServerConnectScreen/ServerConnectScreen";
import UserSpotifyPopupScreen from "./screens/UserSpotifyPopupScreen/UserSpotifyPopupScreen";

//MobX imports
import {observer} from 'mobx-react';
import {useStores} from './hooks/useStores';

//Navigation imports
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const EntryPoint = observer(() => {
    const {AuthorizationStore} = useStores();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                {
                    AuthorizationStore.isAuthenticated === false ? (
                        // No token found, user isn't signed in
                        <>
                            <Stack.Screen
                                name="ServerConnectScreen"
                                component={ServerConnectScreen}
                            />
                            <Stack.Screen
                                name="AuthorizeSpotifyScreen"
                                component={AuthorizeSpotifyScreen}
                            />
                            <Stack.Screen
                                name="CreatePasswordScreen"
                                component={CreatePasswordScreen}
                            />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                            <Stack.Screen name="UserSpotifyPopupScreen" component={UserSpotifyPopupScreen}/>
                        </>
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    )
});

export default EntryPoint;