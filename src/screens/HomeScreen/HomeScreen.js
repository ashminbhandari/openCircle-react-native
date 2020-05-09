import React, {useState, useEffect} from "react";
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
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
                     region={{
                         latitude: LocationStore.userLocation ? LocationStore.userLocation.coords.latitude : 28.3365578,
                         longitude: LocationStore.userLocation ? LocationStore.userLocation.coords.longitude: 84.2021341,
                         latitudeDelta: 10,
                         longitudeDelta: 10
                     }}
            >
                {
                    LocationStore.userLocation ? (
                        <Marker
                            coordinate={{
                                latitude: LocationStore.userLocation.coords.latitude,
                                longitude: LocationStore.userLocation.coords.longitude
                            }}
                        >
                            <MapMarker/>
                        </Marker>
                    ) : (
                        <></>
                    )
                }
            </MapView>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity>
                    <FontAwesome
                        name={'arrow-circle-down'}
                        size={20}
                        color={'white'}
                        style={styles.buttonsStyle}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={LocationStore.setupLocation}>
                    <FontAwesome
                        name={'location-arrow'}
                        size={20}
                        color={'white'}
                        style={styles.buttonsStyle}
                    />
                </TouchableOpacity>
            </View>
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
        height: Dimensions.get('window').height + 100,
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 30,
        right: 0,
        flexDirection: 'row'
    },
    buttonsStyle: {
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        marginRight: 20
    }
});

export default HomeScreen;
