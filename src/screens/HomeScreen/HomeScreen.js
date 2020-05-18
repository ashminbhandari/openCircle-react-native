import React, {useState, useEffect, useRef} from "react";
import {View, StyleSheet, Dimensions, TouchableOpacity, Text, Button} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, AnimatedRegion} from 'react-native-maps';
import mapStyle from './HomeStyle';
import MapMarker from '../../components/UIElements/MapMarker';
import {useStores} from '../../hooks/useStores';
import {FontAwesome, FontAwesome5, Octicons} from '@expo/vector-icons'
import {observer} from 'mobx-react';
import UserSpotifyPopup from "../../components/UIElements/UserSpotifyPopup";

const HomeScreen = observer(() => {
    const {LocationStore, SpotifyStore, AuthorizationStore} = useStores();
    let mapRef = useRef(null);

    async function setupLocation() {
        try {
            await LocationStore.setupLocation();
            mapRef.current.animateToRegion({
                latitude: LocationStore.userLocation.coords.latitude,
                longitude: LocationStore.userLocation.coords.longitude,
                latitudeDelta: 20,
                longitudeDelta: 20
            }, 1000)
        } catch (error) {
            console.log(error);
        }
    }

    //Displays all the online users
    function displayOnlineUsers() {
        let userMarkers = [];

        SpotifyStore.onlineUsers.map(user => {
            userMarkers.push(
                <View
                    key={user.id.toString()}
                    onPress={() => SpotifyStore.getUserSpotify(user.id)}
                >
                    <Marker
                        coordinate={{
                            latitude: user.latitude,
                            longitude: user.longitude
                        }}
                    >
                        <MapMarker/>
                    </Marker>
                </View>
            );
        });

        return userMarkers;
    }

    //Displays the current user
    function displayUser() {

        //Only display if userLocation exists
        if (LocationStore.userLocation) {
            return (
                <Marker
                    coordinate={{
                        latitude: LocationStore.userLocation.coords.latitude,
                        longitude: LocationStore.userLocation.coords.longitude
                    }}
                >
                    <View style={{
                        backgroundColor: 'black',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: 'white'
                    }}>
                        <Octicons
                            name={'broadcast'}
                            size={20}
                            color={'#1DB954'}
                            style={{
                                padding: 7
                            }}
                        />
                    </View>
                </Marker>
            );
        }

        return <></>;
    }

    //Display number of active users
    function displayNumberOfActiveUsers() {
        if (SpotifyStore.hasDownloadedUsers) {
            return (
                <View style={styles.onlineUsersCaption}>
                    <FontAwesome
                        name={'globe'}
                        size={20}
                        color={'#1DB954'}
                    />
                    <Text style={{
                        color: 'white',
                        alignSelf: 'center',
                        marginLeft: 4
                    }}>
                        {SpotifyStore.onlineUsers.length} active users
                    </Text>
                </View>
            );
        }

        return <></>;
    }

    //Display utility buttons
    function displayUtilityButtons() {
        return (
            <View style={styles.buttonsContainer}>
                {
                    //Download button
                }
                <TouchableOpacity onPress={() => {
                    SpotifyStore.gatherOnlineUsers(LocationStore, AuthorizationStore)
                }}>
                    <FontAwesome
                        name={SpotifyStore.hasDownloadedUsers ? 'refresh' : 'arrow-circle-down'}
                        size={20}
                        color={LocationStore.userLocation ? 'white' : 'grey'}
                        style={[styles.buttonsStyle, {
                            borderColor: LocationStore.userLocation ? 'white' : 'grey'
                        }]
                        }
                    />
                </TouchableOpacity>
                {
                    //Broadcast button
                }
                <TouchableOpacity onPress={setupLocation}>
                    <Octicons
                        name={'broadcast'}
                        size={20}
                        color={LocationStore.userLocation ? '#1DB954' : 'white'}
                        style={[styles.buttonsStyle, {
                            borderColor: LocationStore.userLocation ? '#1DB954' : 'white',
                            padding: 9
                        }]}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <MapView ref={mapRef}
                     style={styles.mapStyle}
                     provider={PROVIDER_GOOGLE}
                     customMapStyle={mapStyle}
                     initialRegion={{
                         latitude: 28.3365578,
                         longitude: 84.2021341,
                         latitudeDelta: 9,
                         longitudeDelta: 9
                     }}
            >
                {
                    displayUser()
                }
                {
                    displayOnlineUsers()
                }
            </MapView>
            {
                SpotifyStore.userMarkerSpotifyData ? <UserSpotifyPopup/> : <></>
            }
            {
                displayUtilityButtons()
            }
            {
                displayNumberOfActiveUsers()
            }
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
    },
    onlineUsersCaption: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        flexDirection: 'row'
    }
});

export default HomeScreen;
