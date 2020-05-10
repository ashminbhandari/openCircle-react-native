import React, {useState, useEffect} from "react";
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import mapStyle from './HomeStyle';
import MapMarker from '../../components/UIElements/MapMarker';
import {useStores} from '../../hooks/useStores';
import {FontAwesome, FontAwesome5} from '@expo/vector-icons'
import {observer} from 'mobx-react';

const HomeScreen = observer(() => {
    const {LocationStore, SpotifyStore, AuthorizationStore} = useStores();

    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle}
                     provider={PROVIDER_GOOGLE}
                     customMapStyle={mapStyle}
                     region={{
                         latitude: LocationStore.userLocation ? LocationStore.userLocation.coords.latitude : 28.3365578,
                         longitude: LocationStore.userLocation ? LocationStore.userLocation.coords.longitude : 84.2021341,
                         latitudeDelta: LocationStore.userLocation ? 40 : 10,
                         longitudeDelta: LocationStore.userLocation ? 40 : 10
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
                            <FontAwesome5
                                name={'user-astronaut'}
                                size={30}
                                color={'white'}
                            />
                        </Marker>
                    ) : (
                        <></>
                    )
                }

                {
                    SpotifyStore.onlineUsers.map(user => (
                        <View key={user.id.toString()}>
                            {user.id == AuthorizationStore.user.id ? (
                                <></>
                            ) : (
                                <Marker
                                    coordinate={{
                                        latitude: user.latitude,
                                        longitude: user.longitude
                                    }}
                                >
                                    <MapMarker/>
                                </Marker>
                            )}
                        </View>
                    ))
                }
            </MapView>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={SpotifyStore.gatherOnlineUsers}>
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
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + 150,
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
