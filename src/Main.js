//Basic react imports
import React, {useEffect} from 'react';

//Custom pages imports
import ConnectScreen from './screens/ConnectScreen/ConnectScreen';
import MapScreen from './screens/MapScreen/MapScreen';

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
                            name="ConnectScreen"
                            component={ConnectScreen}
                        />
                    ) : (
                        // User is signed in
                        <Stack.Screen name="MapScreen" component={MapScreen}/>
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    )
});

export default Main;