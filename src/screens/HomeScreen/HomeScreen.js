import React, {useState, useEffect} from "react";
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import mapStyle from './HomeStyle';
import MapMarker from '../../components/UIElements/MapMarker';
import {useStores} from '../../hooks/useStores';
import LocationService from "../../services/LocationService";
import {observer} from 'mobx-react';

const HomeScreen = observer(() => {
    const {LocationStore} = useStores();
    const [error, setError] = useState('Please visit to Settings > openCircle > Location Allow location access and restart the application');

    useEffect(() => {
        async function getLocPermission() {
            try {
                //Get permission
                LocationStore.locationPermission = await LocationService.getLocationPermission();
            } catch (error) {
                console.log(error);
            }
        }

        getLocPermission();
    });

    return (
        <View style={styles.container}>
            {
                LocationStore.userLocation ? (
                    <MapView style={styles.mapStyle}
                             provider={PROVIDER_GOOGLE}
                             customMapStyle={mapStyle}
                             initialRegion={{
                                 latitude: LocationStore.userLocation.coords.latitude,
                                 longitude: LocationStore.userLocation.coords.longitude,
                                 latitudeDelta: 40,
                                 longitudeDelta: 40
                             }}>
                        <Marker
                            coordinate={{
                                latitude: LocationStore.userLocation.coords.latitude,
                                longitude: LocationStore.userLocation.coords.longitude
                            }}
                        >
                            <MapMarker/>
                        </Marker>
                        <Text>{error}</Text>
                    </MapView>
                ) : (
                    <View>
                        <MapView style={styles.mapStyle}
                                 provider={PROVIDER_GOOGLE}
                                 customMapStyle={mapStyle}>
                        </MapView>
                        <Text
                            style={{
                                color: 'red',
                                position: 'absolute',
                                bottom: 40,
                                alignSelf: 'center',
                                margin: 40
                            }}
                        >
                            {error}
                        </Text>
                    </View>
                )
            }

        </View>
    )
});

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

export default HomeScreen;
