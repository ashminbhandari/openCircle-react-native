import React, {useState, useEffect} from "react";
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import mapStyle from './MapStyle';
import {useStores} from '../../hooks/useStores';

export default function MapPage() {
    const {SpotifyStore} = useStores();
    const {AuthorizationStore} = useStores();
    const [userLocation, setUserLocation] = useState(null); //User's current location
    const [locationPermission, setLocationPermission] = useState(false); //Doesn't have permission to check location at the start

    useEffect(() => {
        getLocationPermission();
        getUserLocation();
    });

    const getLocationPermission = async () => {
        //No location permission? Get permission
        if (!locationPermission) {
            let {status} = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                setLocationPermission(true);
            }
        }
    };

    const getUserLocation = async () => {
        //If there is a permission then get the user location and set it in state
        if (locationPermission) {
            let location = await Location.getCurrentPositionAsync();
            setUserLocation(location)
        }
    };

    return (
        <View style={styles.container}>
            {
                userLocation != null ? (
                    <MapView style={styles.mapStyle}
                             provider={PROVIDER_GOOGLE}
                             customMapStyle={mapStyle}
                             initialRegion={{
                                 latitude: userLocation.coords.latitude,
                                 longitude: userLocation.coords.longitude,
                                 latitudeDelta: 0.0922,
                                 longitudeDelta: 0.0421
                             }}>
                        <Marker
                            coordinate={{
                                latitude: userLocation.coords.latitude,
                                longitude: userLocation.coords.longitude}}
                        >

                        </Marker>
                    </MapView>
                ) : ( <View/>)
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

