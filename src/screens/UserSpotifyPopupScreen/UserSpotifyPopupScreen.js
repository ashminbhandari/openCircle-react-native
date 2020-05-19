import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {observer} from 'mobx-react';
import {AntDesign} from '@expo/vector-icons';
import TrackDisplay from "../../components/UIElements/TrackDisplay";
import {useStores} from '../../hooks/useStores';

const UserSpotifyPopupScreen = observer(() => {
    const [close, setClose] = useState(false);
    const {SpotifyStore} = useStores();

    function closeUser() {
        setClose(close);
        SpotifyStore.selectedMarkerSpotifyData= null;
        SpotifyStore.selectedMarkerOwner = null;
    }

    return (
        <>
            {
                close || !SpotifyStore.selectedMarkerSpotifyData ? <></> : (
                    <View style={styles.container}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{
                                color: 'white',
                                marginLeft: 15,
                                alignSelf: 'center',
                            }}>
                                {SpotifyStore.selectedMarkerOwner}'s Top 5 tracks
                            </Text>
                            <AntDesign name={'closecircle'}
                                       onPress={closeUser}
                                       color={'white'}
                                       size={20}
                                       style={{
                                           padding: 10
                                       }}
                            />
                        </View>
                        {
                            SpotifyStore.selectedMarkerSpotifyData.map((track, index) => (
                                <View key={index}>
                                    <TrackDisplay
                                        imgSource={track.image}
                                        track={track.trackName}
                                        artist={track.artist}
                                    />
                                </View>
                            ))
                        }
                    </View>
                )
            }
        </>
    )
});

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 60,
        bottom: 140,
        right: 40,
        left: 40,
        backgroundColor: 'black',
        borderWidth: 1,
    }
});

export default UserSpotifyPopupScreen;