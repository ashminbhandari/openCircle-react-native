//Basic react imports
import React, {useEffect} from 'react';

//Custom pages imports
import AuthenticationScreen from "./screens/AuthenticationScreen/AuthenticationScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

//MobX imports
import {observer} from 'mobx-react';
import {useStores} from './hooks/useStores';

//Navigation
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
                        <Stack.Screen
                            name="AuthenticationScreen"
                            component={AuthenticationScreen}
                        />
                    ) : (
                        // User is signed in
                        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    )
});

export default EntryPoint;