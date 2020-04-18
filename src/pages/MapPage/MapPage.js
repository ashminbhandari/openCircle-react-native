import React, {useState, useEffect} from "react";
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import mapStyle from './MapStyle';

export default function MapPage() {
    const [userLocation, setUserLocation] = useState({latitude: 20.0234, longitude: -40.0000}); //User's current location
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
            setUserLocation({latitude:location.coords.latitude, longitude:location.coords.longitude})
        }
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle}
                     provider={PROVIDER_GOOGLE}
                     customMapStyle={mapStyle}>
                <Marker
                    coordinate={userLocation}
                />
            </MapView>

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

