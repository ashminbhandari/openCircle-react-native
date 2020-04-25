//Basic react imports
import React from 'react';

//Custom pages imports
import LandingPage from './pages/LandingPage/LandingPage';
import MapPage from './pages/MapPage/MapPage';

//MobX imports
import { observer } from 'mobx-react';
import { useStores } from './hooks/useStores';

//Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
const Stack = createStackNavigator();

const Main = observer(() => {
    const { AuthorizationStore } = useStores();
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                {
                    AuthorizationStore.isToggled === false ? (
                        // No token found, user isn't signed in
                        <Stack.Screen
                            name="Landing"
                            component={LandingPage}
                        />
                    ) : (
                        // User is signed in
                        <Stack.Screen name="Map" component={MapPage}/>
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    )
});

export default Main;