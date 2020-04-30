//Basic react imports
import React, {useEffect} from 'react';

//Screen imports
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import AuthorizeSpotifyScreen from "./screens/AuthorizeSpotifyScreen/AuthorizeSpotifyScreen";
import CreatePasswordScreen from "./screens/CreatePasswordScreen/CreatePasswordScreen";
import ServerConnectScreen from "./screens/ServerConnectScreen/ServerConnectScreen";

//MobX imports
import {observer} from 'mobx-react';
import {useStores} from './hooks/useStores';

//Navigation imports
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

//Axios/cookie header config for cookie check
import axios from 'axios';
import cookieConfig from './utils/cookieConfig';

const EntryPoint = observer(() => {
    const {AuthorizationStore} = useStores();

    //Validate cookie upon entry
    useEffect(() => {
        async function getCookieConfig() {
            //Upon rejection promise returns empty {} which will be passed into the header
            return await cookieConfig.getCookieHeader();
        }
        let cookie = getCookieConfig();

        //Make the axios call
        axios.request({
            url: 'http://10.0.0.226:3000/spotify/checkCookie',
            method: 'get',
            headers: {
                cookie
            }
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        })


    });
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
                        // User is signed in
                        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    )
});

export default EntryPoint;