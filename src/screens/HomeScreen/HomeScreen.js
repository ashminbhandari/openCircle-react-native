import React, {useState, useEffect} from "react";
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import mapStyle from './HomeStyle';
import MapMarker from '../../components/UIElements/MapMarker';
import {useStores} from '../../hooks/useStores';
import {FontAwesome} from '@expo/vector-icons'
import {observer} from 'mobx-react';

const HomeScreen = observer(() => {
    const {LocationStore} = useStores();

    return (
        <View style={styles.container}>
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
            </MapView>
            <FontAwesome
                name={'map-marker'}
                size={30}
                color={'white'}
                style={{
                    position: 'absolute',
                    bottom: 30,
                    right: 20,
                    padding: 10,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: 'white',
                }}
            />


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
