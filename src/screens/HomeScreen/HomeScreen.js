import React, {useState, useEffect} from "react";
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import mapStyle from './HomeStyle';
import MapMarker from '../../components/UIElements/MapMarker';
import randomGen from "../../utils/randomGen"; //To generate a random location

export default function MapPage() {
    const [userLocation, setUserLocation] = useState(null); //User's current location
    const [locationPermission, setLocationPermission] = useState(false); //Doesn't have permission to check location at the start

    useEffect(() => {
        getLocationPermission();
        getUserLocation();
    }, [locationPermission]);

    const getLocationPermission = async () => {
        //No location permission? Get permission
        if (!locationPermission) {
            let {status} = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                setLocationPermission(true);
            } else {
                let longitude = randomGen(-180, 180, 3);
                let latitude = randomGen(-90, 90, 3);
                let location = {
                    coords: {
                        latitude: latitude,
                        longitude: longitude
                    }
                };
                setUserLocation(location);
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
                                 latitudeDelta: 40,
                                 longitudeDelta: 40
                             }}>
                        <Marker
                            coordinate={{
                                latitude: userLocation.coords.latitude,
                                longitude: userLocation.coords.longitude
                            }}
                        >
                            <MapMarker/>
                        </Marker>
                    </MapView>
                ) : (<View/>)
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

