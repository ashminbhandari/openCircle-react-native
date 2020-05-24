import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text, Linking, ActivityIndicator, ScrollView} from 'react-native';
import {observer} from 'mobx-react';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {ListItem} from 'react-native-elements';
import {useStores} from '../../hooks/useStores';
import TouchableScale from 'react-native-touchable-scale';
import { Dimensions } from 'react-native';


const UserSpotifyPopupScreen = observer(({navigation, route}) => {
    const {SpotifyStore} = useStores();
    const [currentTab, setCurrentTab] = useState('Top Tracks');
    const [loading, setLoading] = useState(false);

    function displayTopTracks() {
        if (SpotifyStore.topTracks) {
            return (
                <ScrollView>
                    {
                        SpotifyStore.topTracks.map((track, index) => (
                            <ListItem
                                key={index}
                                containerStyle={{
                                    backgroundColor: index % 2 === 0 ? 'black' : '#0a0a0a',
                                }}
                                leftAvatar={{source: {uri: track.image}}}
                                title={track.trackName}
                                titleStyle={{
                                    color: 'white'
                                }}
                                subtitle={track.artist}
                                subtitleStyle={{
                                    color: 'white'
                                }}
                            />
                        ))
                    }
                </ScrollView>
            )

        }
    }

    async function openUserSpotify() {
        await Linking.openURL('https://open.spotify.com/album/0sNOF9WDwhWunNAHPD3Baj');
    }

    function toRecentlyPlayed() {
        setCurrentTab('Recently Played');
    }

    function toTopArtists() {
        setCurrentTab('Top Artists');
    }

    function toTopTracks() {
        setCurrentTab('Top Tracks');
    }

    function TabNavigation() {
        let tabs = [{
            iconName: 'album',
            name: 'Top Tracks',
            onPress: toTopTracks
        }, {
            iconName: 'artist',
            name: 'Top Artists',
            onPress: toTopArtists
        }, {
            iconName: 'disc-player',
            name: 'Recently Played',
            onPress: toRecentlyPlayed
        }];

        let TabNavigation = [];
        for (let index = 0; index < tabs.length; index++) {
            TabNavigation.push(
                <View style={styles.tabNavigationContent} key={index.toString()}>
                    <MaterialCommunityIcons
                        name={tabs[index].iconName}
                        size={25}
                        onPress={tabs[index].onPress}
                        style={styles.tabNavigationIcons}
                    />
                    <Text style={styles.tabNavigationText}>
                        {tabs[index].name}
                    </Text>
                </View>
            );
        }

        return TabNavigation;
    }

    return (
        <View style={styles.container}>
            <ListItem
                Component={TouchableScale}
                friction={70} //
                tension={50} // These props are passed to the parent component (here TouchableScale)
                activeScale={1.2} //
                containerStyle={{backgroundColor: 'black', marginTop: 7}}
                leftIcon={{
                    name: 'spotify',
                    color: '#1DB954',
                    type: 'font-awesome',
                    size: 50,
                    iconStyle: {marginTop: 7}
                }}
                title={SpotifyStore.spotifyOF}
                titleStyle={{color: 'white', fontWeight: 'bold'}}
                subtitle={currentTab}
                subtitleStyle={{color: 'white'}}
                onPress={openUserSpotify}
                chevron
                chevronStyle={{color: 'white'}}
            />
            <View style={styles.tabNavigation}>
                {TabNavigation()}
            </View>
            <View style={{height: Dimensions.get('window').height - 150}}>
                {
                    loading ? (
                        <ActivityIndicator
                            style={styles.buttonsStyle}
                            size="small"
                            color="#1DB954"/>
                    ) : (
                        displayTopTracks()
                    )
                }
            </View>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flexDirection: 'column',
        height: '100%',
    },

    tabNavigation: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        padding: 10,
        width: '100%',
        backgroundColor: '#0c0c0c',
        zIndex: 1
    },

    tabNavigationContent: {
        marginLeft: 40
    },

    tabNavigationIcons: {
        alignSelf: 'center',
        color: 'white',
    },

    tabNavigationText: {
        alignSelf: 'center',
        color: 'white',
        marginTop: 3
    },

    listItem: {
        backgroundColor: 'black',
        color: 'white'
    }


});

export default UserSpotifyPopupScreen;