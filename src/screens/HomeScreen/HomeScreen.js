import React, {useState, useEffect} from "react";
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import mapStyle from './HomeStyle';
import MapMarker from '../../components/UIElements/MapMarker';
import {useStores} from '../../hooks/useStores';

export default function MapPage() {
    const {SpotifyStore} = useStores();

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

